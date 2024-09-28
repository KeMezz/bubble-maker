import { defineNuxtRouteMiddleware } from "nuxt/app";
import { useSession } from "h3";
import { useNuxtApp } from "#app";
import { USE_SESSION_CONFIG } from "~/constants/session-const";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { ssrContext } = useNuxtApp();

  if (ssrContext) {
    const event = useRequestEvent();
    const { data } = await useSession(event!, USE_SESSION_CONFIG);

    if (!data?.userId && to.path !== "/login") {
      return navigateTo("/login");
    }
    if (data?.userId && to.path === "/login") {
      return navigateTo("/");
    }
  }
});
