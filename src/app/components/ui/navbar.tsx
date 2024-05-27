import React from 'react';

function TopBar() {
  return (
    <div className="left-0 w-full bg-[#1A1741] text-white p-4 flex justify-between items-center z-10">
      <div className="font-bold text-lg pl-4">Your Logo</div>
      <div className="flex items-center">
        <div className="mr-4">User Name</div>
        <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">U</div>
      </div>
    </div>
  );
}

export default TopBar;

