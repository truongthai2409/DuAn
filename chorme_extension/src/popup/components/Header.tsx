import React from "react";
import { TiThMenu } from "react-icons/ti";
import Dropdown from "../hooks/Dropdown";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";

const HOST_FE = process.env.HOST_FE;

const Header = () => {
  const { i18n } = useTranslation();
  const { logoutAuth } = useAuth();
  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };
  const handleLogout = () => {
    logoutAuth();
  };
  return (
    <div className="flex justify-center w-full h-16 text-base text-white bg-gray-400">
      <p className="my-auto ">Auto Ecommerces Extension</p>
      <div className="absolute top-5 right-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-full">
            <span
              onClick={() => {
                changeLanguage("en");
              }}
            >
              <img
                className="h-[20px] w-[30px] rounded-md"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
                alt=""
              />
            </span>
            <p className="px-2">|</p>
            <span
              onClick={() => {
                changeLanguage("vi");
              }}
            >
              <img
                className="h-[20px] w-[30px] rounded-md"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/225px-Flag_of_Vietnam.svg.png"
                alt=""
              />
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-3 top-4">
        <Dropdown label={<TiThMenu />}>
          <a
            href={`${HOST_FE}/register`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            target="_blank"
          >
            Sign Up
          </a>
          <Link
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            to="/shopee"
          >
            Shopee
          </Link>
          <Link
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            to="/lazada"
          >
            Lazada
          </Link>
          <Link
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            to="/login"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
