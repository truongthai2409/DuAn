import Header from "../../component/Header/Header"
import { Table, Button, Select, Row, Col, Input, Divider } from "antd"
import { useState, useEffect, useRef } from "react";
import './OrderManagement.css'
import { useTranslation } from "react-i18next";
import axios from 'axios';
import imgLogo from '../../assets/images/logo.png'
import { useReactToPrint } from 'react-to-print'

const OrderManagement = () => {
    const [dataTable, setDataTable] = useState([]);
    const [initdataTable, setInitDataTable] = useState([]);
    const [filter, setFilter] = useState({
        order_id_lazada: "",
        name_order: "",
        name_customer: "",
        status: "",
        shipping_unit: ""
    });
    const [restartTable, setRestartTable] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation('function');
    const [dataProfile, setDataProfile] = useState({})
    const [dataPrint, setDataPrint] = useState({})
    const [countRowSelected, setCountRowSelected] = useState(0)

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/profile');
                setDataProfile(response.data.data[0]);
            } catch (error) {
                setError(error);
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

    const removeVietnameseTones = (str) => {
        str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Loại bỏ dấu
        str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D'); // Chuyển đổi chữ đ
        return str;
    };

    const handleSearch = () => {
        // Lọc theo tất cả các trường có giá trị
        const filteredData = initdataTable.filter((item) => {
            let isValid = true;    
            for (const key in filter) {
                // if (filter[key] && !item[key].includes(filter[key])) {
                //     isValid = false;
                //     break;
                // }
                if (filter[key]) {
                    const filterValue = removeVietnameseTones(filter[key].toLowerCase());
                    const itemValue = removeVietnameseTones(item[key].toLowerCase());
                    if (!itemValue.includes(filterValue)) {
                        isValid = false;
                        break;
                    }
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

    const optionsStatus = [
        {value: 'pending', label: 'pending'},
        {value: 'canceled', label: 'canceled'},
        {value: 'ready_to_ship', label: 'ready_to_ship'},
        {value: 'delivered', label: 'delivered'},
        {value: 'returned', label: 'returned'},
        {value: 'shipped', label: 'shipped'},
        {value: 'failed', label: 'failed'}
    ]

    const handleChangeStatus = () => {
        
    }

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
            align: "center",
            render: (text) => {
                return <Select
                    onChange={handleChangeStatus}
                    defaultValue={text}
                    options={optionsStatus}
                />
            }
        },
        {
            title: t('shippingUnit'),
            dataIndex: "shipping_unit",
            width: "auto",
            align: "center"
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            // setIdProduct(selectedRowKeys)
            setCountRowSelected(selectedRows.length)
            // setAllProductsSelected(selectedRows);
            setDataPrint(selectedRows[0])
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };


    // handle print order
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
                <Row style={{ paddingTop: 10 }}>
                    <Button type="primary" onClick={handlePrint}  disabled={countRowSelected != 1}>Print Order</Button>
                    {/* <Button type="primary" style={{ backgroundColor: countRowSelected == 1 ? '#4CAF50' : '', marginLeft: 10 }} disabled={countRowSelected != 1} onClick={onOpenModalUpdate}>Update Product</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} disabled={countRowSelected == 0} danger onClick={handleDeleteButton}>Detele Product</Button> */}
                </Row>
            </div>
            <div className="pm-table">
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
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
            
            <div hidden>
                <div ref={componentRef}>
                    <Row style={{margin: "0 10px"}}>
                        <Col span={8}>
                            <img src={imgLogo} />
                        </Col>
                        <Col span={8} style={{textAlign: "center"}}>
                            <h1 style={{fontSize: 20}}>HÓA ĐƠN BÁN HÀNG</h1>
                            <p>{new Date(Date.now()).toDateString()}</p>
                        </Col>
                        <Col span={8}>
                            Số hóa đơn: {dataPrint?.order_id_lazada}
                        </Col>
                    </Row>
                    <Divider />
                    <div style={{margin: "0 10px"}}>
                        <h1 style={{fontSize: 20}}>{dataProfile.name_store}</h1>
                        <p>Địa chỉ: {dataProfile.address}</p>
                        <p>Số điện thoại: {dataProfile.phone_number}</p>
                    </div>
                    <Divider />
                    <div style={{margin: "0 10px"}}>
                        <p>Họ tên người mua hàng: {dataPrint?.name_customer || ""}</p>
                        <p>Địa chỉ: </p>
                    </div>
                    <Divider />
                    <div style={{margin: "0 10px"}}>
                        <p>Sản phẩm</p>
                        <p>Tên sản phẩm: {dataPrint?.name_order || ""}</p>
                        <p>Số lượng: {dataPrint?.quantity || ""}</p>
                        <p>Giá: {dataPrint?.price || ""} đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderManagement