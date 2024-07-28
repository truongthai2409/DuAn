import React, { ReactNode } from "react";
import Tabs from '../hooks/Tabs';
import Header from "../components/Header";
import ShopeeProduct from "../components/shopee/ShopeeProduct";
import ShopeeShopDetail from "../components/shopee/ShopeeShopDetail";

type TabItem = {
  label: string;
  key: string;
  children: ReactNode;
};

const Shopee: React.FC = () => {
  const items: TabItem[] = [
    {
      label: "Shopee Product",
      key: "1",
      children: <ShopeeProduct />,
    },
    {
      label: "Shope detail",
      key: "2",
      children: <ShopeeShopDetail />,
    },
  ];

  return (
    <>
      <Header />
      <div className="m-4 bg-white">
        <Tabs items={items} />
      </div>
    </>
  );
};

export default Shopee;
