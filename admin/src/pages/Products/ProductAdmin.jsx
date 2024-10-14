import React, { useEffect, useState } from 'react';
import { useGet } from "../../hook/hook";
import TableComponent from "../Table"; 
import { Spin, Alert } from 'antd'; 
import { Link,useNavigate } from 'react-router-dom';
import { Button, Typography, Input, InputNumber, Form, Popconfirm, Space, DatePicker } from "antd"
import Modal from "../Modal"
import {EditOutlined,PlusOutlined,DeleteOutlined,InfoCircleOutlined } from '@ant-design/icons';
const ProductAdmin = () => {
  const { data: products, error: productError, loading: productLoading } = useGet("http://localhost:4000/productList/products");
  const [open, setOpen] = useState(false)
  if (productLoading ) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  if (productError) {
    return (
      <Alert
        message="Error"
        description="Failed to load products."
        type="error"
        showIcon
      />
    );
  }

 

  if (!products || products.length === 0) {
    return <Alert message="No products found" type="info" showIcon />;
  }

 
  const columns = [
    { title: 'ID', key: 'id' },
    { title: 'Main Image', key: 'mainImage' },
    { title: 'New Price (VND)', key: 'new_price' },
    { title: 'Number in Stock', key: 'number' },
    { title: 'Description', key: 'describe' },
    { title: 'Action', key: 'action' }, 
  ];

 
  const formattedData = products.map(product => ({
    id: product.id,
    mainImage: (
      <img src={product.mainImage} alt={product.name} style={{ width: '100px', height: 'auto' }} />
    ),
    new_price: product.new_price,
    number: product.number,
    describe: (
      <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{product.describe}</div>
    ),
    action: (
      <div className="flex space-x-2">
   <button className="text-blue-500 hover:underline">
  <EditOutlined className="text-yellow-500" /> 
</button>
        <button className="text-blue-500 hover:underline"><InfoCircleOutlined /></button>
        <button className="text-red-500 hover:underline"><DeleteOutlined /></button>
      </div>
    ),
  }));

  return (
    <div className='h-full'>
    <div className='flex justify-end max-w-full items-center p-[10px]'>
      <Link to="">
      <button className="btn btn-danger" onClick={() => setOpen(true)}>
       Delete
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
      
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-green-800">Create Product</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-danger w-full">Delete</button>
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      </Link>
    </div>
    <TableComponent columns={columns} data={formattedData} />
  </div>
  
  );
}

export default ProductAdmin;
