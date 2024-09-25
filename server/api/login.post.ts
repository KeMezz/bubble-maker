import nodemailerClient from "~/lib/email";
import prisma from "~/lib/prisma";

async function createToken() {
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
    createToken();
  } else {
    return token;
  }
}

async function sendEmail(email: string, token: number) {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "[인증 코드] 버블 메이커 6자리 인증 코드를 보내드려요",
    text: `인증 코드: ${token}`,
  };

  await new Promise(() => {
    nodemailerClient.sendMail(mailOptions, (error, response) => {
      if (error) {
        return;
      }
    });
  });
}

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  console.log("email", email);
  const token = await createToken();
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "[인증 코드] 버블 메이커 6자리 인증 코드를 보내드려요",
    text: `인증 코드: ${token}`,
  };

  await new Promise(() => {
    nodemailerClient.sendMail(mailOptions, (error, response) => {
      if (error) {
        throw createError({
          statusCode: 500,
          statusMessage: error.message,
        });
      } else {
        return {
          ok: true,
          ...response,
        };
      }
    });
  });

  nodemailerClient.close();

  return {
    ok: true,
  };
});
