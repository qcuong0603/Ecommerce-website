// Inside ShopCategory.js
import React, { useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { useGet } from "../hook/hook"; 
import { DownOutlined } from '@ant-design/icons';
import Item from '../Components/Item/Item';
import { useNavigate } from 'react-router-dom';

const ShopCategory = (props) => {
  const navigate = useNavigate();
  const { data: products, error: productError, loading: productLoading } = useGet("http://localhost:4000/productList/products");
  const { data: categories, error: categoryError, loading: categoryLoading } = useGet("http://localhost:4000/productList/category");
  const [categoryMap, setCategoryMap] = useState({});

  useEffect(() => {
    if (categories) {
      const map = {};
      categories.forEach(category => {
        map[category._id] = category.cateName; 
      });
      setCategoryMap(map);
    }
  }, [categories]);

  if (productLoading || categoryLoading) {
    return <div>Loading...</div>;
  }
  if (categoryError) {
    return <div>Error loading categories</div>;
  }
  if (productError) {
    return <div>Error loading products</div>;
  }

  const handleItemClick = (item) => {
    navigate(`/product/${item.id}`); 
};


  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="Banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing Clothes-</span> out of {products.length} products
        </p>
        <div className="shopcategory-sort">
         Sort  <DownOutlined/>
        </div>
      </div>
      <div className="shopcategory-products">
        {products.map((item, i) => {
          const categoryNames = item.categoryID.map(id => categoryMap[id]);
          const categoryMatch = categoryNames.includes(props.category); 
          if (!categoryMatch) {
            return null; 
          }
          return (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.mainImage} 
              new_price={item.new_price} 
              old_price={item.old_price}
              onClick={() => handleItemClick(item.id)} 
            />
          );
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
