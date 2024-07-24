import React from "react";
import { FaHome } from "react-icons/fa";
import { MdProductionQuantityLimits, MdLogout } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";
import { FaHeading } from "react-icons/fa";
import { GiWingfoot } from "react-icons/gi";
import { LuContact2 } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarToggle, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state
    setIsLoggedIn(false);

    // Redirect to login page
    navigate('/');
  };

  return (
    <div className={`${sidebarToggle ? "hidden" : "block"} w-64 bg-gray-200 text-black fixed h-full px-4 py-2 font-sans shadow-lg`}>
      <div className="my-2 mb-4 bg-gray-300 rounded-lg font-sans p-4 shadow-md">
        <h1 className="text-2xl text-black font-bold text-center">Admin</h1>
      </div>
      <hr className="text-gray-950" />
      <ul className="mt-3 text-black font-bold">
        <li className="mb-2 rounded hover:shadow-md hover:bg-blue-500 hover:text-white transition duration-300 py-8">
          <Link to="/" className="px-3 flex items-center">
            <FaHome className="w-6 h-6 mr-2" />
            About Us
          </Link>
        </li>
        <li className="mb-2 rounded-sm hover:shadow-md hover:bg-blue-500 hover:text-white transition duration-300 py-8">
          <Link to="/products" className="px-3 flex items-center">
            <MdProductionQuantityLimits className="w-6 h-6 mr-2" />
            Products
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow-md hover:bg-blue-500 hover:text-white transition duration-300 py-8">
          <Link to="/gallery" className="px-3 flex items-center">
            <RiGalleryFill className="w-6 h-6 mr-2" />
            Gallery
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow-md hover:bg-blue-500 hover:text-white transition duration-300 py-8">
          <Link to="/header" className="px-3 flex items-center">
            <FaHeading className="w-6 h-6 mr-2" />
            Header
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow-md hover:bg-blue-500 hover:text-white transition duration-300 py-8">
          <Link to="/contact" className="px-3 flex items-center">
            <LuContact2 className="w-6 h-6 mr-2" />
            Contact
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow-md hover:bg-blue-500 hover:text-white transition duration-300 py-8">
          <Link to="/footer" className="px-3 flex items-center">
            <GiWingfoot className="w-6 h-6 mr-2" />
            Footer
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow-md hover:bg-red-500 hover:text-white transition duration-300 py-8">
          <button onClick={handleLogout} className="px-3 flex items-center w-full">
            <MdLogout className="w-6 h-6 mr-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
