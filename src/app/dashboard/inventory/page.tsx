"use client";

import BarChartContainer from "@/app/components/ui/bar";
import ProgressDonutChart from "@/app/components/ui/donut";
import Table from "@/app/components/ui/table";

export default function Page() {
  return (
    <div className="min-h-screen p-8 text-white">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#3E3B64] p-4 rounded-lg">
          <BarChartContainer />
        </div>
        <div className="bg-[#3E3B64] p-4 rounded-lg">
          <BarChartContainer />
        </div>
        <div className="bg-[#3E3B64] p-4 rounded-lg">
          <ProgressDonutChart/>
        </div>
      </div>
      <div className="bg-[#3E3B64] p-4 rounded-lg">
        <Table />
      </div>
    </div>
  );
}

