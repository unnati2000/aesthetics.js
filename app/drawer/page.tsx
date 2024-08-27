"use client";

import { useState } from "react";

import { IoClose } from "react-icons/io5";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full h-screen bg-stone-950 overflow-hidden">
      {/* Drawer */}
      <div
        className={`w-60 h-full border fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <IoClose
          size={24}
          onClick={() => setIsOpen(false)}
          className="text-stone-500 cursor-pointer absolute top-4 right-4"
        />
        {/* Drawer content */}
      </div>

      {/* Main content */}
      <div
        className={`min-h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-60" : "translate-x-0"
        }`}
      >
        <h1
          className="text-white cursor-pointer p-4"
          onClick={() => setIsOpen(true)}
        >
          Content on the right
        </h1>
        {/* Other main content */}
      </div>
    </div>
  );
};
export default Drawer;

