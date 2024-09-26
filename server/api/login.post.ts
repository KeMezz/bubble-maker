import prisma from "~/lib/prisma";
import { SESSION_NAME } from "~/constants/session-const";

export interface PostLoginResponse {
  ok: boolean;
}

async function getUserId(email: string) {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email,
    },
  });

  return user?.id;
}

async function validateToken(token: string, userId: number) {
  const serverToken = await prisma.token.findUnique({
    where: {
      userId,
      token: +token,
    },
  });
  if (!serverToken) {
    return false;
  }

  await prisma.token.deleteMany({
    where: {
      userId,
    },
  });
  return true;
}

export default defineEventHandler(async (event) => {
  const { email, token } = await readBody(event);

  const userId = await getUserId(email);
  if (!userId) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  const tokenMatch = await validateToken(token, userId);
  if (!tokenMatch) {
    return {
      ok: false,
    };
  }

  setCookie(event, SESSION_NAME, JSON.stringify({ id: userId, email }));
  return {
    ok: true,
  };
});
