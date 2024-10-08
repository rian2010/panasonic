import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import notfound from "@/app/images/404.json";
import DetailsModal from "@/app/components/ui/modalModel";
import { useSession } from "next-auth/react";

interface Parts {
  model_id: number;
  model_name: string;
  process_name: string;
}

const TableComponent: React.FC = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("Line Monitoring");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [models, setModels] = useState<Parts[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPart, setSelectedPart] = useState<Parts | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    if (session && session.user) {
      setUserRole(session.user.role || null);
    }
  }, [session]);

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

  const totalPages = Math.ceil(filteredModels.length / itemsPerPage);

  const handleViewDetails = (part: Parts) => {
    setSelectedPart(part);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPart(null);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="overflow-x-auto whitespace-nowrap pl-4 py-2 text-lg bg-[#3E3B64] text-white">
        <div className="flex justify-between items-center border-b">
          <div className="flex space-x-4">
            <span
              className={`cursor-pointer ${activeTab === "Line Monitoring" ? "text-white border-blue-400" : ""}`}
              onClick={() => setActiveTab("Line Monitoring")}
            >
              Model List
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
                    className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer text-gray-700"
                  >
                    {process}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {selectedProcess && (
          <div className="text-md text-white pl-4">
            {filteredModels.length} Model{filteredModels.length !== 1 ? 's' : ''} found for {selectedProcess}
          </div>
        )}
      </div>
      {selectedProcess ? (
        <>
          {filteredModels.length > 0 ? (
            <>
              <div className="py-3 overflow-x-auto">
                <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase bg-[#3E3B64] text-white border-b">
                    <tr>
                      <th scope="col" className="px-6 py-3">No</th>
                      <th scope="col" className="px-6 py-3">Model Name</th>
                      <th scope="col" className="px-6 py-3">Model Id</th>
                      <th scope="col" className="px-6 py-3">Details</th>
                      {userRole !== "common" && <th scope="col" className="px-6 py-3">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((part, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-[#3E3B64]" : "bg-[#4D4B6C]"} text-white`}
                      >
                        <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                        <td className="px-6 py-4">{part.model_name}</td>
                        <td className="px-6 py-4">{part.model_id}</td>
                        <td className="px-6 py-4">
                          <button
                            className="font-medium text-white bg-[#55BED2] px-2 py-1 rounded hover:bg-blue-700"
                            onClick={() => handleViewDetails(part)}
                          >
                            View details
                          </button>
                        </td>
                        {userRole !== "common" && (
                          <td className="px-6 py-4 flex space-x-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Edit
                            </button>
                            <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-4 pb-4">
                <div className="join">
                  <button
                    className={`join-item btn ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                    onClick={() => paginate(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                  <button className="join-item btn">
                    Page {currentPage} of {totalPages}
                  </button>
                  <button
                    className={`join-item btn ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
                    onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-4 text-center text-white">
              No models found for "{searchQuery}" in {selectedProcess}
            </div>
          )}
        </>
      ) : (
        <div className="py-4 text-center text-white">
          <Lottie
            animationData={notfound}
            style={{ height: "225px", width: "150px", margin: "0 auto" }}
          />
          Please select a process!
        </div>
      )}
      <DetailsModal
        isVisible={isModalVisible}
        onClose={closeModal}
        part={selectedPart}
      />
    </div>
  );
};

export default TableComponent;

