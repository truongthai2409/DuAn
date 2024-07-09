import React, { ReactNode } from "react";
// import { TiThMenu } from "react-icons/ti";
import Tabs from '../hooks/Tabs';
import Header from "../components/Header";

type TabItem = {
  label: string;
  key: string;
  children: ReactNode;
};


const Shopee1 = () => {
  const handleClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "getElementByXPath",
          xpath:
            '//*[@id="sll2-normal-pdp-main"]/div/div[1]/div/div/section[1]/section[2]/div/div[1]/span',
        },
        (response) => {
          alert(response.textContent);
        }
      );
    });
  };
  return (
    <>
      <button onClick={handleClick}>Get data</button>
      <div>Shopee Component</div>
      {/* <DropDown1 /> */}
    </>
  );
};

const Shopee: React.FC = () => {
  const items: TabItem[] = [
    {
      label: "Shopee",
      key: "1",
      children: <Shopee1 />,
    },
    {
      label: "Shope detail",
      key: "2",
      children: <Shopee1 />,
    },
  ];

  return (
    <>
      <Header />
      <Tabs items={items} />
    </>
  );
};

export default Shopee;
