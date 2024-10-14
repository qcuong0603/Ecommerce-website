import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Select, notification, Row, Col, Spin, Alert } from 'antd';
import { useGet } from "../../hook/hook";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState('');
  const { data:size, error:sizeerror, loading:sizeload } = useGet("http://localhost:4000/productList/sizes");
  const { data:category, error:cateerror, loading:cateload } = useGet("http://localhost:4000/productList/category");
  if (sizeload||cateload) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  if (sizeerror||cateerror) {
    return (
      <Alert
        message="Error"
        description="Failed to load products."
        type="error"
        showIcon
      />
    );
  }

  const onFinish = async (values) => {
    setErrMessage('');
    const imgArray = values.additionalImages
      ? values.additionalImages.split(',').map(image => image.trim())
      : [];

    try {
      const response = await axios.post('http://localhost:4000/productList/createProduct', {
        ...values,
        additionalImages: imgArray,
      });

      if (response.data.status === 'OK') {
        notification.success({
          message: 'Product Created Successfully',
          description: 'The product has been created successfully!',
        });
        navigate('/product');
      } else {
        setErrMessage('Product creation failed!');
      }
    } catch (error) {
      console.error("Error details:", error);
      const errorMessage = error.response?.data?.message || "An unknown error occurred.";
      notification.error({
        message: 'Product Creation Failed',
        description: errorMessage,
      });
      setErrMessage(errorMessage);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center">
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        name="createProduct"
        className="py-8 h-auto"
        onFinish={onFinish}
      >
        <h1 className="text-xl font-bold mb-4 text-orange-600">Thêm sản phẩm</h1>

        {errMessage && <div className="text-red-500">{errMessage}</div>}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mã SP"
              name="id"
              rules={[{ required: true, message: 'Please input Mã SP!' }]}
            >
              <Input placeholder="Mã SP" />
            </Form.Item>

            <Form.Item
              label="Tên SP"
              name="name"
              rules={[{ required: true, message: 'Please input Tên SP!' }]}
            >
              <Input placeholder="Tên SP" />
            </Form.Item>

            <Form.Item
              label={<span className="text-black">Giá Tiền</span>}
              name="new_price"
              rules={[{ required: true, message: 'Please input new price!' }]}
            >
              <Input type="number" placeholder="New Price" />
            </Form.Item>

            <Form.Item
              label={<span className="text-black">Giá Gốc</span>}
              name="old_price"
              rules={[{ required: true, message: 'Please input old price!' }]}
            >
              <Input type="number" placeholder="Giá Gốc" />
            </Form.Item>

            <Form.Item
              label={<span className="text-black">Số lượng</span>}
              name="number"
              rules={[{ required: true, message: 'Please input Số Lượng!' }]}
            >
              <Input type="number" placeholder="Số Lượng" />
            </Form.Item>

            <Form.Item
              label={<span className="text-black">Mô Tả</span>}
              name="describe"
              rules={[
                { required: true, message: 'Please input description!' },
                { min: 10, message: 'Description should be at least 10 characters long!' },
              ]}
            >
              <Input.TextArea placeholder="Mô Tả Sản Phẩm" />
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label={<span className="text-black">Danh mục</span>}
              name="categoryID"
              rules={[{ required: true, message: 'Please select category!' }]}
            >
              <Select mode="multiple" placeholder="Chọn danh mục">
                {category.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.cateName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={<span className="text-black">Kích Cỡ</span>}
              name="sizeID"
              rules={[{ required: true, message: 'Please select size!' }]}
            >
              <Select mode="multiple" placeholder="Chọn kích cỡ">
                {size.map((size) => (
                  <Option key={size._id} value={size._id}>
                    {size.sizeName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-black">Ảnh Chính</span>}
              name="mainImage"
              rules={[
                { required: true, message: 'Please input Main Image URL!' },
                { type: 'url', message: 'Please enter a valid URL!' },
              ]}
            >
              <Input placeholder="Main Image URL" />
            </Form.Item>

            <Form.Item
              label={<span className="text-black">Các Ảnh Phụ</span>}
              name="additionalImages"
              rules={[{ required: false, message: 'Please enter additional images URLs!' }]} // Optional rule
            >
              <Input.TextArea placeholder="Comma separated URLs for additional images" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ span: 23 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="danger"
              htmlType="submit"
              className="bg-orange-600 hover:bg-orange-400 text-white"
            >
              Create Product
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
