import { defineNuxtRouteMiddleware } from "nuxt/app";
import { parseCookies } from "h3";
import { useNuxtApp } from "#app";
import { SESSION_NAME } from "~/constants/session-const";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { ssrContext } = useNuxtApp();

  if (ssrContext) {
    const event = useRequestEvent();
    const cookies = parseCookies(event!);
    const session = cookies[SESSION_NAME];

    if (!session && to.path !== "/login") {
      return navigateTo("/login");
    }

    if (session && to.path === "/login") {
      return navigateTo("/");
    }
  }
});
