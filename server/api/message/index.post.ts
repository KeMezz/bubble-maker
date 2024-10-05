import prisma from "~/lib/prisma";
import { Message } from "@prisma/client";
import { withGetSession } from "~/lib/withSession";

export interface CreateMessageResponse {
  ok: boolean;
  message?: Message;
}

interface CreateMessageParams {
  userId: number;
  chatId: number;
  sender: number;
  text: string;
}

async function createMessage({
  userId,
  chatId,
  sender,
  text,
}: CreateMessageParams) {
  const message = await prisma.message.create({
    data: {
      text,
      userId,
      chatId,
      senderType: sender,
    },
  });

  return message;
}

export default defineEventHandler(async (event) => {
  try {
    const {
      data: { userId },
    } = await withGetSession(event);
    const { sender, text, chatId } = await readBody(event);

    const message = await createMessage({
      userId: +userId,
      chatId: +chatId,
      sender: +sender,
      text,
    });

    return {
      ok: true,
      message,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: undefined,
    };
  }
});
