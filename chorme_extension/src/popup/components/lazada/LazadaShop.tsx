import React, { useCallback } from 'react';

const LazadaShop: React.FC = () => {

  const handleFetchData = useCallback(() => {
   
  }, []);

  const handleSaveData = useCallback(() => {
    const dataToSave1 = {
      id: document.getElementById('id_store')?.textContent,
      productName: document.getElementById('product_name')?.textContent,
      productDetail: document.getElementById('product_detail')?.textContent
    };
    let dataToSave = {
        auto_reply_msg : "",
        auto_reply_on : true,
        country : "",
        id : 1,
        image : "",
        image_hash : "",
        is_official_shop : false,
        name : "",
        user_id : 1,
    }

    chrome.storage.local.set({ CHAT_API: dataToSave }, () => {
      console.log('Data saved to storage:', dataToSave);
    });
  }, []);

  return (
    <form className="max-w-sm">
      <div className='flex items-center'>
        <label htmlFor="id_store" className="block w-[170px] align-center mb-2 text-xs font-medium text-gray-700 dark:text-white">ID Store:</label>
        <input type="text" id="id_store" className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500" />
      </div>
      <div className='flex items-center'>
        <label htmlFor="product_name" className="w-[170px] align-center block mb-2 text-xs font-medium text-gray-700 dark:text-white">Product Name:</label>
        <input type="text" id="product_name" className="block w-full p-2 mb-2 text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500" />
      </div>
      <div className='relative'>
        <label htmlFor="product_detail" className="w-[170px] block mt-3 mb-2 text-xs font-medium text-gray-700 dark:text-white">Product Detail:</label>
        <textarea id="product_detail" rows={4} className="block p-2.5 w-full text-xs text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Leave a comment..."></textarea>
      </div>
      <button 
        type="button" 
        id="fetchData"
        onClick={handleFetchData}
        className="mt-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
      >
        Fetch Data from Storage
      </button>
      <button 
        type="button" 
        id="saveData"
        onClick={handleSaveData}
        className="mt-3 ml-2 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
      >
        Save Data to Storage
      </button>
      <pre id="output" className="mt-3 text-xs text-gray-700"></pre>
    </form>
  );
};

export default LazadaShop;
