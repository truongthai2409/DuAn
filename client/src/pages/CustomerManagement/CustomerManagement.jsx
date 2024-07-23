import Header from "../../component/Header/Header"
import { Table, Button, Select, Row, Col } from "antd"
import dataCustomerManagement from '../../data/CustomerManagement.json'
import { useState } from "react";
import './CustomerManagement.css'

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        width: "auto",
        align: "center",
    },
    {
        title: "Name",
        dataIndex: "name",
        width: "auto",
        align: "center"
    },
    {
        title: "Type",
        dataIndex: "type",
        width: "auto",
        align: "center"
    },
    {
        title: "Level",
        dataIndex: "level",
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

const CustomerManagement = () => {
    const [dataTable, setDataTable] = useState(dataCustomerManagement);
    const [filter, setFilter] = useState({
        id: "",
        name: "",
        price: "",
        productDescription: ""
    });

    const optionsProductID = dataCustomerManagement.map((item) => ({
        value: item.id,
        label: item.id,
    }));

    const optionsProductName = dataCustomerManagement.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    const optionsProductPrice = dataCustomerManagement.map((item) => ({
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
        const filteredData = dataCustomerManagement.filter((item) => {
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
        });
        setDataTable(dataCustomerManagement);
    };


    return (
        <div className="pm-content">
            <Header title='listOfCustomersTL' />
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

export default CustomerManagement