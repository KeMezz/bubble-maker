import { USE_SESSION_CONFIG } from "~/constants/session-const";

export interface PostLogoutResponse {
  ok: boolean;
}

export default defineEventHandler(async (event) => {
  try {
    const session = await useSession(event, USE_SESSION_CONFIG);
    await session.clear();

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
});
