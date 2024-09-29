import prisma from "~/lib/prisma";
import { GET_SESSION_CONFIG } from "~/constants/session-const";
import { Chat } from "@prisma/client";

export interface GetChatsResponse {
  ok: boolean;
  chats: Chat;
}

async function getChats(userId: number) {
  const chats = await prisma.chat.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
    },
  });

  return chats;
}

export default defineEventHandler(async (event) => {
  try {
    const {
      data: { userId },
    } = await getSession(event, GET_SESSION_CONFIG);

    const chats = await getChats(userId);

    return {
      ok: true,
      chats,
    };
  } catch {
    return {
      ok: false,
      chats: [],
    };
  }
});
