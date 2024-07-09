import React from "react";
import { TiThMenu } from "react-icons/ti";
import Dropdown from "../hooks/Dropdown";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex justify-center w-full h-16 text-base text-white bg-gray-400">
        <p className="my-auto ">Auto Ecommerces Extension</p>
        <div className="absolute right-3 top-4">
          <Dropdown label={<TiThMenu />}>
          <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/login">Sign In</Link>
            <a
              href="/register"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              target="_blank"
            >
              Sign Up
            </a>
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/shopee">Shopee</Link>
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/lazada">Lazada</Link>
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/home">Logout</Link>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
