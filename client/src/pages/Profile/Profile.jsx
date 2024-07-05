import React from 'react';
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
} from 'antd'

const User = () => {

    return (
        <>
            {/* <h1>My profile</h1> */}
            <h2>Manage profile information for account security</h2>
            <hr className='mt-3 mb-3'></hr>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                size="Default"
                style={{ maxWidth: 600 }}
                className='mt-6'
            >
                <Form.Item label="User Name">
                    <Input placeholder='username' disabled />
                </Form.Item>
                <Form.Item label="Name">
                    <Input placeholder='name' disabled />
                </Form.Item>
                <Form.Item label="Email">
                    <Input placeholder='email' type='email' disabled />
                </Form.Item>
                <Form.Item label="Dender">
                    <Radio.Group>
                        <Radio value="men"> Men </Radio>
                        <Radio value="women"> Women </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Birth date">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Phone number">
                    <InputNumber className='w-full' disabled />
                </Form.Item>
                <Form.Item label="Button">
                    <Button disabled>Save</Button>
                </Form.Item>
            </Form>
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
const item = [
    {
        label: 'My Profile',
        key: 1,
        children: <User />,
    },
    {
        label: 'Shop Profile',
        key: 2,
        children: <Shop />,
    },

]



const Profile = () => {
    return (
        <>
            <Header title="Profile" />
            <div className="pm-table profile">
                {/* <h1>Profile</h1> */}
                <Tabs items={item} />
            </div>
        </>
    );
};

export default Profile;