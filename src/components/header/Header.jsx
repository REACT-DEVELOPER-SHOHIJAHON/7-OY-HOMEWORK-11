import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { AutoComplete } from "antd";
import { useSearchProductMutation } from "../../redux/api/productsApi";

const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [searchProduct, { data }] = useSearchProductMutation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const likedProductsCount = useSelector((state) => state.like.likes.length);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/search?q=${searchValue}`);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  if (pathname.includes("auth") || pathname.includes("dashboard")) return null;

  return (
    <header className="relative bg-gradient-to-r from-blue-500 to-teal-500">
      <Sidebar
        visible={sidebarVisible}
        toggleSidebar={toggleSidebar}
        token={token}
      />
      
      {sidebarVisible && (
        <div 
          onClick={toggleSidebar} 
          className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30"
        />
      )}

      <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white shadow-lg border-b border-gray-300 z-20 rounded-b-lg">
        <button 
          onClick={toggleSidebar} 
          className={`text-gray-800 text-3xl hover:text-teal-600 ${sidebarVisible ? "hidden" : ""}`}
        >
          <GiHamburgerMenu />
        </button>

        <Link to="/" className="flex items-center">
          <div className="w-36 h-auto file">LOGO</div>
        </Link>

        <SearchForm 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchProduct={searchProduct}
          handleSearch={handleSearch}
          data={data}
        />

        <ActionIcons likedProductsCount={likedProductsCount} />
      </nav>
    </header>
  );
};

const Sidebar = ({ visible, toggleSidebar, token }) => (
  <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform transform ${visible ? "translate-x-0" : "-translate-x-full"} z-40 w-72 shadow-2xl`}>
    <button onClick={toggleSidebar} className="absolute top-4 right-4 text-4xl hover:text-teal-300">&times;</button>
    <ul className="flex flex-col items-start p-8 space-y-5">
      <li><Link to="/" onClick={toggleSidebar} className="hover:text-teal-300 text-xl transition-colors">Ana Sahifa</Link></li>
      {!token ? (
        <>
          <li><Link to="auth/signUp" onClick={toggleSidebar} className="hover:text-teal-300 text-xl transition-colors">Ro'yxatdan o'tish</Link></li>
          <li><Link to="auth/login" onClick={toggleSidebar} className="hover:text-teal-300 text-xl transition-colors">Kirish</Link></li>
        </>
      ) : (
        <>
          <li><Link to="/dashboard/profile" onClick={toggleSidebar} className="hover:text-teal-300 text-xl transition-colors">Profilim</Link></li>
          <li><Link to="/dashboard/settings" onClick={toggleSidebar} className="hover:text-teal-300 text-xl transition-colors">Sozlamalar</Link></li>
        </>
      )}
    </ul>
  </div>
);

const SearchForm = ({ searchValue, setSearchValue, searchProduct, handleSearch, data }) => (
  <form onSubmit={handleSearch} className="flex flex-grow justify-center mx-6">
    <AutoComplete
      options={data?.payload?.map((product) => ({
        label: <Link key={product._id} to={`/products/${product._id}`} className="hover:text-teal-600">{product.product_name}</Link>,
      }))}
      style={{ maxWidth: "400px", width: "100%" }}
      onChange={setSearchValue}
      onSearch={searchProduct}
      placeholder="Mahsulot qidirish..."
      className="flex-grow border border-gray-300 rounded-full shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </form>
);

const ActionIcons = ({ likedProductsCount }) => (
  <div className="flex items-center space-x-6">
    <div className="relative">
      <Link to="/liked" className="text-2xl text-gray-800 hover:text-teal-600 transition-colors">
        <FcLike />
      </Link>
      {likedProductsCount > 0 && (
        <span className="absolute top-[-8px] right-[-8px] bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {likedProductsCount}
        </span>
      )}
    </div>
    <Link to="/cart" className="text-2xl text-gray-800 hover:text-teal-600 transition-colors">
      <FiShoppingCart />
    </Link>
    <Link to="/dashboard/profile" className="text-2xl text-gray-800 hover:text-teal-600 transition-colors">
      <CgProfile />
    </Link>
    <Link to="/dashboard/settings" className="text-2xl text-gray-800 hover:text-teal-600 transition-colors">
      <AiOutlineSetting />
    </Link>
  </div>
);

export default Header;
