import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold">🏨 Room Booking</h1>
      <nav className="space-x-4">
        <a href="#" className="hover:text-gray-400">Home</a>
        <a href="#" className="hover:text-gray-400">Rooms</a>
        <a href="#" className="hover:text-gray-400">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
