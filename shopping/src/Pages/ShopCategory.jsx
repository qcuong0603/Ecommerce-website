import React, { useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { useGet } from "../hook/hook"; 
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { data: products, error: productError, loading: productLoading } = useGet("http://localhost:4000/productList/products");
  const { data: categories, error: categoryError, loading: categoryLoading } = useGet("http://localhost:4000/productList/category");
  const [categoryMap, setCategoryMap] = useState({});
  console.log("day la "+props);
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

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="Banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-</span> out of {products.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Sort dropdown" />
        </div>
      </div>
      <div className="shopcategory-products">
        {products.map((item, i) => {
        
          const categoryNames = item.categoryID.map(id => categoryMap[id]);
console.log(categoryNames);
 
          const categoryMatch = categoryNames.includes(props.category); 
          console.log(props.category);
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
