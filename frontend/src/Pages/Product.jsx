import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Components/Context/ShopContext';
import { Breadcrum } from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import { Spin, Alert } from "antd";
import { useGet } from "../hook/hook";

export const Product = () => {
    const { id } = useParams(); 
    const { data, error, loading } = useGet(`http://localhost:4000/productList/products/${id}`); // Ensure id is defined here
    console.log('Product ID:', id);

    if (loading) {
        return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
    }

    if (error) {
        return (
            <Alert
                message="Error"
                description="Failed to load product details."
                type="error"
                showIcon
            />
        );
    }

    if (!data) {
        return <Alert message="No product data found" type="info" showIcon />;
    }
    console.log('Fetched Product Data:', data);
    return (
      <div>
          <Breadcrum product={data[0]} />  
          <ProductDisplay product={data[0]} /> 
          <DescriptionBox />
          <RelatedProducts />
      </div>
  );  
};

export default Product;
