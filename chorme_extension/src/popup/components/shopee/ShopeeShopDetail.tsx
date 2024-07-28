import React, { useEffect, useState } from "react";
// newData = {
//   user_id: data.user_id,
//   image: data.image,
//   name: data.name
// }

const ShopeeShopDetail = () => {
  const [userId, setUserId] = useState("");
  const [shopId, setShopId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const handleProfile = () => {
    chrome.storage.local.get(null, (items) => {
      console.log("All items in local storage:", items);
      console.log({
        item: items.id,
        name: items.name,
        src: items.image,
      });
      setUserId(items.user_id);
      setImage(items.image);
      setName(items.name);
      setShopId(items.id);
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
            value={name}
            disabled
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
            User ID:
          </label>
          <input
            value={userId}
            disabled
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
            value={shopId}
            disabled
            type="text"
            id="product_name"
            className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        {/* <div className="flex items-center">
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
        </div> */}
        <div className="flex items-center">
          <label
            className="w-[170px] align-center block my-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            Avatar:
          </label>
          
          <div className="block w-full mb-2 text-xs rounded-lg">
            {" "}
            {image ? (
              <img
                className="w-[150px] h-[150px] rounded-lg"
                src={image}
                alt=""
              />
            ) : (
              ""
            )}
          </div>
        </div>
        
      </form>
      <button
        className="mt-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
        onClick={handleProfile}
      >
        Synchronized Product
      </button>
    </>
  );
};

export default ShopeeShopDetail;
