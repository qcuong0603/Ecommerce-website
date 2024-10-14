import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../Context/ShopContext';
import { Spin, Alert } from 'antd';
import { useGet } from "../../hook/hook"; 

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [categoryMap, setCategoryMap] = useState({});
    const [sizeMap, setSizeMap] = useState({});
    const { data:sizes, error:sizeerror, loading:sizeload } = useGet("http://localhost:4000/productList/sizes");
    const { data:category, error:cateerror, loading:cateload } = useGet("http://localhost:4000/productList/category");
    const formatToVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
    useEffect(() => {
        if (sizes) {
            const map = {};
            sizes.forEach(size => {
                map[size._id] = size.sizeName; 
            });
            setSizeMap(map);
        }
    }, [sizes]);
    useEffect(() => {
        if (category) {
            const map = {};
            category.forEach(category => {
                map[category._id] = category.cateName; 
            });
            setCategoryMap(map);
        }
    }, [category]);
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
 

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="producdisplay-img-list">
                    <img src={product.mainImage} alt="" />
                    {product.additionalImages.map((img, index) => (
                        <img key={index} src={img} alt={`additional ${index}`} />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.mainImage} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">{formatToVND(product.old_price)}</div>
                    <div className="productdisplay-right-price-new">{formatToVND(product.new_price)}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.describe}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {product.sizeID.map((sizeId) => (
                            <div key={sizeId}>{sizeMap[sizeId]}</div> 
                        ))}
                    </div>
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className='productdisplay-right-category'>
                    <span>Danh mục:</span>
                    {product.categoryID.map((categoryId, index) => (
                        <span key={categoryId} style={{ marginLeft: '8px' }}>
                            {categoryMap[categoryId]}{index < product.categoryID.length - 1 ? ',' : ''}
                        </span>
                    ))}
                </p>
          
            </div>
        </div>
    );
};

export default ProductDisplay;
