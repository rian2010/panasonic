import React, { useState, useEffect } from "react";
//import Modal from "@/app/components/ui/partHistory";
import Lottie from "lottie-react";
import notfound from "@/app/images/404.json";

interface Parts {
  model_id: number;
  model_name: string;
  process_name: string;
}

const TableComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Line Monitoring");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [models, setModels] = useState<Parts[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/models");
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
        </div>
      </div>
      <div className="pl-4 py-2 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="text-sm px-4 py-2 border border-gray-300 rounded-xl text-black w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-sm px-4 py-2 border border-gray-300 rounded-xl bg-white text-black"
          >
            {selectedProcess || "Select Process"}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <ul>
                {uniqueProcesses.map((process, index) => (
                  <li
                    key={index}
                    onClick={() => handleProcessSelect(process)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-700"
                  >
                    {process}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {selectedProcess ? (
        <>
          <div className="py-3 overflow-x-auto">
            <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase bg-[#3E3B64] text-white border-b">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Model Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Process Name
                  </th>
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
                    <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4">{part.model_name}</td>
                    <td className="px-6 py-4">{part.process_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 pb-4">
            {Array.from({ length: Math.ceil(filteredModels.length / itemsPerPage) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-1  rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-black"
                    }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <div className="py-4 text-center text-white">
          <Lottie
            animationData={notfound}
            style={{ height: "225px", width: "150px", margin: "0 auto" }}
          />
          Please choose a process!
        </div>
      )}
    </div>
  );
};

export default TableComponent;
