import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../../component/Header/Header";
import { Table, Button, Select, Row, Col, message, Modal, Form, Input } from "antd";
const baseURL = import.meta.env.VITE_API

const CustomerCare = () => {
    const [dataTable, setDataTable] = useState([]);
    const [filter, setFilter] = useState({
        id: "",
        name: "",
        code: "",
        phone: "",
        address: ""
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    const showEmailModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSendEmail = async (values) => {
        console.log(values)
        try {
            await axios.post(`${baseURL}/user/send-email`, values);
            message.success('Email sent successfully');
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error("There was an error sending the email!", error);
            message.error('Failed to send email');
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            width: "auto",
            align: "center",
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
        },
        {
            title: "Address",
            dataIndex: "address",
            width: "auto",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "auto",
            align: "center",
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "auto",
            align: "center",
            render: (_, record) => (
                <Button type="primary" onClick={() => showEmailModal(record)}>Send Email</Button>
            ),
        },
    ];

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
            <Header title='customerCareTL' />
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
                <Form form={form} component={false}>
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
                </Form>
            </div>
            <Modal
                title="Send Email"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSendEmail}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please enter the email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[{ required: true, message: 'Please enter the subject' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="message"
                        label="Message"
                        rules={[{ required: true, message: 'Please enter the message' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CustomerCare;
