import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const formatToVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const Item = (props, onClick) => {
  return (
    <div className='item' onClick={onClick}>
      <Link to={`/product/${props.id}`}>
        <img 
          onClick={() => window.scrollTo(0, 0)} 
          src={props.image} 
          alt={props.name} 
        />
      </Link>
      <p className='name'>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          {formatToVND(props.new_price)}
        </div>
        <div className="item-price-old">
        {formatToVND(props.old_price)}
        </div>
      </div>
    </div>
  );
};

export default Item;
