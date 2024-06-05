import React, { useState } from "react";
import Modal from '@/app/components/ui/partHistory';

interface Parts {
  name: string;
  size: string;
  model: string;
  machine: string;
  line: number;
  location: string;
  status: string;
  statusColor: string;
}

const TableComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Line Monitoring");
  const [sortType, setSortType] = useState<null | string>(null); // State to manage sorting type
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Parts | null>(null);

  const handleSort = () => {
    console.log("Sorting A-Z");
  };

  const parts: Parts[] = [
    {
      name: "Bor",
      size: "5 mm",
      model: "Model A1",
      machine: "Machine 1",
      line: 1,
      location: "Shelf 1",
      status: "Used",
      statusColor: "bg-teal-400"
    },
    {
      name: "Bor",
      size: "5 mm",
      model: "Model A1",
      machine: "Machine 1",
      line: 2,
      location: "Shelf 1",
      status: "Used",
      statusColor: "bg-teal-400"
    },
    {
      name: "Bor",
      size: "5 mm",
      model: "Model A1",
      machine: "Machine 1",
      line: 3,
      location: "Shelf 1",
      status: "Used",
      statusColor: "bg-teal-400"
    },
  ]

  const filteredMachines = parts.filter((part) =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewHistory = (part: Parts) => {
    setSelectedPart(part);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPart(null);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="overflow-x-auto whitespace-nowrap pl-4 py-2 text-md bg-[#3E3B64] text-white">
        <div className="flex justify-between items-center border-b">
          <div className="flex space-x-4">
            <span
              className={`cursor-pointer ${activeTab === "Line Monitoring"
                ? "text-blue-400 border-b-2 border-blue-400"
                : ""
                }`}
              onClick={() => setActiveTab("Line Monitoring")}
            >
              Part History
            </span>
          </div>
          <div
            className="text-center p-2 pr-4 rounded cursor-pointer"
            onClick={handleSort}
          >
            A-Z
          </div>
        </div>
      </div>
      <div className="pl-4 py-2 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="text-sm px-4 py-2 border border-gray-300 rounded-xl flex-grow text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="py-3">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-[#3E3B64] text-white border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Part Name
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Model
              </th>
              <th scope="col" className="px-6 py-3">
                Machines
              </th>
              <th scope="col" className="px-6 py-3">
                Line
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMachines.map((part, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0
                  ? "odd:bg-[#3E3B64] odd:dark:bg-[#4D4B6C]"
                  : "even:bg-[#4D4B6C] even:dark:bg-[#3E3B64]"
                  } text-white`}
              >
                <td className="px-6 py-4">{part.name}</td>
                <td className="px-6 py-4">{part.size}</td>
                <td className="px-6 py-4">{part.model}</td>
                <td className="px-6 py-4">{part.machine}</td>
                <td className="px-6 py-4">{part.line}</td>
                <td className="px-6 py-4">{part.location}</td>
                <td className="px-6 py-4">
                  {part.status && (
                    <span
                      className={`px-4 py-2 rounded-full ${part.statusColor} text-blue-900 font-bold`}
                    >
                      {part.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewHistory(part)}
                    className="font-medium text-white bg-[#55BED2] px-2 py-1 rounded dark:text-blue-500 hover:bg-blue-700"
                  >
                    View History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isVisible={isModalVisible} onClose={closeModal}>
        {selectedPart && (
          <div>
            <h3 className="text-lg font-medium text-gray-900">{selectedPart.name}</h3>
            <p className="mt-1 text-sm text-gray-600">Size: {selectedPart.size}</p>
            <p className="mt-1 text-sm text-gray-600">Model: {selectedPart.model}</p>
            <p className="mt-1 text-sm text-gray-600">Machine: {selectedPart.machine}</p>
            <p className="mt-1 text-sm text-gray-600">Location: {selectedPart.location}</p>
            <p className="mt-1 text-sm text-gray-600">Status: {selectedPart.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TableComponent;

