import React, { useState } from "react";
import "./Navigation.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersSlice";
import { logout } from "../../redux/features/auth/authSlice";

import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSlidebar, setShowSlidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSlidebar(!showSlidebar);
  };

  const closeSidebar = () => {
    setShowSlidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSlidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] transform fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className=" flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={26} className=" mr-2 mt-[3rem]" />
          <span className=" hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>
        <Link
          to="/shop"
          className=" flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={26} className=" mr-2 mt-[3rem]" />
          <span className=" hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>
        <Link
          to="/cart"
          className=" flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart size={26} className=" mr-2 mt-[3rem]" />
          <span className=" hidden nav-item-name mt-[3rem]">CART</span>
        </Link>
        <Link
          to="/favorite"
          className=" flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={26} className=" mr-2 mt-[3rem]" />
          <span className=" hidden nav-item-name mt-[3rem]">Favorite</span>
        </Link>
      </div>

      <div className=" relative">
        <button
          onClick={toggleDropdown}
          className=" flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <sapn className=" text-white">{userInfo.username}</sapn>
          ) : (
            <></>
          )}
        </button>
      </div>

      <ul className="">
        <li className="">
          <Link
            to="/login"
            className=" flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin size={26} className=" mr-2 mt-[3rem]" />
            <span className=" hidden nav-item-name mt-[3rem]">Login</span>
          </Link>
        </li>
        <li className="">
          <Link
            to="/register"
            className=" flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd size={26} className=" mr-2 mt-[3rem]" />
            <span className=" hidden nav-item-name mt-[3rem]">Register</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
