import {
    Button,
    Form,
    Input,
} from 'antd'
import React from 'react';

const Shopee = () => {
    const value = `Chúng tôi chỉ bán keycaps, không bán bàn phím Hướng dẫn sản phẩm
    1: Nắp chìa khóa chỉ có thể được sử dụng trên bàn phím cơ có trục chéo:
    2: Vui lòng sử dụng các công cụ hoặc tay bạn kéo các keycaps trên bàn phím của bạn.
    3: Sau đó, bạn có thể cài đặt keycays cá tính mà bạn mua tại cửa hàng của chúng tôi trên bàn phím của bạn.`
    return (
        <>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                size="Default"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Store">
                    <Input placeholder='Store' />
                </Form.Item>
                <Form.Item label="Product Name">
                    <Input placeholder='Product Name' />
                </Form.Item>
                <Form.Item label="Product Detail" >
                    <Input.TextArea rows={4}  value={value}/>
                </Form.Item>
                <Form.Item label="Button">
                    <Button disabled>Save</Button>
                </Form.Item>
            </Form>
            
        </>
    );
};

export default Shopee;