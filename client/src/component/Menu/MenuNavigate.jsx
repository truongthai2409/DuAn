import React from "react";
import "./MenuNavigate.css";
import Icon, {
    LeftOutlined,
    RightOutlined,
    HomeOutlined,
    ProductOutlined,
    DropboxOutlined,
    UserOutlined,
    FileDoneOutlined,
    ContainerOutlined,
    TruckOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import logo from "../../assets/images/logo.png";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import useViewport from "../../hooks/useViewport";

const MenuNavigate = ({ buttonClick }) => {
    // When width of page <= 1024 it will return true for isMobile variable
    const viewPort = useViewport()
    const isMobile = viewPort.width <= 1024
    const navigate = useNavigate()


    const onClick = (value) => {
        navigate('/' + value.key)
    }

    const [collapsed, setCollapsed] = useState(false);

    // Function run when the menu collapsed
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        buttonClick()
    };

    const items = [
        {
            key: 'home',
            label: 'Home',
            icon: <HomeOutlined />,
        },
        {
            key: 'productManagement',
            label: 'Product Management',
            icon: <ProductOutlined />,
            children: [
                {
                    key: 'listOfProducts',
                    label: 'List of Products',
                },
                {
                    key: 'inventory',
                    label: 'Inventory',
                },
            ],
        },
        {
            key: 'orderManagement',
            label: 'Order Management',
            icon: <ContainerOutlined />,
            children: [
                {
                    key: 'listOfOrders',
                    label: 'List of Orders',
                },
            ],
        },
        {
            key: 'customerManagement',
            label: 'Customer Management',
            icon: <UserOutlined />,
            children: [
                {
                    key: 'listOfCustomers',
                    label: 'List of Customers',
                },
                {
                    key: 'customerCare',
                    label: 'Customer Care'
                }
            ],
        },
        {
            key: 'reportingAndAnalysis',
            label: 'Reporting and Analysis',
            icon: <FileDoneOutlined />,
            children: [
                {
                    key: 'salesReport',
                    label: 'Sales Report',
                },
                {
                    key: 'performanceAnalysis',
                    label: 'Performance Analysis'
                }
            ],
        },
        {
            key: 'inventoryManagement',
            label: 'Inventory Management',
            icon: <DropboxOutlined />,
            children: [
                {
                    key: 'export-import-warehouse',
                    label: 'Export/Import Warehouse',
                },
                {
                    key: 'warehouseInventory',
                    label: 'Warehouse Inventory'
                }
            ],
        },
        {
            key: 'shippingIntegration',
            label: 'Shipping Integration',
            icon: <TruckOutlined />,
        },
        {
            key: 'notification',
            label: 'Notification',
            icon: <NotificationOutlined />,
        },
    ];

    return (
        <div className="menu">
            {/* If the page is mobile, the collapsed button will not appear and will automatically collapse */}
            {!isMobile ? (<div>
                <img src={logo} alt="Logo" className="logo-menu" hidden={collapsed} />
                <Menu
                    onClick={onClick}
                    style={{
                        width: '100%',
                    }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                    inlineCollapsed={collapsed}
                />
                <div onClick={toggleCollapsed} className="button-collapsed">
                    {collapsed ? <RightOutlined /> : <LeftOutlined />}
                </div>
            </div>) : (<div>
                <Menu
                    onClick={onClick}
                    style={{
                        width: '100%',
                    }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                    inlineCollapsed={true}
                />
            </div>)}

        </div>
    );
};

export default MenuNavigate;