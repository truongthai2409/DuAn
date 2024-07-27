import React from "react";
import { TiThMenu } from "react-icons/ti";
import Dropdown from "../hooks/Dropdown";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n } = useTranslation()
  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng)
  }
  return (
    <>
      <div className="flex justify-center w-full h-16 text-base text-white bg-gray-400">
        <p className="my-auto ">Auto Ecommerces Extension</p>
        <div className="flex items-center justify-between">
                <div className='flex items-center justify-center w-full'>
                  <span onClick={()=> {changeLanguage('en')}}>
                    <img className='h-[30px] w-[60px] rounded-md' src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg" alt="" />
                  </span>
                  <p className='px-5'>|</p>
                  <span onClick={()=> {changeLanguage('vi')}}>
                    <img className='h-[30px] w-[60px] rounded-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/225px-Flag_of_Vietnam.svg.png" alt="" />
                  </span>
                </div>
              </div>
        <div className="absolute right-3 top-4">
          <Dropdown label={<TiThMenu />}>
          <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/login">Sign In</Link>
            <a
              href="http://localhost:5173/register"
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
