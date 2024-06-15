import React, { useState } from "react";
import {
  HomeIcon,
  ArchiveBoxIcon,
  ServerStackIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/images/pn1-removebg-preview.png";

function SideNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInventorySubmenuOpen, setIsInventorySubmenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleInventorySubmenu = () => {
    setIsInventorySubmenuOpen(!isInventorySubmenuOpen);
  };

  return (
    <>
      <button
        className={`fixed top-4 ${isSidebarOpen ? 'left-[268px]' : 'left-4'} z-50 md:hidden md:left-4 p-2 rounded bg-[#17163F] text-white transition-all duration-300 ease-in-out`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      <nav
        className={`fixed top-0 left-0 h-screen w-64 bg-[#17163F] p-4 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:top-auto md:left-auto z-40`}
      >
        <div className="flex items-center mb-4 pl-4 py-2">
          <Image src={Logo} alt="General" width={180} height={100} priority={true} />
        </div>
        <div className="pl-4">
          <Link href="/dashboard">
            <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
              <HomeIcon className="h-5 w-5 mr-2" />
              <span>Dashboard</span>
            </div>
          </Link>
          <div>
            <div
              className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]"
              onClick={toggleInventorySubmenu}
            >
              <ArchiveBoxIcon className="h-5 w-5 mr-2" />
              <span>Inventory</span>
              {isInventorySubmenuOpen ? (
                <ChevronDownIcon className="h-5 w-5 ml-auto" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 ml-auto" />
              )}
            </div>
            {isInventorySubmenuOpen && (
              <div className="pl-6">
                <Link href="/dashboard/inventory/">
                  <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
                    <span>Part</span>
                  </div>
                </Link>
                <Link href="/dashboard/inventory/model">
                  <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
                    <span>Model</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <Link href="/dashboard/line">
            <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
              <ServerStackIcon className="h-5 w-5 mr-2" />
              <span>Line</span>
            </div>
          </Link>
          <Link href="/dashboard/part">
            <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
              <CurrencyDollarIcon className="h-5 w-5 mr-2" />
              <span>Order Part</span>
            </div>
          </Link>
          <Link href="/dashboard/history">
            <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
              <ChartBarIcon className="h-5 w-5 mr-2" />
              <span>History</span>
            </div>
          </Link>
        </div>
        <hr className="my-4 border-gray-700" />
        <div className="pl-4">
          <Link href="/dashboard/settings">
            <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              <span>Settings</span>
            </div>
          </Link>
          <div className="flex items-center cursor-pointer py-3 hover:text-[#55BED2]">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
            <span>Log Out</span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SideNav;
