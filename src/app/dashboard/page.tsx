'use client';

import Line from "@/app/components/ui/line";
import Temperature from "../components/ui/temperaturehistory";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);


  return (
    <div className="min-h-screen p-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <div className="bg-[#3E3B64] p-4 rounded-lg">
          <Line />
        </div>
      </div>
      <div className="bg-[#3E3B64] p-4 rounded-lg mt-4">
        <Temperature />
      </div>
    </div>
  );
}
