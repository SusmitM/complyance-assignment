import { COOKIE_NAME } from "../../../constants/index";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;
  if (username !== "admin" || password !== "admin") {
    return NextResponse.json({
      message: "Unauthorized!!! Use admin as Username and Password",
    });
  }

  const secret = process.env.JWT_SECRET || "";

  const token = sign(
    {
      username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
}
