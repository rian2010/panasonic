import React from "react";

function SideNav() {
  return (
    <div className="flex">
      <nav className="fixed top-0 left-0 h-screen w-64 bg-[#1A1741] p-4 text-white">
        <div className="font-bold text-lg mb-4 pl-4 py-2">Common</div>
        <div className="flex items-center cursor-pointer hover:bg-gray-200 pl-4 py-2">
          <span>GENERAL</span>
        </div>
        <div className="pl-4 text-gray-600">
          <div className="mb-2 hover:text-gray-800 py-1">Dashboard</div>
          <div className="mb-2 hover:text-gray-800 py-1">Inventory</div>
          <div className="mb-2 hover:text-gray-800 py-1">History</div>
        </div>
        <div className="font-bold text-lg mt-4 pl-4">Order Part</div>
        <div className="flex items-center cursor-pointer hover:bg-gray-200 pl-4 py-2">
          <span>SUPPORT</span>
        </div>
        <div className="pl-4 text-gray-600">
          <div className="mb-2 hover:text-gray-800 py-1">Help</div>
          <div className="mb-2 hover:text-gray-800 py-1">Settings</div>
          <div className="mb-2 hover:text-gray-800 py-1">
            Log Out
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideNav;

