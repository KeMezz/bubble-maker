import prisma from "~/lib/prisma";
import { Message } from "@prisma/client";
import { withGetSession } from "~/lib/withSession";

export interface GetMessagesResponse {
  ok: boolean;
  messages?: Message[];
}

interface GetMessagesParams {
  userId: number;
  chatId: number;
}

async function getMessages({ userId, chatId }: GetMessagesParams) {
  const messages = await prisma.message.findMany({
    where: {
      userId,
      chatId,
    },
  });

  return messages;
}

export default defineEventHandler(async (event) => {
  try {
    const {
      data: { userId },
    } = await withGetSession(event);
    const { chatId } = getQuery(event);

    if (!chatId) {
      throw new Error("No Chat Id");
    }

    const messages = await getMessages({ userId: +userId, chatId: +chatId });

    return {
      ok: true,
      messages,
    };
  } catch (error) {
    return {
      ok: false,
      messages: undefined,
    };
  }
});
