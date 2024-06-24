// src/PartTypesComponent.js
import React from "react";

const PartTypesComponent = () => {
  const totalParts = 100;
  const unused = 10; // Example data
  const ordered = 80; // Example data
  const used = 10; // Example data

  const getCurrentDate = () => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  const currentDate = getCurrentDate();

  return (
    <div className="bg-[#3E3B64] p-5 rounded-lg text-white w-90 font-sans">
      <h2 className="text-xl mb-2 border-b border-gray-400 pb-1 font-bold">
        Total Part Types
      </h2>
      <div className="text-2xl mb-4">{totalParts} Part</div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <span className="block w-4 h-4 bg-green-400 mr-2 rounded-full"></span>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <span className="block w-4 h-4 bg-blue-400 mr-2 rounded-full"></span>
          <span>Ordered</span>
        </div>
        <div className="flex items-center">
          <span className="block w-4 h-4 bg-red-400 mr-2 rounded-full"></span>
          <span>Production</span>
        </div>
      </div>
      <div className="relative h-4 rounded-full overflow-hidden bg-gray-700">
        <div
          className="absolute h-full bg-green-400"
          style={{ width: `${(unused / totalParts) * 100}%` }}
        ></div>
        <div
          className="absolute h-full bg-blue-400"
          style={{
            width: `${(ordered / totalParts) * 100}%`,
            left: `${(unused / totalParts) * 100}%`,
          }}
        ></div>
        <div
          className="absolute h-full bg-red-400"
          style={{
            width: `${(used / totalParts) * 100}%`,
            left: `${((unused + ordered) / totalParts) * 100}%`,
          }}
        ></div>
      </div>
      <div className="mt-4 text-md text-white py-4">As of {currentDate}</div>
    </div>
  );
};

export default PartTypesComponent;
