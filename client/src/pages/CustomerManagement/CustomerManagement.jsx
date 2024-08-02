import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../../component/Header/Header";
import { Table, Button, Select, Row, Col, message, Modal, Form, Input } from "antd";
import './CustomerManagement.css';
const baseURL = import.meta.env.VITE_API

const CustomerManagement = () => {
    const [dataTable, setDataTable] = useState([]);
    const [filter, setFilter] = useState({
        id: "",
        name: "",
        code: "",
        phone: "",
        address: ""
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${baseURL}/customers`);
            setDataTable(response.data);
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseURL}/customers/${id}`);
            message.success('Customer deleted successfully');
            fetchCustomers(); // Refresh the customer list
        } catch (error) {
            console.error("There was an error deleting the customer!", error);
            message.error('Failed to delete customer');
        }
    };

    const showAddCustomerModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleAddCustomer = async (values) => {
        try {
            await axios.post(`${baseURL}/customers/addCustomer`, values);
            message.success('Customer added successfully');
            setIsModalVisible(false);
            form.resetFields();
            fetchCustomers(); 
        } catch (error) {
            console.error("There was an error adding the customer!", error);
            message.error('Failed to add customer');
        }
    };

    const isEditing = (record) => record._id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            phone: '',
            address: '',
            ...record,
        });
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            await axios.patch(`${baseURL}/customers/${id}`, row);
            message.success('Customer updated successfully');
            setEditingKey('');
            fetchCustomers(); // Refresh the customer list
        } catch (error) {
            console.error("There was an error updating the customer!", error);
            message.error('Failed to update customer');
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            width: "auto",
            align: "center",
            editable: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "auto",
            align: "center",
            editable: true,
        },
        {
            title: "Code",
            dataIndex: "code",
            width: "auto",
            align: "center"
        },
        {
            title: "Phone",
            dataIndex: "phone",
            width: "auto",
            align: "center",
            editable: true,
        },
        {
            title: "Address",
            dataIndex: "address",
            width: "auto",
            align: "center",
            editable: true,
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "auto",
            align: "center",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button
                            onClick={() => save(record._id)}
                            type="primary"
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </span>
                ) : (
                    <div>
                        <Button type="primary" onClick={() => edit(record)}>Edit</Button>
                        <Button
                            type="primary"
                            danger
                            style={{ marginLeft: 5 }}
                            onClick={() => handleDelete(record._id)}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const optionsCustomerID = dataTable.map((item) => ({
        value: item._id,
        label: item._id,
    }));

    const optionsCustomerName = dataTable.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    const optionsCustomerCode = dataTable.map((item) => ({
        value: item.code,
        label: item.code,
    }));

    const optionsCustomerPhone = dataTable.map((item) => ({
        value: item.phone,
        label: item.phone,
    }));

    const optionsCustomerAddress = dataTable.map((item) => ({
        value: item.address,
        label: item.address,
    }));

    const handleChangeFilterCustomerName = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            name: value,
        }));
    };

    const handleChangeFilterCustomerCode = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            code: value,
        }));
    };

    const handleChangeFilterCustomerPhone = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            phone: value,
        }));
    };

    const handleChangeFilterCustomerAddress = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            address: value,
        }));
    };

    const handleSearch = () => {
        // Lọc theo tất cả các trường có giá trị
        const filteredData = dataTable.filter((item) => {
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
            code: "",
            phone: "",
            address: ""
        });
        fetchCustomers();
    };

    return (
        <div className="pm-content">
            <Header title='listOfCustomersTL' />
            <div className="pm-filter">
                <Row>
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
                            placeholder={"Enter Customer's Name"}
                            options={optionsCustomerName}
                            onChange={handleChangeFilterCustomerName}
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
                            placeholder={"Enter Customer's Code"}
                            options={optionsCustomerCode}
                            onChange={handleChangeFilterCustomerCode}
                            value={filter.code || null}
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
                            placeholder={"Enter Customer's Phone"}
                            options={optionsCustomerPhone}
                            onChange={handleChangeFilterCustomerPhone}
                            value={filter.phone || null}
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
                            placeholder={"Enter Customer's Address"}
                            options={optionsCustomerAddress}
                            onChange={handleChangeFilterCustomerAddress}
                            value={filter.address || null}
                        />
                    </Col>
                    <Col span={5} className="mt-3">
                        <Button style={{ backgroundColor: '#26a69a', color: '#fff' }} onClick={handleSearch}>Filter</Button>
                        <Button style={{ marginLeft: 10 }} onClick={handleCleanFilterButton} type="primary" danger>Clear</Button>
                    </Col>
                </Row>
            </div>
            <div className="pm-table">
                <Button type="primary" style={{ marginBottom: 16 }} onClick={showAddCustomerModal}>
                    Add Customer
                </Button>
                <Form form={form} component={false}>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                        }}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        columns={mergedColumns}
                        dataSource={dataTable}
                        scroll={{ x: "100vw" }}
                        style={{ maxWidth: "100%", minHeight: "100%" }}
                        pagination={{
                            pageSize: 6,
                            style: { marginRight: '120px', marginTop: "28px" }
                        }}
                    />
                </Form>
            </div>
            <Modal
                title="Add Customer"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddCustomer}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter the name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please enter the email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        label="Code"
                        rules={[{ required: true, message: 'Please enter the code' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter the phone' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter the address' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CustomerManagement;
