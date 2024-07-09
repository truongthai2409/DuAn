import React, { ReactNode, useState } from "react";

type TabItem = {
  label: string;
  key: string;
  children: ReactNode;
};

type TabsProps = {
  items: TabItem[];
};

const Tabs: React.FC<TabsProps> = ({ items }) => {
  const [activeKey, setActiveKey] = useState<string>(items[0]?.key || "");

  const handleTabClick = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div>
      <div className="flex">
        {items.map((item) => (
          <div
            key={item.key}
            onClick={() => handleTabClick(item.key)}
            className={`cursor-pointer p-2 ${
              item.key === activeKey ? "border-b-2 border-blue-500" : ""
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="p-4">
        {items.map((item) =>
          item.key === activeKey ? (
            <div key={item.key}>{item.children}</div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
