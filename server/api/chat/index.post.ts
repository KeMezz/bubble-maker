import prisma from "~/lib/prisma";
import { withGetSession } from "~/lib/withSession";

export interface CreateChatResponse {
  ok: boolean;
  chatId: number;
}

async function createChat(userId: number): Promise<{ id: number }> {
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
    } = await withGetSession(event);

    const chat = await createChat(userId);

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
