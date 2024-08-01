import React, { useEffect, useState } from "react";
import { postData } from "../config/services/apiService";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { toast } from "sonner";

const Customer: React.FC = () => {
  const { t } = useTranslation(["main"]);

  const [name, setName] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [code, setCode] = useState<string>(null);
  const [phone, setPhone] = useState<number>(null);
  const [address, setAddress] = useState(null);

  const handleScrape = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "getLazadaProfile" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              alert(t("main:Messages.Error Connecting"));
            } else {
              console.log("Products scraped successfully");
              chrome.storage.local.get(["products"], (result) => {
                if (result.products) {
                  setAddress(result.products.address);
                  setName(result.products.name);
                  setEmail(result.products.email);
                  setCode(result.products.code);
                  setPhone(result.products.phone);
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
      address,
      name,
      email,
      code,
      phone,
    };
    console.log(formData);
    try {
      const response = await postData(formData, '/customers/addCustomer');
      console.log(response);
      toast.success(t('main:Messages.Upload Success'));
    } catch (error) {
      toast.error(t('main:Messages.Upload Error'));
    }
  };

  return (
    <>
      <Header />
      <div className="m-4 bg-white">
        <form className="max-w-sm">
          <div className="flex items-center">
            <label
              htmlFor="id_store"
              className="block w-[170px] align-center mb-2 text-xs font-medium text-gray-700 dark:text-white"
            >
              {t('main:Shop.Customer')}
            </label>
            <input
              required
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="product_name"
              className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
            >
              {t("main:Shop.Address")}:
            </label>
            <input
              required
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="price"
              className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
            >
              Email:
            </label>
            <input
              required
              type="email"
              id="eamail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="product_name"
              className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
            >
              {t("main:Shop.Code")}:
            </label>
            <input
              required
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="product_name"
              className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white"
            >
              {t("main:Shop.Phone")}:
            </label>
            <input
              required
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(parseInt(e.target.value))}
              className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <button
            type="button"
            id="fetchData"
            onClick={handleScrape}
            className="mt-3 mr-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
          >
            {t("main:Shop.Get Customer Detail")}
          </button>
          <button
            type="button"
            id="fetchData"
            onClick={handlePostProduct}
            className="mt-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
          >
            {t("main:Shop.Synchronized Customer")}
          </button>
        </form>
      </div>
    </>
  );
};

export default Customer;
