import React, { useEffect, useState } from "react";
import Modal from '@/app/components/ui/partHistory';
import DetailsModal3 from "./viewPart";

interface Parts {
  model_id: number;
  model_name: string;
  process_name: string;
  status_usage: string;
  nama_line: string;
  start_date: string;
  end_date: string;
}

const TableComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Line Monitoring");
  const [sortType, setSortType] = useState<null | string>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isTakePartModalVisible, setIsTakePartModalVisible] = useState(false);
  const [isReturnPartModalVisible, setIsReturnPartModalVisible] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Parts | null>(null);
  const [models, setModels] = useState<Parts[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSort = () => {
    console.log("Sorting A-Z");
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usage_part/completed");
      if (!response.ok) {
        throw new Error("Failed to fetch models");
      }
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProcessSelect = (processName: string) => {
    setSelectedProcess(processName);
    setDropdownOpen(false);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const uniqueProcesses = Array.from(new Set(models.map((part) => part.process_name)));

  const filteredModels = models.filter((part) => {
    const matchesProcess = selectedProcess ? part.process_name === selectedProcess : true;
    const matchesSearch = part.model_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProcess && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredModels.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredModels.length / itemsPerPage);

  const handleViewDetails = (part: Parts) => {
    setSelectedPart(part);
    setIsTakePartModalVisible(true);
  };

  const handleViewDetails1 = (part: Parts) => {
    setSelectedPart(part);
    setIsReturnPartModalVisible(true);
  };

  const closeModal = () => {
    setIsTakePartModalVisible(false);
    setIsReturnPartModalVisible(false);
    setSelectedPart(null);
  };

  const handleSuccess = () => {
    fetchModels(); // Panggil fetchModels setelah berhasil
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="overflow-x-auto whitespace-nowrap pl-4 py-2 text-md bg-[#3E3B64] text-white">
        <div className="flex justify-between items-center border-b">
          <div className="flex space-x-4">
            <span
              className={`cursor-pointer ${activeTab === "Line Monitoring"
                ? "text-blue-white text-lg border-b-2 border-blue-400"
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
      <div className="py-3 overflow-x-auto">
        <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-[#3E3B64] text-white border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Model ID
              </th>
              <th scope="col" className="px-6 py-3">
                Model Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((part, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0
                  ? "odd:bg-[#3E3B64] odd:dark:bg-[#4D4B6C]"
                  : "even:bg-[#4D4B6C] even:dark:bg-[#3E3B64]"
                  } text-white`}
              >
                <td className="px-6 py-4">{part.model_id}</td>
                <td className="px-6 py-4">{part.model_name} ({part.process_name})</td>
                <td className="px-6 py-4">{part.status_usage}</td>
                <td className="px-6 py-4">{part.nama_line}</td>
                <td className="px-6 py-4">{new Date(part.start_date).toLocaleString('en-US')}</td>
                <td className="px-6 py-4">
                  {part.end_date ? (
                    new Date(part.end_date).toLocaleString('en-US')
                  ) : (
                    <span className="text-gray-400">Null</span>
                  )}
                </td>             
                <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(part)}
                      className="font-medium text-white bg-[#55BED2] px-2 py-1 rounded dark:text-blue-500 hover:bg-blue-700"
                    >
                      View Part
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2 items-center">
            {currentPage > 1 && (
              <button
                onClick={() => paginate(currentPage - 1)}
                className="px-3 py-1 rounded-full bg-gray-300 text-gray-800"
              >
                «
              </button>
            )}
            <span className="px-3 py-1 text-gray-400">Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className="px-3 py-1 rounded-full bg-gray-300 text-gray-800"
              >
                »
              </button>
            )}
          </div>
        </div>
        <DetailsModal3
          isVisible={isTakePartModalVisible}
          onClose={closeModal}
          part={selectedPart}
        />
      </div>
    </div>
  );
};

export default TableComponent;
