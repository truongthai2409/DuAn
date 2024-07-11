import React, { ReactNode } from "react";
// import { TiThMenu } from "react-icons/ti";
import Tabs from '../hooks/Tabs';
import Header from "../components/Header";
import ShopeeShop from "../components/shopee/ShopeeShop";
import ShopeeProduct from "../components/shopee/ShopeeProduct";

type TabItem = {
  label: string;
  key: string;
  children: ReactNode;
};

const Shopee: React.FC = () => {
  const items: TabItem[] = [
    {
      label: "Shopee",
      key: "1",
      children: <ShopeeShop />,
    },
    {
      label: "Shope detail",
      key: "2",
      children: <ShopeeProduct />,
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
