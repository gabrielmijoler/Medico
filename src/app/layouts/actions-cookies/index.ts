"use server";

import { cookies } from "next/headers";

const removeCookie = async (name: string) => {
  await (await cookies()).delete(name);
};

const setCookie = async (name: string, value: string) => {
  const resCookies = await cookies();
  resCookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 dia
  });
};

const getCookie = async (name: string) => {
  const resCookies = await cookies();
  const user = resCookies.get(name)?.value;
  return user ? JSON.parse(user) : null;
};

export { removeCookie, setCookie, getCookie };
