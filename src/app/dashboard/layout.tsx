"use client";
import SideNav from "../components/ui/sidenav";
import Navbar from "../components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow md:flex-row md:overflow-hidden w-full">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-[#2e2c53]">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}

