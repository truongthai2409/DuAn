import React, { useState, useEffect } from 'react';
import Header from '../../component/Header/Header';
import avatar from '../../assets/images/avatar.png'
import './Profile.css'
import {
    Avatar,
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Tabs,
    Upload
} from 'antd'
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const User = () => {
    const [dataProfile, setDataProfile] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null)
    const [initImage, setInitImage] = useState(null)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/profile');
                setDataProfile(response.data.data[0]);
                setPreview("http://localhost:5000/" + response.data.data[0].avatar)
                setInitImage("http://localhost:5000/" + response.data.data[0].avatar)
                console.log(response.data.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    const onFinish = async (values) => {
        try {
            // Send form data including the file
            const formData = new FormData();
            formData.append('first_name', values.first_name || dataProfile.first_name);
            formData.append('last_name', values.last_name || dataProfile.last_name);
            formData.append('email', values.email || dataProfile.email);
            if (file) {
              formData.append('avatar', values.avatar.file);
            }
      
            await axios.put('http://localhost:5000/auth/update-profile', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(values);
            window.location.reload();
            // message.success('Form submitted successfully!');
          } catch (error) {
            // message.error('Form submission failed!');
            console.error(error);
          }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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

    return (
        <>
            {/* <h1>My profile</h1> */}
            <h2>Manage profile information for account security</h2>
            <hr className='mt-3 mb-3'></hr>
            <div className='flex'>
                <div className='flex-grow-[5]'>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        size="Default"
                        style={{ maxWidth: 600 }}
                        className='mt-6'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item label="First Name" name="first_name">
                            <Input placeholder={dataProfile.first_name}/>
                        </Form.Item>
                        <Form.Item label="Last Name" name="last_name">
                            <Input placeholder={dataProfile.last_name} />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder={dataProfile.email} type='email' />
                        </Form.Item>
                        {/* <Form.Item label="Dender">
                    <Radio.Group>
                        <Radio value="men"> Men </Radio>
                        <Radio value="women"> Women </Radio>
                    </Radio.Group>
                </Form.Item> */}
                        {/* <Form.Item label="Birth date">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Phone number">
                    <InputNumber className='w-full' disabled />
                </Form.Item> */}
                        <Form.Item label="Avatar" name="avatar">
                            <Upload beforeUpload={beforeUpload} onRemove={onRemove} multiple="false">
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item >
                            <Button type='primary' htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='flex-grow-[5] text-center content-center'>
                    <h1 className='text-2xl'>Avatar</h1>
                    <Avatar className='block mx-auto my-4' src={!preview ? avatar : preview} size={400} />
                    {/* <Upload>
                        <Button icon={<UploadOutlined />}>Choose Avatar</Button>
                    </Upload> */}
                </div>
            </div>
        </>
    )
}

const Shop = () => {
    const [code, setCode] = useState('')
    const [dataProfile, setDataProfile] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    axios.defaults.withCredentials = true;
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

    const handleChangeInputCode = (value) => {
        setCode(value)
    }
    const generateAccessToken = async () => {
        await axios.post('http://localhost:5000/lazada/generate-access-token', {codeLoginLazada: code});
        setCode('')
        await axios.get('http://localhost:5000/product/sync-product-lazada');
    }
    
    const handleDeleteAccessToken = () => {

    }

    const onFinishShop = async (values) => {
        try {
            // Send form data including the file
            // const formData = new FormData();
            // formData.append('phone_number', values.phone_number || dataProfile.phone_number);
            // formData.append('name_store', values.name_store || dataProfile.name_store);
            // formData.append('address', values.address || dataProfile.address);
      
            const res = await axios.put('http://localhost:5000/auth/update-shop', values);
            // console.log(res);
            // console.log(formData);
            window.location.reload();
          } catch (error) {
            console.error(error);
          }
    };
    const onFinishShopFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {/* <h1>My shop</h1> */}
            <h2>Store information management</h2>
            <hr className='mt-3 mb-3'></hr>
            <div className='flex'>
                <div className='flex-grow-[5]'>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        size="Default"
                        style={{ maxWidth: 600 }}
                        className='mt-6'
                        onFinish={onFinishShop}
                        onFinishFailed={onFinishShopFailed}
                    >
                        <Form.Item label="Name Store" name="name_store">
                            <Input placeholder={dataProfile.name_store}  />
                        </Form.Item>
                        <Form.Item label="Address" name="address">
                            <Input placeholder={dataProfile.address}  />
                        </Form.Item>
                        <Form.Item label="Phone Number" name="phone_number">
                            <Input placeholder={dataProfile.phone_number}  />
                        </Form.Item>
                        <Form.Item label="Button">
                            <Button htmlType='submit' type='primary'>Save</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='flex-grow-[5] text-center content-center'>
                    <Button type='primary' danger onClick={handleDeleteAccessToken}><Link to='https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://abc.com&client_id=129821' rel="noreferrer" target={'_blank'}>Connect to Lazada</Link></Button>
                    <br/>Code: <Input value={code} onChange={(e) => handleChangeInputCode(e.target.value)}/>
                    <Button type='primary' style={{marginTop: 5}} onClick={generateAccessToken}>Enter code</Button>
                </div>
            </div>

        </>
    )
}


const ChangePassword = () => {
    const [dataProfile, setDataProfile] = useState({})

    const onFinishShop = async (values) => {
        try {
            console.log(values);
            
            if (values.new_password == values.confirm_password) {
                await axios.put('http://localhost:5000/auth/change-password', values);
            }
            // const res = await axios.put('http://localhost:5000/auth/change-password', values);
            // console.log(res);
            // console.log(formData);
            window.location.reload();
          } catch (error) {
            console.error(error);
          }
    };
    const onFinishShopFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <h2>Change password</h2>
            <hr className='mt-3 mb-3'></hr>
            <div className='flex'>
                <div className='flex-grow-[1]'>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        size="Default"
                        style={{ maxWidth: 600 }}
                        className='mt-6'
                        onFinish={onFinishShop}
                        onFinishFailed={onFinishShopFailed}
                    >
                        <Form.Item label="Current password" name="current_password">
                            <Input />
                        </Form.Item>
                        <Form.Item label="New password" name="new_password">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Confirm password" name="confirm_password">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Button">
                            <Button htmlType='submit' type='primary'>Change Password</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </>
    )
}




const Profile = () => {
    
    const { t } = useTranslation('profile');
    let item = [
        {
            label: `${t('profileUserTL')}`,
            key: 1,
            children: <User />,
        },
        {
            label: `${t('profileShopTL', { ns: 'profile'})}`,
            key: 2,
            children: <Shop />,
        },
        {
            // label: `${t('profileShopTL', { ns: 'profile'})}`,
            label: "Change Password",
            key: 3,
            children: <ChangePassword />,
        },
    
    ]
    return (
        <>
            <Header title="profileTL" />
            <div className="pm-table profile">
                {/* <h1>Profile</h1> */}
                <Tabs items={item} />
            </div>
        </>
    );
};

export default Profile;