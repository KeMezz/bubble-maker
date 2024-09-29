import prisma from "~/lib/prisma";
import { GET_SESSION_CONFIG } from "~/constants/session-const";

export interface CreateChatResponse {
  ok: boolean;
  chatId: number;
}

async function createChat(userId: number) {
  const chat = await prisma.chat.create({
    data: {
      title: "새로운 챗",
      description: "설명이 없습니다.",
      userId,
    },
    select: {
      id: true,
    },
  });

  return chat;
}

export default defineEventHandler(async (event) => {
  try {
    const {
      data: { userId },
    } = await getSession(event, GET_SESSION_CONFIG);

    const chat = await createChat(userId);

    console.log("chat", chat);

    return {
      ok: true,
      chatId: chat.id,
    };
  } catch {
    return {
      ok: false,
      chatId: undefined,
    };
  }
});
