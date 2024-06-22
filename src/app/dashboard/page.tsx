"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [router, status]);

  return <h1>Dashboard</h1>;
}
