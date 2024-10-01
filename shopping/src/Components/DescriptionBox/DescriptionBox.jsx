import React from 'react'
import './DescriptionBox.css'
export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
          <div className="descriptionbox-nav-box">Description</div>
          <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
          <p>
          E-commerce websites are online platforms that facilitate the buying and selling of products or services over the internet. 
          They serve as virtual marketplaces where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need 
          for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <p>
          E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations 
          (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
          </p>
        </div>
    </div>
  )
}
export default DescriptionBox
