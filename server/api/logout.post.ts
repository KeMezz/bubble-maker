import { withUseSession } from "~/lib/withSession";

export interface PostLogoutResponse {
  ok: boolean;
}

export default defineEventHandler(async (event) => {
  try {
    const session = await withUseSession(event);
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
