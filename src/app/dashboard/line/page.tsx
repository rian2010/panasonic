"use client";

import React from 'react';
import Table from "@/app/components/ui/tableLine";
import Line from "@/app/components/ui/line";

export default function LinePage() {
  return (
    <div className="min-h-screen p-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#3E3B64] p-4 rounded-lg">
          <Line />
        </div>
        <div className="bg-[#3E3B64] p-4 rounded-lg">
          <Line />
        </div>
      </div>
      <div className="bg-[#3E3B64] p-4 rounded-lg mt-4">
        <Table />
      </div>
    </div>
  );
}

