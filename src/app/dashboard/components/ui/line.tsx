import React from 'react';

type Status = 'available' | 'safe' | 'medium' | 'unsafe';

interface Cell {
  status: Status;
}

interface Row {
  machine: string;
  cells: Cell[];
}

const data: Row[] = [
  { machine: 'Machine 1', cells: [{ status: 'safe' }, { status: 'unsafe' }, { status: 'available' }, { status: 'available' }, { status: 'available' }, { status: 'available' }, { status: 'available' }] },
  { machine: 'Machine 2', cells: [{ status: 'medium' }, { status: 'available' }, { status: 'available' }, { status: 'available' }, { status: 'available' }, { status: 'available' }, { status: 'available' }] },
  // Add more rows as needed
];

const statusClasses = {
  available: 'bg-white',
  safe: 'bg-teal-500',
  medium: 'bg-yellow-500',
  unsafe: 'bg-red-500',
};

const MachineStatusGrid: React.FC = () => {
  return (
    <div className="p-4 text-white bg-[#3E3B64] rounded-lg">
      <table className="w-full table-auto border-separate" style={{ borderSpacing: '5px 5px' }}>
        <thead>
          <tr>
            <th className="text-left px-1 py-1">Machine</th>
            {Array.from({ length: 7 }, (_, i) => (
              <th key={i} className="text-center px-1 py-1">{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="text-left px-1 py-1">{row.machine}</td>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex} className={`w-6 h-3 rounded-md ${statusClasses[cell.status]}`}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-white rounded-md"></div>
          <span className="ml-2 text-xs">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-teal-500 rounded-md"></div>
          <span className="ml-2 text-xs">Safe</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-md"></div>
          <span className="ml-2 text-xs">Medium</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-md"></div>
          <span className="ml-2 text-xs">Unsafe</span>
        </div>
      </div>
    </div>
  );
};

export default MachineStatusGrid;

