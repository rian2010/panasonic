import React, { useState } from "react";
import Pagination from "./pagination";

interface Machine {
  line: number;
  name: string;
  temperature: string;
  status: string;
  statusColor: string;
}

interface Line {
  line: number;
  status: string;
  lineColor: string;
}

const TableComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Line Monitoring");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const machines: Machine[] = [
    {
      line: 1,
      name: "Machine 1",
      temperature: "30 °C",
      status: "Safe",
      statusColor: "bg-teal-400",
    },
    {
      line: 1,
      name: "Machine 2",
      temperature: "64 °C",
      status: "Medium",
      statusColor: "bg-yellow-400",
    },
    {
      line: 2,
      name: "Machine 3",
      temperature: "95 °C",
      status: "Unsafe",
      statusColor: "bg-red-400",
    },
    {
      line: 2,
      name: "Machine 4",
      temperature: "68 °C",
      status: "Medium",
      statusColor: "bg-yellow-400",
    },
  ];

  const lines: Line[] = [
    { line: 1, status: "On Progress", lineColor: "bg-teal-400" },
    { line: 2, status: "On Progress", lineColor: "bg-teal-400" },
    { line: 4, status: "Return", lineColor: "bg-blue-400" },
  ];


  return (
    <div className="relative overflow-hidden shadow-md sm:rounded-lg">
      <div className="overflow-x-auto whitespace-nowrap pl-4 py-2 text-md bg-[#3E3B64] text-white">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <span
              className={`cursor-pointer ${activeTab === "Line Monitoring"
                ? "text-white text-lg font-bold border-b border-blue-400"
                : ""
                }`}
              onClick={() => setActiveTab("Line Monitoring")}
            >
              Temperature Line Monitoring
            </span>
          </div>
        </div>
      </div>
      <div className="py-3 overflow-x-auto">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-[#3E3B64] text-white border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Line
              </th>
              <th scope="col" className="px-6 py-3">
                Machines
              </th>
              <th scope="col" className="px-6 py-3">
                Temperature
              </th>
              <th scope="col" className="px-6 py-3">
                Temperature Status
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {machines.map((machine, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0
                  ? "odd:bg-[#3E3B64] odd:dark:bg-[#4D4B6C]"
                  : "even:bg-[#4D4B6C] even:dark:bg-[#3E3B64]"
                  } text-white`}
              >
                <td className="px-6 py-4">{machine.line}</td>
                <td className="px-6 py-4">{machine.name}</td>
                <td className="px-6 py-4">{machine.temperature}</td>
                <td className="px-6 py-4">
                  {machine.status && (
                    <span
                      className={`px-4 py-2 rounded-full ${machine.statusColor} text-blue-900 font-bold`}
                    >
                      {machine.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 flex space-x-2">
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />

      </div>
    </div>
  );
};

export default TableComponent;



