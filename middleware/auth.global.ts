import { defineNuxtRouteMiddleware } from "nuxt/app";
import { useSession } from "h3";
import { useNuxtApp } from "#app";
import { USE_SESSION_CONFIG } from "~/constants/session-const";
import prisma from "~/lib/prisma";

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
    const session = await useSession(event!, USE_SESSION_CONFIG);

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
