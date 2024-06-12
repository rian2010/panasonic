export default function Pagination() {
  return (
    <div className="flex items-center justify-end p-4">
      <button className="bg-[#2e2c53] join-item btn text-white rounded-l-md px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
        «
      </button>
      <span className="join-item bg-[#4D4B6C] btn text-white px-4 py-2 shadow-md rounded-lg">
        1
      </span>
      <button className="bg-[#2e2c53] join-item btn  text-white rounded-r-md px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
        »
      </button>
    </div>
  );
}

