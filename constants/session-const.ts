export const GET_SESSION_CONFIG = {
  name: process.env.SESSION_NAME,
  password: process.env.SESSION_PW!,
};

export const USE_SESSION_CONFIG = {
  ...GET_SESSION_CONFIG,
  maxAge: 60 * 60 * 24 * 30, // 30 days
};
