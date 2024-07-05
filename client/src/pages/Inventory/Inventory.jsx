import Header from "../../component/Header/Header"
import { Table, Button, Select, Row, Col } from "antd"
import dataProductManagement from '../../data/ProductManagement.json'
import { useState } from "react";
import './Inventory.css'

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
                <Button style={{ marginRight: 5 }}>View</Button>
                <Button type="primary">Edit</Button>
                <Button type="primary" danger style={{ marginLeft: 5 }}>Delete</Button>
            </div>
        ),
    },
];

const Inventory = () => {
    const [dataTable, setDataTable] = useState(dataProductManagement);
    const [filter, setFilter] = useState({
        id: "",
        name: "",
        inventory: ""
    });

    const optionsProductID = dataProductManagement.map((item) => ({
        value: item.id,
        label: item.id,
    }));

    const optionsProductName = dataProductManagement.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    // const optionsProductInventory = dataProductManagement.map((item) => ({
    //     value: item.inventory,
    //     label: item.inventory > 0 ? 'Còn hàng' : 'Hết hàng',
    // }));
    const optionsProductInventory = [
        {
            value: 'conHang',
            label: 'Còn hàng'
        },
        {
            value: 'hetHang',
            label: 'Hết hàng'
        }
    ]

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

    const handleChangeFilterProductInventory = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            inventory: value,
        }));
    };

    // const handleSearch = () => {
    //     // Lọc theo tất cả các trường có giá trị
    //     const filteredData = dataProductManagement.filter((item) => {
    //         let isValid = true;
    //         for (const key in filter) {
    //             if (filter[key] && !item[key].includes(filter[key])) {
    //                 isValid = false;
    //                 break;
    //             }
    //         }
    //         return isValid;
    //     });
    //     // Cập nhật state của bảng với kết quả tìm kiếm
    //     setDataTable(filteredData);
    // };

    const handleSearch = () => {
        // Filter based on all fields with values
        const filteredData = dataProductManagement.filter((item) => {
            let isValid = true;
            for (const key in filter) {
                if (filter[key]) {
                    if (key === 'inventory') {
                        // Check for inventory quantity
                        const inventoryValue = parseInt(item[key]); // Convert inventory to number
                        isValid = inventoryValue > 0 ? filter[key] === 'conHang' : filter[key] === 'hetHang';
                    } else if (!item[key].includes(filter[key])) {
                        isValid = false;
                        break;
                    }
                }
            }
            return isValid;
        });

        // Update table state with search results
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
        <div>
            <Header title='Inventory' />
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
                            placeholder={"Enter Product's Inventory"}
                            options={optionsProductInventory}
                            onChange={handleChangeFilterProductInventory}
                            value={filter.inventory || null}
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
                    scroll={{ x: "auto" }}
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

export default Inventory