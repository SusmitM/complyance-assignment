import { COOKIE_NAME } from "../../../constants/index";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const serializedCookie = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return NextResponse.json({ message: "Logout Successful",state:true }, {
    status: 200,
    headers: { "Set-Cookie": serializedCookie }
  });
}
