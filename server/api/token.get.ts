import nodemailerClient from "~/lib/email";
import prisma from "~/lib/prisma";

export interface GetTokenResponse {
  ok: boolean;
  message: string;
}

async function createToken(userId: number) {
  const token = Math.floor(100000 + Math.random() * 900000);
  const tokenExists = await prisma.token.findUnique({
    select: {
      id: true,
    },
    where: {
      token,
    },
  });
  if (tokenExists) {
    return createToken(userId);
  }

  await prisma.token.create({
    data: {
      userId,
      token,
    },
  });
  return token;
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
  if (user) {
    return user.id;
  }

  const newUser = await prisma.user.create({
    select: {
      id: true,
    },
    data: {
      email,
    },
  });
  return newUser.id;
}

export default defineEventHandler(async (event) => {
  const { email } = getQuery(event);
  const userId = await getUserId(email + "");
  const token = await createToken(userId);

  try {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: String(email),
      subject: "[인증 코드] 버블 메이커 6자리 인증 코드를 보내드려요",
      text: `인증 코드: ${token}`,
    };
    await nodemailerClient.sendMail(mailOptions);

    return {
      ok: true,
      message: `Email sent to ${email}`,
    };
  } catch (error) {
    return {
      ok: false,
      message: `Failed to send email`,
    };
  }
});
