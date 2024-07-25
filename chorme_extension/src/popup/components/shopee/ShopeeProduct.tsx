import React, { useEffect, useState } from "react";

const ShopeeProduct = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.local.get(["srcList"], (result) => {
      if (result.srcList) {
        setImages(result.srcList);
      }
    });
  }, [images]);

  const handleScrape = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "scrapeImages" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              // Handle the error, maybe the content script isn't ready
              alert(
                "There was an error communicating with the page. Please refresh the page and try again."
              );
            } else {
              // Handle successful response
              console.log("Images scraped successfully");
            }
          }
        );
      } else {
        console.error("No active tab found");
      }
    });
  };
  return (
    <>
      <form className="max-w-sm">
        <div className="flex items-center">
          <label
            htmlFor="id_store"
            className="block w-[170px] align-center mb-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            Shop Name:
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
            Code:
          </label>
          <input
            type="text"
            id="product_name"
            className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="product_name"
            className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            Cookies:
          </label>
          <input
            type="text"
            id="product_name"
            className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="product_name"
            className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            Phone Number:
          </label>
          <input
            type="text"
            id="product_name"
            className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="product_name"
            className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            Email:
          </label>
          <input
            type="text"
            id="product_name"
            className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="product_name"
            className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            Shop Id:
          </label>
          <input
            type="text"
            id="product_name"
            className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="mt-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
        >
          Synchronized Product
        </button>
      </form>
      <button
        onClick={handleScrape}
        className="mt-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
      >
        Scrape Images
      </button>
      <ul>
        {images.map((src, index) => (
          <li key={index}>
            <img
              src={src}
              alt={`Scraped image ${index}`}
              style={{ width: "100px" }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShopeeProduct;
