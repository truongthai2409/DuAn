import Header from "../../component/Header/Header"
import { Table, Button, Select, Row, Col, Input } from "antd"
import dataOrderManagement from '../../data/OrderManagement.json'
import { useState } from "react";
import './OrderManagement.css'
import { useTranslation } from "react-i18next";


const OrderManagement = () => {
    const [dataTable, setDataTable] = useState(dataOrderManagement);
    const [filter, setFilter] = useState({
        id: "",
        name: "",
        customer: "",
        status: "",
        shippingUnit: ""
    });
    const { t } = useTranslation('function');

    const optionsProductID = dataOrderManagement.map((item) => ({
        value: item.id,
        label: item.id,
    }));

    const optionsProductName = dataOrderManagement.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    const optionsProductCustomer = dataOrderManagement.map((item) => ({
        value: item.customer,
        label: item.customer,
    }));

    const handleChangeFilterProductID = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            id: value,
        }));
    };

    const handleChangeFilterProductName = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            name: value,
        }));
    };

    const handleChangeFilterProductCustomer = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            customer: value,
        }));
    };

    const handleSearch = () => {
        // Lọc theo tất cả các trường có giá trị
        const filteredData = dataOrderManagement.filter((item) => {
            let isValid = true;
            for (const key in filter) {
                if (filter[key] && !item[key].includes(filter[key])) {
                    isValid = false;
                    break;
                }
            }
            return isValid;
        });
        // Cập nhật state của bảng với kết quả tìm kiếm
        setDataTable(filteredData);
    };

    const handleCleanFilterButton = () => {
        setFilter({
            id: "",
            name: "",
            customer: "",
            status: "",
            shippingUnit: ""
        });
        setDataTable(dataOrderManagement);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: "auto",
            align: "center",
        },
        {
            title: t('customerTL'),
            dataIndex: "customer",
            width: "auto",
            align: "center"
        },
        {
            title: t('imageTL'),
            dataIndex: "image",
            width: "auto",
            align: "center",
            render: (text) => <img style={{ margin: 'auto' }} width={60} height={60} src={text} alt="image" />
        },
        {
            title: t('nameTL'),
            dataIndex: "name",
            width: "auto",
            align: "center"
        },
        {
            title: t('priceTL'),
            dataIndex: "price",
            width: "auto",
            align: "center"
        },
        {
            title: t('quantityTL'),
            dataIndex: "quantity",
            width: "auto",
            align: "center"
        },
        {
            title: t('statusTL'),
            dataIndex: "status",
            width: "auto",
            align: "center"
        },
        {
            title: t('shippingUnit'),
            dataIndex: "shippingUnit",
            width: "auto",
            align: "center"
        },
        {
            title: t('buttonTL'),
            dataIndex: "button",
            width: "auto",
            align: "center",
            render: () => (
                <div>
                    <Button style={{ marginRight: 5 }}>View</Button>
                    <Button type="primary">Edit</Button>
                    <Button type="primary" danger style={{ marginLeft: 5 }}>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <div className="pm-content">
            <Header title='listOfOrdersTL' />
            <div className="pm-filter">
                <Row>
                    <Col span={4}>
                        {/* <Select
                            style={{
                                height: "32px",
                                width: "95%",

                                fontSize: "15px",
                            }}
                            className="select-placeholder"
                            showSearch
                            defaultValue=""
                            placeholder={"Enter Product's ID"}
                            options={optionsProductID}
                            onChange={handleChangeFilterProductID}
                            value={filter.id || null}
                        /> */}
                        <Input
                            style={{
                                height: "32px",
                                width: "95%",

                                fontSize: "15px",
                            }}
                            defaultValue=""
                            placeholder={"Enter Product's ID"}
                            onChange={e => handleChangeFilterProductID(e.target.value)}
                            value={filter.id || null}
                        />
                    </Col>
                    <Col span={8}>
                        {/* <Select
                            style={{
                                height: "32px",
                                width: "95%",
                                fontSize: "15px",
                            }}
                            className="select-placeholder"
                            showSearch
                            defaultValue=""
                            placeholder={"Enter Product's Name"}
                            options={optionsProductName}
                            onChange={handleChangeFilterProductName}
                            value={filter.name || null}
                        /> */}
                        <Input
                            style={{
                                height: "32px",
                                width: "95%",

                                fontSize: "15px",
                            }}
                            defaultValue=""
                            placeholder={"Enter Product's Name"}
                            onChange={e => handleChangeFilterProductName(e.target.value)}
                            value={filter.name || null}
                        />
                    </Col>
                    <Col span={4}>
                        <Select
                            style={{
                                height: "32px",
                                width: "95%",
                                fontSize: "15px",
                            }}
                            className="select-placeholder"
                            showSearch
                            defaultValue=""
                            placeholder={"Enter Product's Customer"}
                            options={optionsProductCustomer}
                            onChange={handleChangeFilterProductCustomer}
                            value={filter.customer || null}
                        />
                    </Col>
                    <Col span={5} offset={2}>
                        <Button style={{ backgroundColor: '#26a69a', color: '#fff' }} onClick={handleSearch}>{t('filterTL')}</Button>
                        <Button style={{ marginLeft: 10 }} onClick={handleCleanFilterButton} type="primary" danger>{t('clearTL')}</Button>
                    </Col>
                </Row>
            </div>
            <div className="pm-table">
                <Table
                    rowSelection={{
                        type: "checkbox",
                    }}
                    columns={columns}
                    dataSource={dataTable}
                    scroll={{ x: "100vw" }}
                    style={{ maxWidth: "100%", minHeight: "100%" }}
                    pagination={{
                        pageSize: 6,
                        style: { marginRight: '120px', marginTop: "28px" }
                    }}
                />
            </div>
        </div>
    )
}

export default OrderManagement