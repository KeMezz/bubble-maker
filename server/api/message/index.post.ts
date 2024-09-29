import prisma from "~/lib/prisma";
import { GET_SESSION_CONFIG } from "~/constants/session-const";
import { Message } from "@prisma/client";

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
    } = await getSession(event, GET_SESSION_CONFIG);
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
