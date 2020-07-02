import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cartAddItems, cartDeleteItems } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import CheckoutStep from '../component/checkoutSteps';

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart)
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    var subTotal = 0;
    var itemsPrice = 0;
    var shippingPrice = 3.99;
    var taxPrice = 0;
    const { cartItem, shipping, payment } = cart;

    if (cart.cartItem != null) {
        if (cart.cartItem.length > 0) {
            cart.cartItem.map(x => {
                itemsPrice += parseFloat(x.price * x.quantity)
            })
        }
    }
    taxPrice = itemsPrice *0.1;
    subTotal = itemsPrice + shippingPrice + taxPrice;
    console.log(cart)
    if (!shipping) {
        props.history.push("/shipping")
    }
    if (cart.payment == null) {
        props.history.push("/payment")
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(cartAddItems(productId, quantity))

    }, [])

    const placeOrderHandler = () => {
        props.history.push("/")
    }
    console.log(cart)
    return (

        <div>
            <CheckoutStep step1 step2 step3 step4 />

            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3>Shipping</h3>
                        <div>
                            {cart.shipping ? cart.shipping.address + ", " + cart.shipping.city + ", " + cart.shipping.country + ", " + cart.shipping.postalCode : null}
                        </div>
                    </div>
                    <div>
                        <h3>Payment</h3>
                        <div>
                            Payment Method : {cart.payment ? cart.payment : null}
                        </div>
                        <ul className="cart-items-container">
                            <li>
                                <h3>Shoping Cart</h3>
                                <h4>Price</h4>
                            </li>
                            {
                                cart.cartItem.length === 0 ? <div>Empty Cart</div> : !Array.isArray(cart.cartItem) ? <div>Loading...</div> : cart.cartItem.map(item =>
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
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="cart-price">
                                            ${item.price}
                                        </div>
                                    </li>
                                )
                            }

                        </ul>
                    </div>

                </div>
                <div className="placeorder-action">
                    <ul>
                        <li>
                            <button className="button primary full-width" onClick={placeOrderHandler}> Place Order</button>
                        </li>
                        <li>
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${taxPrice}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${subTotal}</div>
                        </li>
                    </ul>
                    <h3>
                        {"Subtotal " + "(" + cart.cartItem.length + " items): $" + subTotal}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen;