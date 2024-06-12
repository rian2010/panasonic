import { useState } from "react";
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";

function TableComponent() {
  const [activeTab, setActiveTab] = useState("Part Types");
  const [sortType, setSortType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  interface Part {
    part: string;
    size: string;
    model: string;
    quantity: number;
  }

  interface PartDetail {
    part: string;
    size: string;
    model: string;
    machine: string;
    line: number;
    location: string;
    status: string;
    statusColor: string;
  }

  const partDetails: PartDetail[] = [
    {
      part: "Bor",
      size: "5 mm",
      model: "Model A1",
      machine: "Machine A",
      line: 1,
      location: "Shelf 1",
      status: "Unused",
      statusColor: "bg-[#53DFB5]",
    },
    {
      part: "Bor",
      size: "5 mm",
      model: "Model A1",
      machine: "Machine A",
      line: 1,
      location: "Shelf 1",
      status: "Ordered",
      statusColor: "bg-[#59C5F7]",
    },
    {
      part: "Bor",
      size: "5 mm",
      model: "Model A1",
      machine: "Machine A",
      line: 1,
      location: "Shelf 1",
      status: "Used",
      statusColor: "bg-[#FF949F]",
    },
  ];

  const partTypes: Part[] = [
    { part: "Bor", size: "5 mm", model: "Model A1", quantity: 5 },
    { part: "Bor", size: "10 mm", model: "Model A2", quantity: 10 },
    { part: "Drill", size: "15 mm", model: "Model B1", quantity: 8 },
    { part: "Cutter", size: "20 mm", model: "Model C1", quantity: 12 },
  ];

  const handleSort = () => {
    setSortType((prevSortType) => (prevSortType === "asc" ? "desc" : "asc"));
  };

  const sortedPartTypes = [...partTypes].sort((a, b) => {
    if (!sortType) return 0;
    if (sortType === "asc") {
      return a.part.localeCompare(b.part);
    } else {
      return b.part.localeCompare(a.part);
    }
  });

  const filteredPartTypes = sortedPartTypes.filter((part) =>
    part.part.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative justify-center overflow-x-auto shadow-md sm:rounded-lg">
      <div className="overflow-x-auto whitespace-nowrap pl-4 py-2 text-md bg-[#3E3B64] text-white border-b">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <div className="flex space-x-4 mb-2 sm:mb-0">
            <span
              className={`cursor-pointer ${activeTab === "Part Types"
                ? "text-blue-400 border-b-2 border-blue-400"
                : ""
                }`}
              onClick={() => setActiveTab("Part Types")}
            >
              Part Types
            </span>
            <span
              className={`cursor-pointer ${activeTab === "Part Details"
                ? "text-blue-400 border-b-2 border-blue-400"
                : ""
                }`}
              onClick={() => setActiveTab("Part Details")}
            >
              Part Details
            </span>
            <span
              className={`cursor-pointer ${activeTab === "Delivered"
                ? "text-blue-400 border-b-2 border-blue-400"
                : ""
                }`}
              onClick={() => setActiveTab("Delivered")}
            >
              Delivered
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
            <div
              className={`text-center p-2 pr-4 rounded cursor-pointer flex items-center ${sortType ? "bg-[#55BED2]" : "bg-gray-500"
                }`}
              onClick={handleSort}
            >
              A-Z
              <FunnelIcon className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 overflow-x-auto">
        {activeTab === "Part Types" && (
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#3E3B64] text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Part Names
                </th>
                <th scope="col" className="px-6 py-3">
                  Sizes
                </th>
                <th scope="col" className="px-6 py-3">
                  Model
                </th>
                <th scope="col" className="px-6 py-3">
                  Model Quantity
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPartTypes.map((part, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0
                    ? "bg-[#3E3B64] text-white"
                    : "bg-[#4D4B6C] text-white"
                    }`}
                >
                  <td className="px-6 py-4">{part.part}</td>
                  <td className="px-6 py-4">{part.size}</td>
                  <td className="px-6 py-4">{part.model}</td>
                  <td className="px-6 py-4">{part.quantity}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className=" font-medium text-white bg-[#55BED2] px-2 py-1 rounded dark:text-blue-500 hover:bg-blue-700"
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "Part Details" && (
          <div>
            <div className="px-4">
              <button className="bg-[#59C5F7] hover:bg-green-700 text-black font-bold py-2 px-4 rounded my-4 flex items-center">
                <PlusIcon className="w-6 h-6" />
                <span>Add Part</span>
              </button>
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
                    Machine
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Line
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
                {partDetails.map((partDetail, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0
                      ? "odd:bg-[#3E3B64] odd:dark:bg-[#4D4B6C]"
                      : "even:bg-[#4D4B6C] even:dark:bg-[#3E3B64]"
                      } text-white`}
                  >
                    <td className="px-6 py-4">{partDetail.part}</td>
                    <td className="px-6 py-4">{partDetail.size}</td>
                    <td className="px-6 py-4">{partDetail.model}</td>
                    <td className="px-6 py-4">{partDetail.machine}</td>
                    <td className="px-6 py-4">{partDetail.line}</td>
                    <td className="px-6 py-4">{partDetail.location}</td>
                    <td className="px-6 py-4">
                      {partDetail.status && (
                        <span
                          className={`px-4 py-2 rounded-full ${partDetail.statusColor} text-blue-900 font-bold`}
                        >
                          {partDetail.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                      <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "Delivered" && (
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-[#3E3B64] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-[#3E3B64] even:bg-[#4D4B6C] text-white">
                <td className="px-6 py-4">Order 1</td>
                <td className="px-6 py-4">Customer A</td>
                <td className="px-6 py-4">Delivered</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-white bg-[#55BED2] px-2 py-1 rounded dark:text-blue-500 hover:bg-blue-700"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TableComponent;

