'use client';

import React from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();



  if (!session) {
    return null; // Optional: You can redirect to login page or show a login button
  }

  const user = session.user;

  return (
    <div className="flex items-center justify-end p-4 text-white">
      <div className="flex items-center">
        <BellIcon className="h-8 w-8 text-white mr-4 bg-cyan-500 rounded-full relative" />
        <div className="border-l border-white h-8"></div>
        <div className="flex items-center ml-4">
          <UserCircleIcon className="h-10 w-10 text-white" />
          <div className="ml-4 text-right">
            <div className="font-semibold">{user?.username || "Username"}</div>
            <div className="text-sm text-gray-300">{user?.role || "Role"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

