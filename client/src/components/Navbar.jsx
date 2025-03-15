import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { useStateContext } from "../context";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";

const LoginLogoutButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return isAuthenticated ? (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="bg-[#ff4d4d] text-white px-4 py-2 rounded-[10px] font-epilogue font-medium"
    >
      Log Out
    </button>
  ) : (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-[#6a5acd] text-white px-4 py-2 rounded-[10px] font-epilogue font-medium"
    >
      Log In
    </button>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const { user, isAuthenticated } = useAuth0();

  console.log("Current User", user);
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`); // Navigate to the search results page with the query
    }
  };
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          value={searchQuery} // Bind the input value to the state
          onChange={(e) => setSearchQuery(e.target.value)} // Update the state when input changes
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div
          className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
          onClick={handleSearch} // Trigger the search on click
        >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <button
          onClick={() => (address ? navigate("create-campaign") : connect())}
          className={`${
            address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"
          } text-white px-4 py-2 rounded-[10px] font-epilogue font-medium`}
        >
          {address ? "Create a campaign" : "Connect"}
        </button>
        <LoginLogoutButton />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4 gap-4">
            <button
              onClick={() =>
                address ? navigate("create-campaign") : connect()
              }
              className={`${
                address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"
              } text-white px-4 py-2 rounded-[10px] font-epilogue font-medium`}
            >
              {address ? "Create a campaign" : "Connect"}
            </button>
            <LoginLogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
