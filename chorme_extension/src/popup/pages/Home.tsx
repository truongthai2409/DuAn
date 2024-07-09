import React, { useState, ReactNode } from "react";
// import { TiThMenu } from "react-icons/ti";
import Dropdown from "../hooks/Dropdown";
import { Link } from "react-router-dom";
import Header from "../components/Header";


const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="p-4">
        <p className="block px-4 py-2 text-sm">Choose the e-commerce platform you want!</p>
        <div>
          <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/shopee">Shopee</Link>
          <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/lazada">Lazada</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
