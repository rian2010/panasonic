"use client";
import { signIn } from "next-auth/react";

export default function LogNextAuth() {
  return (
    <>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
}
