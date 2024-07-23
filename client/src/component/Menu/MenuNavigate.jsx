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
import { useTranslation } from "react-i18next";

const MenuNavigate = ({ buttonClick }) => {
    const { t } = useTranslation('main');
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
            label: t('homeTL'),
            icon: <HomeOutlined />,
        },
        {
            key: 'productManagement',
            label: t('productManagementTL'),
            icon: <ProductOutlined />,
            children: [
                {
                    key: 'listOfProducts',
                    label: t('listOfProductsTL'),
                },
                {
                    key: 'inventory',
                    label: t('inventoryTL'),
                },
            ],
        },
        {
            key: 'orderManagement',
            label: t('orderManagementTL'),
            icon: <ContainerOutlined />,
            children: [
                {
                    key: 'listOfOrders',
                    label: t('listOfOrdersTL'),
                },
            ],
        },
        {
            key: 'customerManagement',
            label: t('customerManagementTL'),
            icon: <UserOutlined />,
            children: [
                {
                    key: 'listOfCustomers',
                    label: t('listOfCustomerTL'),
                },
                {
                    key: 'customerCare',
                    label: t('customerCareTL'),
                }
            ],
        },
        {
            key: 'reportingAndAnalysis',
            label: t('reportingAndAnalysisTL'),
            icon: <FileDoneOutlined />,
            children: [
                {
                    key: 'salesReport',
                    label: t('salesReportTL'),
                },
                {
                    key: 'performanceAnalysis',
                    label: t('performanceAnalysisTL'),
                }
            ],
        },
        {
            key: 'inventoryManagement',
            label: t('inventoryManagementTL'),
            icon: <DropboxOutlined />,
            children: [
                {
                    key: 'export-import-warehouse',
                    label: t('exportImportWarehouseTL'),
                },
                {
                    key: 'warehouseInventory',
                    label: t('warehouseInventoryTL'),
                }
            ],
        },
        {
            key: 'shippingIntegration',
            label: t('shippingIntegrationTL'),
            icon: <TruckOutlined />,
        },
        {
            key: 'notification',
            label: t('notificationTL'),
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