import React, { useEffect, useState } from "react";
import { postData } from "../../config/services/apiService";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const ShopeeProduct: React.FC = () => {
  const { t } = useTranslation(["main"]);
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productDetails, setProductDetail] = useState<string>("");
  const [inventory, setInventory] = useState<number>(null);

  const handleScrape = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "scrapeProducts" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              alert(t("main:Messages.Error Connecting"));
            } else {
              console.log("Products scraped successfully");
              chrome.storage.local.get(["products"], (result) => {
                if (result.products) {
                  setImages(result.products.image);
                  setProductName(result.products.productName);
                  setPrice(result.products.price);
                  setProductDetail(result.products.productDetails);
                  setInventory(result.products.inventory);
                }
              });
            }
          }
        );
      } else {
        console.error("No active tab found");
      }
    });
  };

  const handlePostProduct = async () => {
    const formData = {
      name: productName,
      price,
      productDescription: productDetails,
      image: images[1],
      inventory
    };
    try {
      const response = await postData(formData,'/product/add-product-extension');
      console.log(response)
      toast.success(t('main:Messages.Upload Success'));
    } catch (error) {
      toast.error(t('main:Messages.Upload Error'));
    }
  };


  return (
    <div>
      <form className="max-w-sm">
        <div className="flex items-center">
          <label
            htmlFor="id_store"
            className="block w-[170px] align-center mb-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            {t('main:Shop.Inventory')}
          </label>
          <input
            required
            type="number"
            id="id_store"
            value={inventory}
            onChange={(e) => setInventory(parseInt(e.target.value))}
            className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="product_name"
            className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            {t("main:Shop.Product Name")}:
          </label>
          <input
            required
            type="text"
            id="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="price"
            className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            {t("main:Shop.Price")}:
          </label>
          <input
            required
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="product_detail"
            className="w-[170px] block mt-3 mb-2 text-xs font-medium text-gray-700 dark:text-white"
          >
            {t("main:Shop.Product Detail")}:
          </label>
          <textarea
            required
            id="product_detail"
            rows={4}
            value={productDetails}
            onChange={(e) => setProductDetail(e.target.value)}
            className="block p-2.5 w-full text-xs text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500"
            placeholder={t("main:Shop.Leave a comment")}
          ></textarea>
        </div>
        <div className="flex mt-5">
          {images.map((img, index) => (
            <img
              className="w-[90px] h-[90px] m-1"
              key={index}
              src={img}
              alt=""
            />
          ))}
        </div>

        <button
          type="button"
          id="fetchData"
          onClick={handleScrape}
          className="mt-3 mr-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
        >
          {t("main:Shop.Get Product Detail")}
        </button>
        <button
          type="button"
          id="fetchData"
          onClick={handlePostProduct}
          className="mt-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
        >
          {t("main:Shop.Synchronized Product")}
        </button>
      </form>
    </div>
  );
};

export default ShopeeProduct;
