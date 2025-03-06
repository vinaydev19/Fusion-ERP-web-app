import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/commen/Sidebar";
import Navbar from "../components/commen/Navbar";

function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col shadow-lg">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className=" bg-white/90 backdrop-blur-md ">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Home;
