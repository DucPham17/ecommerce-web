import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cartAddItems, cartDeleteItems } from '../actions/cartActions';
import { Link } from 'react-router-dom';

function CartScreen(props) {

    const cart = useSelector(state => state.cart)
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    var subTotal = 0;
    if (cart.cartItem != null) {
        if (cart.cartItem.length > 0) {
            cart.cartItem.map(x => {
                subTotal += parseFloat(x.price * x.quantity)
            })
        }
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(cartAddItems(productId, quantity))

    }, [])
    const handleDeleteClick = (productId) => {
        dispatch(cartDeleteItems(productId))
    }

    const checkoutHandle = () => {
        props.history.push("/signin?redirect=shipping")
    }
  //  console.log(cart.cartItem)
    return (
        cart.cartItem == null ? <div>Loading...</div> :
        <div className="cart">
            <div className="cart-items">
                <ul className="cart-items-container">
                    <li>
                        <h3>Shoping Cart</h3>
                        <h4>Price</h4>
                    </li>
                    {
                        cart.cartItem.length === 0 ? <div>Empty Cart</div> : !Array.isArray(cart.cartItem)? <div>Loading...</div> :cart.cartItem.map(item =>
                            <li>
                                <div className="cart-image">
                                    <img src={item.imgSrc} />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/products/" + item.id}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        <select value={item.quantity} onChange={(e) => { dispatch(cartAddItems(item.id, e.target.value)) }} >
                                            {[...Array(item.countInStock).keys()].map(x => {
                                                return <option value={x + 1}>{x + 1}</option>
                                            }
                                            )}
                                        </select>
                                    </div>
                                    <button className="button" onClick={() => handleDeleteClick(item.id)}>Delete</button>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>
                        )
                    }

                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    {"Subtotal " + "(" + cart.cartItem.length + " items): $" + subTotal}
                </h3>
                <button className="button primary" disabled={cart.cartItem.length == 0} onClick={checkoutHandle}>Proceed To Check Out</button>
            </div>
        </div>
    )
}

export default CartScreen;