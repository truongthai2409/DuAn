import React, { useEffect, useState } from "react";

const ShopeeShop: React.FC = () => {
  const [dataList, setDataList] = useState<{ key: string; value: any }[]>([]);

  useEffect(() => {
    const messageListener = (message: any, sender: any, sendResponse: any) => {
      console.log("Message received in component:", message);
      if (message.action === "updatePopup") {
        console.log(message.data);
        const { key, value } = message.data;
        setDataList((prevList) => [...prevList, { key, value }]);
      } else {
        console.log("no data 123333333333");
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const handleFetchData = () => {
    console.log("code in shopee component");
    // console.log(dataList); 
    // Nghe tin nhắn từ background script
    chrome.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      if (message.action === "updatePopup") {
        console.log("Dữ liệu nhận được từ background script:", message.data);

        // Hiển thị dữ liệu lên UI
        let container = document.getElementById("dataContainer");
        let dataElement = document.createElement("div");
        dataElement.textContent = `Key: ${
          message.data.key
        }, Value: ${JSON.stringify(message.data.value)}`;
        container.appendChild(dataElement);

        // Gửi phản hồi nếu cần thiết
        sendResponse({ status: "Đã nhận dữ liệu" });
      }
    });
  };

  return (
    <form className="max-w-sm">
      <div className="flex items-center">
        <label
          htmlFor="id_store"
          className="block w-[170px] align-center mb-2 text-xs font-medium text-gray-700 dark:text-white"
        >
          ID Store:
        </label>
        <input
          type="text"
          id="id_store"
          className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
        />
      </div>
      <div className="flex items-center">
        <label
          htmlFor="product_name"
          className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
        >
          Product Name:
        </label>
        <input
          type="text"
          id="product_name"
          className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
        />
      </div>
      <div className="relative">
        <label
          htmlFor="product_detail"
          className="w-[170px] block mt-3 mb-2 text-xs font-medium text-gray-700 dark:text-white"
        >
          Product Detail:
        </label>
        <textarea
          id="product_detail"
          rows={4}
          className="block p-2.5 w-full text-xs text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500"
          placeholder="Leave a comment..."
        ></textarea>
      </div>
      <button
        type="button"
        id="fetchData"
        onClick={handleFetchData}
        className="mt-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
      >
        Fetch Data from Storage
      </button>

      <div>
        {dataList.map((item, index) => (
          <div key={index}>
            <p>{item.key}</p>: {item.value}
          </div>
        ))}
      </div>
      <div id="dataContainer"></div>
    </form>
  );
};

export default ShopeeShop;
