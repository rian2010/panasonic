import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

function TableComponent() {
  const [activeTab, setActiveTab] = useState('Line Monitoring');
  const [sortType, setSortType] = useState<string | null>(null); // State to manage sorting type
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query

  interface Part {
    part: string;
    size: string;
    model: string;
    quantity: number;
  }

  // Sample data
  const partTypes: Part[] = [
    { part: 'Bor', size: '5 mm', model: 'Model A1', quantity: 5 },
    { part: 'Bor', size: '10 mm', model: 'Model A2', quantity: 10 },
    { part: 'Drill', size: '15 mm', model: 'Model B1', quantity: 8 },
    { part: 'Cutter', size: '20 mm', model: 'Model C1', quantity: 12 },
  ];

  // Function to handle sorting based on the sortType
  const handleSort = () => {
    if (sortType === 'asc') {
      setSortType('desc');
    } else {
      setSortType('asc');
    }
  };

  const sortedPartTypes = [...partTypes].sort((a, b) => {
    if (!sortType) return 0;
    if (sortType === 'asc') {
      return a.part.localeCompare(b.part);
    } else {
      return b.part.localeCompare(a.part);
    }
  });

  const filteredPartTypes = sortedPartTypes.filter((part) =>
    part.part.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="overflow-x-auto whitespace-nowrap pl-4 py-2 text-md bg-[#3E3B64] text-white border-b">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <span
              className={`cursor-pointer ${activeTab === 'Line Monitoring' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}
              onClick={() => setActiveTab('Line Monitoring')}
            >
              Part Types
            </span>
            <span
              className={`cursor-pointer ${activeTab === 'Finished Products' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}
              onClick={() => setActiveTab('Finished Products')}
            >
              Finished Products
            </span>
            <span
              className={`cursor-pointer ${activeTab === 'Delivered' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}
              onClick={() => setActiveTab('Delivered')}
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
              className={`text-center p-2 pr-4 rounded cursor-pointer flex items-center ${sortType ? 'bg-[#55BED2]' : 'bg-gray-500'}`}
              onClick={handleSort}
            >
              A-Z
              <FunnelIcon className='w-4 h-4 ml-1'/>
            </div>
          </div>
        </div>
      </div>
      <div>
        {activeTab === 'Line Monitoring' && (
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#3E3B64] text-white">
              <tr>
                <th scope="col" className="px-6 py-3">Part Names</th>
                <th scope="col" className="px-6 py-3">Sizes</th>
                <th scope="col" className="px-6 py-3">Model</th>
                <th scope="col" className="px-6 py-3">Model Quantity</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPartTypes.map((part, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? 'bg-[#3E3B64] text-white'
                      : 'bg-[#4D4B6C] text-white'
                  }`}
                >
                  <td className="px-6 py-4">{part.part}</td>
                  <td className="px-6 py-4">{part.size}</td>
                  <td className="px-6 py-4">{part.model}</td>
                  <td className="px-6 py-4">{part.quantity}</td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-white bg-[#55BED2] px-2 py-1 rounded dark:text-blue-500 hover:bg-blue-700">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'Finished Products' && (
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">Product A</td>
                <td className="px-6 py-4">Complete</td>
                <td className="px-6 py-4">100</td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {activeTab === 'Delivered' && (
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Order</th>
                <th scope="col" className="px-6 py-3">Customer</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">Order 1</td>
                <td className="px-6 py-4">Customer A</td>
                <td className="px-6 py-4">Delivered</td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Details</a>
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

