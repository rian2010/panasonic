'use client'

import OrderPart from "@/app/components/ui/orderPartTable";

export default function Part() {
  return (
    <div className='min-h-screen p-8 text-white'>
      <div className='bg-[#3E3B64] p-4 rounded-lg mt-4'>
        <OrderPart />
      </div>
    </div>
  );
}

