import React from "react";
import { HomeIcon, ArchiveBoxIcon, ServerStackIcon, CurrencyDollarIcon, ChartBarIcon, Cog6ToothIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/images/pn1-removebg-preview.png";

function SideNav() {
  return (
    <div className="flex">
      <nav className="fixed top-0 left-0 h-screen w-64 bg-[#17163F] p-4 text-white">
        <div className="flex items-center mb-4 pl-4 py-2">
          <Image src={Logo} alt="General" width={180} height={100} />
        </div>
        <div className="pl-4">
          <Link href={'/'}>
            <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
              <HomeIcon className="h-5 w-5 mr-2" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link href={'inventory'}>
            <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
              <ArchiveBoxIcon className="h-5 w-5 mr-2" />
              <span>Inventory</span>
            </div>
          </Link>
          <Link href={'line'}>
            <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
              <ServerStackIcon className="h-5 w-5 mr-2" />
              <span>Line</span>
            </div>
          </Link>
          <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
            <CurrencyDollarIcon className="h-5 w-5 mr-2" />
            <span>Order Part</span>
          </div>
          <Link href='history/'>
            <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
              <ChartBarIcon className="h-5 w-5 mr-2" />
              <span>History</span>
            </div>
          </Link>
        </div>
        <hr className="my-4 border-gray-700" />
        <div className="pl-4">
          <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
            <span>Settings</span>
          </div>
          <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
            <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-2" />
            <span>Log Out</span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideNav;

