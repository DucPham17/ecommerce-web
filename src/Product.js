import React from "react"
import { Link } from 'react-router-dom';
function Product(props) {
   return (
       <div>
            <div className="product">
                <div className="product-name"><Link to={"/products/" + props.id}><img src={props.imgSrc} alt="product"/><br/>{props.name}</Link></div>
                <div className="product-brand">{props.brand}</div>
                <div className="product-price">${props.price}</div>
                <div className="product-rating">{props.rating}</div>
              </div>
       </div>
   )

    
}

export default Product;