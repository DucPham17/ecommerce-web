import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { savePayment } from "../actions/cartActions.js";
import CheckoutStep from "../component/checkoutSteps.js";
function PaymentScreen(props) {


    const [paymentMethod, setPaymentMethod] = useState("");
    const userRegister = useSelector(state => state.signin)
    console.log(userRegister)
    const { loading, userInfo, error } = userRegister;

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        props.history.push("/placeorder")
    }



    return (

        <div>
            <CheckoutStep step1 step2 step3 />
            <div className="form">
                <form method="POST" onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h3>Payment</h3>
                        </li>
                        <li>
                            <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" onChange={e => setPaymentMethod(e.target.value)}></input>
                            <label htmlFor="paymentMethod">PayPal </label>
                        </li>

                        <li><button type="submit" className="button primary">Continues</button></li>

                    </ul>
                </form>
            </div>
        </div>


    )
}

export default PaymentScreen;