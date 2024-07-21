import Header from "../../component/Header/Header"
import { Table, Button, Select, Row, Col } from "antd"
import dataProductManagement from '../../data/ProductManagement.json'
import { useState, useEffect } from "react";
import './ProductManagement.css'
import axios from 'axios';

const columns = [
    {
        title: "Image",
        dataIndex: "image",
        width: "auto",
        align: "center",
        render: (text) => <img style={{ margin: 'auto' }} width={60} height={60} src={text} alt="image" />
    },
    {
        title: "Name",
        dataIndex: "name",
        width: "auto",
        align: "center"
    },
    {
        title: "Price",
        dataIndex: "price",
        width: "auto",
        align: "center"
    },
    {
        title: "Product Description",
        dataIndex: "productDescription",
        width: "auto",
        align: "center"
    },
    {
        title: "Inventory",
        dataIndex: "inventory",
        width: "auto",
        align: "center"
    },
    {
        title: "Button",
        dataIndex: "button",
        width: "auto",
        align: "center",
        render: () => (
            <div>
                <Button style={{marginRight: 5}}>View</Button>
                <Button type="primary">Edit</Button>
                <Button type="primary" danger style={{marginLeft: 5}}>Delete</Button>
            </div>
        ),
    },
];

const ProductManagement = () => {
    const [dataTable, setDataTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        id: "",
        name: "",
        price: "",
        productDescription: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product/all-product');
                setDataTable(response.data);
                setLoading(false);
                console.log(response);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const optionsProductID = dataProductManagement.map((item) => ({
        value: item.id,
        label: item.id,
    }));

    const optionsProductName = dataProductManagement.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    const optionsProductPrice = dataProductManagement.map((item) => ({
        value: item.price,
        label: item.price,
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

    const handleChangeFilterProductPrice = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            price: value,
        }));
    };

    const handleSearch = () => {
        // Lọc theo tất cả các trường có giá trị
        const filteredData = dataProductManagement.filter((item) => {
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
            price: "",
            productDescription: ""
        });
        setDataTable(dataProductManagement);
    };


    return (
        <div className="pm-content">
            <Header title='List of Products' />
            <div className="pm-filter">
                <Row>
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
                            placeholder={"Enter Product's ID"}
                            options={optionsProductID}
                            onChange={handleChangeFilterProductID}
                            value={filter.id || null}
                        />
                    </Col>
                    <Col span={8}>
                        <Select
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
                            placeholder={"Enter Product's Price"}
                            options={optionsProductPrice}
                            onChange={handleChangeFilterProductPrice}
                            value={filter.price || null}
                        />
                    </Col>
                    <Col span={5} offset={2}>
                        <Button style={{ backgroundColor: '#26a69a', color: '#fff' }} onClick={handleSearch}>Filter</Button>
                        <Button style={{ marginLeft: 10 }} onClick={handleCleanFilterButton} type="primary" danger>Clear</Button>
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

export default ProductManagement