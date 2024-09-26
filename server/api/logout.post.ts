import { SESSION_NAME } from "~/constants/session-const";

export interface PostLogoutResponse {
  ok: boolean;
}

export default defineEventHandler(async (event) => {
  deleteCookie(event, SESSION_NAME);
  return { ok: true };
});
