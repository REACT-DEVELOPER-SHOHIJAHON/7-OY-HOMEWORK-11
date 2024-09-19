import { GiHamburgerMenu, GiCardboardBox, GiPerson } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa'; 
import { MdLogout } from 'react-icons/md'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <SidebarMenu isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      {isOpen && <Overlay toggleSidebar={toggleSidebar} />}
    </div>
  );
};

const Header = ({ toggleSidebar }) => (
  <nav className="fixed top-0 left-0 z-50 w-full h-16 bg-gradient-to-r from-green-400 to-blue-600 flex items-center justify-between px-4 transition-transform duration-300">
    <button className="text-white text-2xl" onClick={toggleSidebar} aria-label="Toggle Sidebar">
      <GiHamburgerMenu />
    </button>
    <Link to='/'>
      <button className="flex items-center space-x-2 text-xl text-white border-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-200">
        Home <FaHome className="text-2xl text-white" />
      </button>
    </Link>
  </nav>
);

const SidebarMenu = ({ isOpen, toggleSidebar, handleLogout }) => (
  <div className={`fixed top-0 left-0 h-full bg-gray-900 p-6 shadow-lg text-white text-lg w-64 transform sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 flex flex-col`}>
    <button className="absolute top-4 right-4 text-white text-2xl" onClick={toggleSidebar} aria-label="Close Sidebar" />

    <ul className="mt-16 space-y-4">
      <li>
        <Link to="/dashboard/profile" onClick={toggleSidebar} className="flex items-center space-x-2 text-xl hover:text-green-400 transition duration-200">
          <GiPerson className="text-2xl" />
          <span className="font-semibold">Profile</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/users" onClick={toggleSidebar} className="flex items-center space-x-2 text-xl hover:text-green-400 transition duration-200">
          <GiCardboardBox className="text-2xl" />
          <span className="font-semibold">Users</span>
        </Link>
      </li>
    </ul>

    <button onClick={handleLogout} className="mt-auto flex items-center space-x-2 text-xl hover:text-red-500 transition duration-200">
      <MdLogout className="text-2xl" />
      <span className="font-semibold">Logout</span>
    </button>
  </div>
);

const Overlay = ({ toggleSidebar }) => (
  <div onClick={toggleSidebar} className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30" style={{ cursor: 'pointer' }} />
);

export default Sidebar;
