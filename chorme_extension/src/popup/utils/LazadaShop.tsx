import React from 'react';

const LazadaShop = () => {
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
                <button type="submit" className="mt-3 text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center">Synchronized Product</button>
            </form>
    );
};

export default LazadaShop;