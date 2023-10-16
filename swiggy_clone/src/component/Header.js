import React from "react";
import { CDN_LOGO } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center shadow-lg z-10 w-full bg-slate-50">
      <div className="flex items-center">
        <img className="h-14 lg:h-28 p-2" src={CDN_LOGO} alt="logo" />
      </div>
      <div className="mt-4 lg:mt-0">
        <ul className="flex list-none pr-4 lg:pr-14 font-semibold text-gray-700 text-lg">
          <Link to="/">
            <li className="mr-4">Home</li>
          </Link>

          <Link to="/about">
            <li className="mr-5">About</li>
          </Link>
          <Link to="/cart">
            <li className="mr-6">
              Cart ({cartItems.items.length})
            </li>
          </Link>
          <Link to="/login">
            <li className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
              Log In
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
