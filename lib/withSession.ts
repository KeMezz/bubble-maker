import { useSession } from "h3";
import type { H3Event } from "h3";

export const GET_SESSION_CONFIG = {
  name: process.env.SESSION_NAME,
  password: process.env.SESSION_PW!,
};

export const USE_SESSION_CONFIG = {
  ...GET_SESSION_CONFIG,
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

export async function withUseSession(event: H3Event) {
  const session = await useSession(event, USE_SESSION_CONFIG);

  return session;
}

export async function withGetSession(event: H3Event) {
  const session = await getSession(event, GET_SESSION_CONFIG);

  return session;
}
