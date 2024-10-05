import prisma from "~/lib/prisma";
import { defineNuxtRouteMiddleware } from "nuxt/app";
import { useNuxtApp } from "#app";
import { withUseSession } from "~/lib/withSession";

async function validateUser(userId: number) {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });

  return !!user;
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { ssrContext } = useNuxtApp();

  if (ssrContext) {
    const event = useRequestEvent();
    const session = await withUseSession(event!);
    const isUserValid = await validateUser(+session.data?.userId);

    if (!isUserValid && to.path !== "/login") {
      await session.clear();
      return navigateTo("/login");
    }
    if (isUserValid && to.path === "/login") {
      return navigateTo("/");
    }
  }
});
