import React, { ReactNode } from "react";
import Header from "../components/Header";
import Tabs from "../hooks/Tabs";
import LazadaShop from "../components/lazada/LazadaShop";
import LazadaProduct from "../components/lazada/LazadaProduct";

type TabItem = {
  label: string;
  key: string;
  children: ReactNode;
};

const Lazada = () => {
  const items: TabItem[] = [
    {
      label: "Lazada",
      key: "1",
      children: <LazadaProduct />,
    },
    {
      label: "Shop detail",
      key: "2",
      children: <LazadaShop />,
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

export default Lazada;
