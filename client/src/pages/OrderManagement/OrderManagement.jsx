import Header from "../../component/Header/Header"
import { Table, Button, Select, Row, Col, Input } from "antd"
import { useState, useEffect } from "react";
import './OrderManagement.css'
import { useTranslation } from "react-i18next";
import axios from 'axios';

const OrderManagement = () => {
    const [dataTable, setDataTable] = useState([]);
    const [initdataTable, setInitDataTable] = useState([]);
    const [filter, setFilter] = useState({
        order_id_lazada: "",
        name_order: "",
        customer: "",
        status: "",
        shipping_unit: ""
    });
    const [restartTable, setRestartTable] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation('function');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/order/all-orders');
                const dataWithKey = response.data.map((item) => ({
                    ...item,
                    key: item._id, // Hoặc dùng item.id nếu có id từ API
                }));
                setDataTable(dataWithKey);
                setInitDataTable(dataWithKey)
                setLoading(false);
                console.log(response);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const optionsProductID = dataTable.map((item) => ({
        value: item.id,
        label: item.id,
    }));

    const optionsProductName = dataTable.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    const optionsProductCustomer = dataTable.map((item) => ({
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
            name_order: value,
        }));
    };

    const handleChangeFilterProductCustomer = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            name_customer: value,
        }));
    };

    const handleSearch = () => {
        // Lọc theo tất cả các trường có giá trị
        const filteredData = initdataTable.filter((item) => {
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
        console.log(filteredData);
        
        setDataTable(filteredData);
    };

    const handleCleanFilterButton = () => {
        setFilter({
            order_id_lazada: "",
            name_order: "",
            name_customer: "",
            status: "",
            shipping_unit: ""
        });
        setDataTable(initdataTable);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "order_id_lazada",
            width: "auto",
            align: "center",
        },
        {
            title: t('customerTL'),
            dataIndex: "name_customer",
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
            dataIndex: "name_order",
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
            dataIndex: "shipping_unit",
            width: "auto",
            align: "center"
        },
    ];

    return (
        <div className="pm-content">
            <Header title='listOfOrdersTL' />
            <div className="pm-filter">
                <Row>
                    <Col span={4}>
                        <Input
                            style={{
                                height: "32px",
                                width: "95%",

                                fontSize: "15px",
                            }}
                            defaultValue=""
                            placeholder={"Enter Order's ID"}
                            onChange={e => handleChangeFilterProductID(e.target.value)}
                            value={filter.id || null}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            style={{
                                height: "32px",
                                width: "95%",

                                fontSize: "15px",
                            }}
                            defaultValue=""
                            placeholder={"Enter Product's Name"}
                            onChange={e => handleChangeFilterProductName(e.target.value)}
                            value={filter.name_order || null}
                        />
                    </Col>
                    <Col span={4}>
                        <Input
                            style={{
                                height: "32px",
                                width: "95%",

                                fontSize: "15px",
                            }}
                            defaultValue=""
                            placeholder={"Enter Product's Customer"}
                            onChange={e => handleChangeFilterProductCustomer(e.target.value)}
                            value={filter.name_customer || null}
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