import React, { useEffect, useState } from "react";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline";
import AddMachine from "@/app/dashboard/line/addMachine";
import DeleteMachine from "@/app/dashboard/line/deleteMachine";
import UpdateMachine from "@/app/dashboard/line/updateMachine";

interface Machine {
  id_mesin: number;
  id_line: number;
  nama_line: string;
  nama_mesin: string;
  suhu: string;
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
  const [sortType, setSortType] = useState<null | string>(null); // State to manage sorting type
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [machines, setMachines] = useState<Machine[]>([]); // State to store machines data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/machine");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMachines(data.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Polling interval (e.g., every 30 seconds)
    const interval = setInterval(fetchData, 30000); // Adjust interval as needed

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSort = () => {
    if (sortType === "asc") {
      setSortType("desc");
    } else {
      setSortType("asc");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const lines: Line[] = [
    { line: 1, status: "On Progress", lineColor: "bg-teal-400" },
    { line: 2, status: "On Progress", lineColor: "bg-teal-400" },
    { line: 4, status: "Return", lineColor: "bg-blue-400" },
  ];

  // Filter machines based on searchQuery
  const filteredMachines = machines.filter((machine) =>
    machine.nama_mesin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to determine background color based on machine status
  const getStatusBgColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "safe":
        return "bg-teal-400";
      case "medium":
        return "bg-yellow-400";
      case "unsafe":
        return "bg-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="relative overflow-hidden shadow-md sm:rounded-lg">
      <div className="p-4 bg-[#4D4B6C] text-center text-white rounded-t-lg">
        <p className="text-sm">
          <span className="text-green-400">{"< 60 °C = Safe (Green)"}</span>
          <br />
          <span className="text-yellow-400">
            {"60 °C ~ 90 °C = Medium (Yellow)"}
          </span>
          <br />
          <span className="text-red-400">{"> 90 °C = Unsafe (Red)"}</span>
        </p>
      </div>
      <div className="overflow-x-auto whitespace-nowrap pl-4 py-2 text-md bg-[#3E3B64] text-white">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <span
              className={`cursor-pointer ${activeTab === "Line Monitoring"
                ? "text-white border-b-2 border-blue-400"
                : ""
                }`}
              onClick={() => setActiveTab("Line Monitoring")}
            >
              Line Monitoring
            </span>
            <span
              className={`cursor-pointer ${activeTab === "Line"
                ? "text-white border-b-2 border-blue-400"
                : ""
                }`}
              onClick={() => setActiveTab("Line")}
            >
              Manage Line
            </span>
          </div>
          <div className="pr-4">
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-center p-2 rounded cursor-pointer">
              A-Z
              <FunnelIcon className="w-4 h-4 ml-1" />
            </button>
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
        {activeTab === "Line Monitoring" && (
          <div className="pr-4">
            <AddMachine />
          </div>
        )}
        {activeTab === "Line" && (
          <div className="pr-4">
            <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl flex items-center space-x-2">
              <PlusIcon className="w-6 h-6" />
              <span>Add Line</span>
            </button>
          </div>
        )}
      </div>
      <div className="py-3 overflow-x-auto">
        {activeTab === "Line Monitoring" && (
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
              {filteredMachines.map((machine, index) => (
                <tr
                  key={machine.id_mesin}
                  className={`${index % 2 === 0
                    ? "odd:bg-[#3E3B64] odd:dark:bg-[#4D4B6C]"
                    : "even:bg-[#4D4B6C] even:dark:bg-[#3E3B64]"
                    } text-white`}
                >
                  <td className="px-6 py-4">{machine.nama_line}</td>
                  <td className="px-6 py-4">{machine.nama_mesin}</td>
                  <td className="px-6 py-4">
                    {machine.suhu ? (
                      `${machine.suhu} °C`
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {machine.status ? (
                      <span
                        className={`px-4 py-2 rounded-full ${getStatusBgColor(
                          machine.status
                        )} text-blue-900 font-bold`}
                      >
                        {machine.status}
                      </span>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <UpdateMachine {...machine} />
                    <DeleteMachine {...machine} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "Line" && (
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#3E3B64] text-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Line
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0
                    ? "odd:bg-[#3E3B64] odd:dark:bg-[#4D4B6C]"
                    : "even:bg-[#4D4B6C] even:dark:bg-[#3E3B64]"
                    } text-white`}
                >
                  <td className="px-6 py-4">{line.line}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center justify-center px-4 py-2 rounded-full ${line.lineColor} text-blue-900 font-bold`}
                    >
                      {line.status}
                    </span>
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
        )}
      </div>
    </div>
  );
};

export default TableComponent;

