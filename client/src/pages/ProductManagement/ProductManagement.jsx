import Header from "../../component/Header/Header"
import { Table, Button, Select, Row, Col, Modal, Input, Form, Upload, Avatar } from "antd"
import dataProductManagement from '../../data/ProductManagement.json'
import { useState, useEffect } from "react";
import './ProductManagement.css'
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { UploadOutlined } from '@ant-design/icons';


const ProductManagement = () => {
    const [dataTable, setDataTable] = useState([]);
    const [initdataTable, setInitDataTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        id: "",
        name: "",
        price: "",
        productDescription: ""
    });
    const { t } = useTranslation('function');

    const [preview, setPreview] = useState(null)
    const [initImage, setInitImage] = useState(null)
    const [file, setFile] = useState(null)

    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState();
    const [open, setOpen] = useState(false);

    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [idProduct, setIdProduct] = useState([])
    const [countRowSelected, setCountRowSelected] = useState(0)
    const [productSelected, setProductSelected] = useState({})

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [allProductsSelected, setAllProductsSelected] = useState([]);

    const [restartTable, setRestartTable] = useState(0)

    const showModalDelete = () => {
        setIsModalDeleteOpen(true);
    };
    const handleOkDelete = async () => {
        await axios.delete('http://localhost:5000/product/delete-product', {data: {ids: idProduct}})
        setRestartTable(prev => prev + 1)
        setCountRowSelected(0)
        setIsModalDeleteOpen(false);
    };
    const handleCancelDelete = () => {
        setIsModalDeleteOpen(false);
    };

    const onCreate = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name_product);
        formData.append('price', values.price);
        formData.append('productDescription', values.description);
        formData.append('inventory', values.inventory);
        if (file) {
            formData.append('image', values.image.file);
        }

        await axios.post('http://localhost:5000/product/addProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setRestartTable(prev => prev + 1)
        console.log('Received values of form: ', values);
        setFormValues(values);
        setOpen(false);
    };

    const onOpenModalUpdate = async () => {
        const product = await axios.get('http://localhost:5000/product/get-a-product/' + idProduct[0]);
        console.log(product);
        console.log(idProduct[0]);
        setProductSelected(product.data)
        setOpenModalUpdate(true)
    }

    const onUpdate = async (values) => {
        const formData = new FormData();
        formData.append('_id', idProduct[0])
        formData.append('name', values.name_product || productSelected.name);
        formData.append('price', values.price || productSelected.price);
        formData.append('productDescription', values.description || productSelected.productDescription);
        formData.append('inventory', values.inventory || productSelected.inventory);
        if (file) {
            formData.append('image', values.image.file);
        }

        await axios.put('http://localhost:5000/product/update-product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setCountRowSelected(0)
        setRestartTable(prev => prev + 1)
        console.log('Received values of form: ', values);
        setFormValues(values);
        setOpenModalUpdate(false);
    };

    const handleDeleteButton = () => {
        setIsModalDeleteOpen(true);
        console.log(idProduct);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product/all-product');
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
    }, [restartTable]);

    const optionsProductID = initdataTable.map((item) => ({
        value: item._id,
        label: item._id,
    }));

    const optionsProductName = initdataTable.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    const optionsProductPrice = initdataTable.map((item) => ({
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
        setDataTable(filteredData);
    };

    const handleCleanFilterButton = () => {
        setFilter({
            id: "",
            name: "",
            price: "",
            productDescription: ""
        });
        setDataTable(initdataTable);
    };

    const columns = [
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
            width: "10vw",
            align: "center"
        },
        {
            title: t('priceTL'),
            dataIndex: "price",
            width: "auto",
            align: "center",
            render: (text) => {
                return text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            }
        },
        {
            title: t('productDescriptionTL'),
            dataIndex: "productDescription",
            width: "20vw",
            align: "center",
            render: (text) => {
                return <div dangerouslySetInnerHTML={{ __html: text }} />
            }
        },
        {
            title: t('inventoryTL'),
            dataIndex: "inventory",
            width: "auto",
            align: "center"
        },
        // {
        //     title: t('buttonTL'),
        //     dataIndex: "button",
        //     width: "auto",
        //     align: "center",
        //     render: () => (
        //         <div>
        //             <Button style={{ marginRight: 5 }}>View</Button>
        //             <Button type="primary">Edit</Button>
        //             <Button type="primary" danger style={{ marginLeft: 5 }}>Delete</Button>
        //         </div>
        //     ),
        // },
    ];

    const beforeUpload = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview(reader.result);
            setFile(file)
        };
        return false; // Prevent automatic upload
    };

    const onRemove = () => {
        setPreview(initImage)
        setFile(null)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setIdProduct(selectedRowKeys)
            setCountRowSelected(selectedRows.length)
            setAllProductsSelected(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div className="pm-content">
            <Header title='listOfProductsTL' />
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
                        <Button style={{ backgroundColor: '#26a69a', color: '#fff' }} onClick={handleSearch}>{t('filterTL')}</Button>
                        <Button style={{ marginLeft: 10 }} onClick={handleCleanFilterButton} type="primary" danger>{t('clearTL')}</Button>
                    </Col>
                </Row>
                <Row style={{ paddingTop: 10 }}>
                    <Button type="primary" onClick={() => setOpen(true)}>Add Product</Button>
                    <Button type="primary" style={{ backgroundColor: countRowSelected == 1 ? '#4CAF50' : '', marginLeft: 10 }} disabled={countRowSelected != 1} onClick={onOpenModalUpdate}>Update Product</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} disabled={countRowSelected == 0} danger onClick={handleDeleteButton}>Detele Product</Button>
                </Row>
            </div>
            <div className="pm-table">
                <Table
                    // key={restartTable}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={dataTable}
                    scroll={{ x: "100vw", y: "50vw" }}
                    style={{ maxWidth: "100%", minHeight: "100%" }}
                    pagination={{
                        pageSize: 5,
                        style: { marginRight: '120px', marginTop: "28px" }
                    }}
                    bordered={true}
                />
            </div>


            <Modal
                open={open}
                title="Create a new product"
                okText="Create"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                onCancel={() => setOpen(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                        clearOnDestroy
                        onFinish={(values) => onCreate(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="name_product"
                    label="Name of product"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name of product!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose an image!',
                        },
                    ]}
                >
                    <Upload beforeUpload={beforeUpload} onRemove={onRemove} multiple="false">
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        <Avatar className='block mx-auto my-4' src={preview} size={100} />
                    </Upload>
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="price" label="Price">
                    <Input />
                </Form.Item>
                <Form.Item name="inventory" label="Inventory">
                    <Input />
                </Form.Item>
                {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </Radio.Group>
                </Form.Item> */}
            </Modal>

            <Modal
                open={openModalUpdate}
                title="Update product"
                okText="Update"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                onCancel={() => setOpenModalUpdate(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                        clearOnDestroy
                        onFinish={(values) => onUpdate(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="name_product"
                    label="Name of product"
                >
                    <Input placeholder={productSelected.name} />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                >
                    <Upload beforeUpload={beforeUpload} onRemove={onRemove} multiple="false">
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        <Avatar className='block mx-auto my-4' src={preview} size={100} />
                    </Upload>
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" placeholder={productSelected.productDescription} />
                </Form.Item>
                <Form.Item name="price" label="Price">
                    <Input placeholder={productSelected.price} />
                </Form.Item>
                <Form.Item name="inventory" label="Inventory">
                    <Input placeholder={productSelected.inventory} />
                </Form.Item>
                {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </Radio.Group>
                </Form.Item> */}
            </Modal>


            <Modal title="Delete Product" open={isModalDeleteOpen} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <h1>Do you want delete all of them ?</h1>
                <br/>
                {allProductsSelected.map(item => <p>- {item.name}</p>)}
            </Modal>
        </div>
    )
}

export default ProductManagement