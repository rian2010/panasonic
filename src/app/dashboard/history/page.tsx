'use client'

import History from '@/app/components/ui/tableHistory';

export default function history() {
  return (
    <div className='min-h-screen p-8 text-white'>
      <div className='bg-[#3E3B64] p-4 rounded-lg mt-4'>
        <History />
      </div>
    </div>
  );
}
