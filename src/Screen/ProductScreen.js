import React, { useEffect, useState } from "react"
import Product from "../Product.js"
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {detailProducts} from "../actions/productActions.js"
function ProductScreen(props) {
    const productDetails = useSelector(state => state.productDetails)
    const [quantity,setQuantity] = useState(1)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailProducts(props.match.params.id))


        return () => {
        
        }
        
    },[])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id +"?quantity="+quantity)
    }

    const item = productDetails.productDetail
    return(
        item == null ? <div>Loading...</div>:
        <div >
            <Link to="/">Back to result</Link>
            <div className="productScreen">
            <Product id={item} name={item.name} imgSrc={item.imgSrc} brand={item.brand} 
                    price={item.price} rating={item.rating}/>
            <div className="numberProduct">
                <ul >
                <li>${item.price}</li>
                <li>{item.countInStock > 0 ? "State: In Stock" : "State: Out of Stock"}</li>
                <li><select value = {quantity} onChange={(e) => {setQuantity(e.target.value)}}>
                   {[...Array(item.countInStock).keys()].map(x => {
                        return <option value={x+1}>{x+1}</option>
                   }

                   )}
                    </select></li>
                </ul>
                {item.countInStock > 0 ?
                <button className="addToCart" onClick={handleAddToCart.bind(this)}>Add To Cart</button> : <div>Out of Stock</div>}
            </div>
            </div>
            
        </div>
    )
}

export default ProductScreen;