import React, { useState, useEffect } from "react";
import AddPart from "@/app/dashboard/part/addPart";
import UpdateParts from "@/app/dashboard/part/updatePart";
import DeleteParts from "@/app/dashboard/part/deletePart";

interface Part {
  part_id: string;
  part_name: string;
  size: string;
  quantity: number;
  location: string;
}

interface PartDetail {
  part_id: string;
  part_name: string;
  size: string;
  model_id: string;
  process_id: string;
  process_name: string;
  model_name: string;
  machine: string;
  location: string;
  status_part: string;
  statusColor: string;
}

function TableComponent() {
  const [activeTab, setActiveTab] = useState("Part Types");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [parts, setParts] = useState<Part[]>([]);
  const [partsDetail, setPartsDetail] = useState<PartDetail[]>([]);
  const [detailLoaded, setDetailLoaded] = useState(false);
  const [currentPageParts, setCurrentPageParts] = useState(1);
  const [itemsPerPageParts, setItemsPerPageParts] = useState(10);
  const [currentPageDetails, setCurrentPageDetails] = useState(1);
  const [itemsPerPageDetails, setItemsPerPageDetails] = useState(10);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const response = await fetch("/api/parts/quantity");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setParts(data.posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "Part Details" && !detailLoaded) {
      fetchPartDetail();
      setDetailLoaded(true);
    }
  }, [activeTab, detailLoaded]);

  const fetchPartDetail = async () => {
    try {
      const response = await fetch("/api/parts");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPartsDetail(data.posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStatusBgColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-400";
      case "ordered":
        return "bg-blue-400";
      case "production":
        return "bg-red-400";
      case "unusable":
        return "bg-gray-400";
      default:
        return "";
    }
  };

  const filteredPartTypes = parts.filter((part) =>
    part.part_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPartTypesDetail = partsDetail.filter((partDetail) =>
    partDetail.part_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChangeParts = (pageNumber: number) => {
    setCurrentPageParts(pageNumber);
  };

  const handlePageChangeDetails = (pageNumber: number) => {
    setCurrentPageDetails(pageNumber);
  };

  const indexOfLastItemParts = currentPageParts * itemsPerPageParts;
  const indexOfFirstItemParts = indexOfLastItemParts - itemsPerPageParts;
  const currentItemsParts = filteredPartTypes.slice(indexOfFirstItemParts, indexOfLastItemParts);
  const totalPagesParts = Math.ceil(filteredPartTypes.length / itemsPerPageParts);

  const indexOfLastItemDetails = currentPageDetails * itemsPerPageDetails;
  const indexOfFirstItemDetails = indexOfLastItemDetails - itemsPerPageDetails;
  const currentItemsDetails = filteredPartTypesDetail.slice(indexOfFirstItemDetails, indexOfLastItemDetails);
  const totalPagesDetails = Math.ceil(filteredPartTypesDetail.length / itemsPerPageDetails);

  const handlePartsAdded = () => {
    fetchPartDetail();
  };

  const handlePartsUpdate = () => {
    fetchPartDetail();
  };

  const menghandlePartsDeleted = () => {
    fetchPartDetail();
  };

  return (
    <div className="relative justify-center overflow-x-auto shadow-md sm:rounded-lg">
      <div className="overflow-x-auto whitespace-nowrap pl-4 py-2 text-md bg-[#3E3B64] text-white border-b">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <div className="flex space-x-4 mb-2 sm:mb-0">
            <span
              className={`cursor-pointer ${activeTab === "Part Types" ? "text-white border-b-2 border-blue-400" : ""}`}
              onClick={() => setActiveTab("Part Types")}
            >
              Part Types
            </span>
            <span
              className={`cursor-pointer ${activeTab === "Part Details" ? "text-white border-b-2 border-blue-400" : ""}`}
              onClick={() => setActiveTab("Part Details")}
            >
              Part Details
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="mr-4 p-2 rounded bg-white text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="py-3 overflow-x-auto">
        {activeTab === "Part Types" && (
          <div>
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase bg-[#3E3B64] text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Part Names
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Part Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItemsParts.map((part, index) => (
                  <tr
                    key={part.part_id}
                    className={`${index % 2 === 0 ? "bg-[#3E3B64] text-white" : "bg-[#4D4B6C] text-white"}`}
                  >
                    <td className="px-6 py-4">{part.part_name}</td>
                    <td className="px-6 py-4">{part.size}</td>
                    <td className="px-6 py-4">{part.location ? `${part.location}` : <span className="text-gray-400">Null</span>}</td>
                    <td className="px-6 py-4">{part.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPagesParts > 1 && (
              <div className="flex justify-center mt-4 pb-4">
                <div className="flex items-center space-x-2">
                  {currentPageParts > 1 && (
                    <button
                      onClick={() => handlePageChangeParts(currentPageParts - 1)}
                      className="px-3 py-1 rounded-full bg-gray-300 text-gray-800"
                    >
                      «
                    </button>
                  )}
                  <span className="px-3 py-1 text-gray-400">Page {currentPageParts} of {totalPagesParts}</span>
                  {currentPageParts < totalPagesParts && (
                    <button
                      onClick={() => handlePageChangeParts(currentPageParts + 1)}
                      className="px-3 py-1 rounded-full bg-gray-300 text-gray-800"
                    >
                      »
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "Part Details" && (
          <div>
            <div className="px-4">
              <AddPart onPartsAdded={handlePartsAdded} />
            </div>
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-[#3E3B64] dark:bg-gray-700 dark:text-gray-400">
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
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {currentItemsDetails.map((partDetail, index) => (
                  <tr
                    key={partDetail.part_id}
                    className={`${index % 2 === 0 ? "odd:bg-[#3E3B64] odd:dark:bg-[#4D4B6C]" : "even:bg-[#4D4B6C] even:dark:bg-[#3E3B64]"} text-white`}
                  >
                    <td className="px-6 py-4">{partDetail.part_name}</td>
                    <td className="px-6 py-4">{partDetail.size}</td>
                    <td className="px-6 py-4">{partDetail.model_name} ({partDetail.process_name})</td>
                    <td className="px-6 py-4">
                      {partDetail.status_part ? (
                        <span className={`px-4 py-2 rounded-full ${getStatusBgColor(partDetail.status_part)} text-blue-900 font-bold`}>
                          {partDetail.status_part}
                        </span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <UpdateParts partsDetail={partDetail} onPartUpdate={handlePartsUpdate} />
                      <DeleteParts partsDetail={partDetail} onPartsDeleted={menghandlePartsDeleted} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPagesDetails > 1 && (
              <div className="flex justify-center mt-4 pb-4">
                <div className="flex items-center space-x-2">
                  {currentPageDetails > 1 && (
                    <button
                      onClick={() => handlePageChangeDetails(currentPageDetails - 1)}
                      className="px-3 py-1 rounded-full bg-gray-300 text-gray-800"
                    >
                      «
                    </button>
                  )}
                  <span className="px-3 py-1 text-gray-400">Page {currentPageDetails} of {totalPagesDetails}</span>
                  {currentPageDetails < totalPagesDetails && (
                    <button
                      onClick={() => handlePageChangeDetails(currentPageDetails + 1)}
                      className="px-3 py-1 rounded-full bg-gray-300 text-gray-800"
                    >
                      »
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TableComponent;
