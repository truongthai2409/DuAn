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
import { useNavigate } from 'react-router-dom';

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
            navigate("/profile")
            window.location.href =" http://localhost:5173/profile"
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
    return (
        <>
            {/* <h1>My shop</h1> */}
            <h2>Store information management</h2>
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
                    >
                        <Form.Item label="Name Store">
                            <Input placeholder='Name Store' disabled />
                        </Form.Item>
                        <Form.Item label="Address">
                            <Input placeholder='Address' disabled />
                        </Form.Item>
                        <Form.Item label="Contact">
                            <Input placeholder='Contact' disabled />
                        </Form.Item>
                        <Form.Item label="Button">
                            <Button disabled>Save</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='flex-grow-[5] text-center content-center'>
                    <h1 className='text-2xl'>Avatar</h1>
                    <Avatar className='block mx-auto my-4' src={avatar} size={400} />
                    <Button>Choose Avatar</Button>
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