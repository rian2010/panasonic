"use client";

import React, { useState } from 'react';
import BarChartContainer from "@/app/components/ui/bar";
import ProgressDonutChart from "@/app/components/ui/donut";
import Table from "@/app/components/ui/table";
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const charts = [
    <BarChartContainer key={0} />,
    <BarChartContainer key={1} />,
  ];

  const handleNextClick = () => {
    setCurrentChartIndex((prevIndex) => (prevIndex + 1) % charts.length);
  };

  const handlePrevClick = () => {
    setCurrentChartIndex((prevIndex) => (prevIndex - 1 + charts.length) % charts.length);
  };

  return (
    <div className="min-h-screen p-8 text-white">
      {/* Display charts side-by-side on larger screens */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 mb-6">
        {charts.map((chart, index) => (
          <div className="bg-[#3E3B64] p-4 rounded-lg" key={index}>
            {chart}
          </div>
        ))}
      </div>

      {/* Display single chart with navigation arrows on smaller screens */}
      <div className="block md:hidden mb-6">
        <div className="bg-[#3E3B64] p-4 rounded-lg">
          {charts[currentChartIndex]}
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-[#615EFC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={handlePrevClick}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            className="bg-[#615EFC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={handleNextClick}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-[#3E3B64] p-4 rounded-lg">
        <Table />
      </div>
    </div>
  );
}

