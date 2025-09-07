import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-4 px-6 text-center">
      © {new Date().getFullYear()} Room Booking Demo. All rights reserved.
    </footer>
  );
};

export default Footer;
