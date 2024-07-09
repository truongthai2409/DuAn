import { Tabs } from "antd";
import Shopee from "./Shopee";
import Lazada from "./Lazada";

const RegesterPage = () => {
    const item = [
        {
            label: 'Shopee',
            key: 1,
            children: <Shopee />,
        },
        {
            label: 'Lazada',
            key: 2,
            children: <Lazada />,
        },

    ]
    return (
        <>
            <div className='flex justify-center w-full h-16 text-base text-white bg-gray-400'>
                <p className="my-auto">Auto Ecommerces Extension</p>
            </div>
            <div className="p-4">
                {/* <p>Choose the e-commerce platform you want!</p> */}
                <div><Tabs items={item} /></div>
            </div>
        </>
    );
};

export default RegesterPage;