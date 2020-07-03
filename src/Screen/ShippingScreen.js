import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { saveShipping } from "../actions/cartActions.js";
import CheckoutStep from "../component/checkoutSteps.js";
function ShippingScreen(props) {

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const userRegister = useSelector(state => state.signin)
    console.log(userRegister)
    const { loading, userInfo, error } = userRegister;

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            address: address,
            city: city,
            country: country,
            postalCode: postalCode,
        }
        dispatch(saveShipping(data));
        props.history.push("/payment")
    }



    return (

        <div>
            <CheckoutStep step1 step2 />
            <div className="form">
                <form method="POST" onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h3>Shipping</h3>
                        </li>
                        <li>
                            <label htmlFor="address">Address: </label>
                            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)} placeholder="Address"></input>
                        </li>
                        <li>
                            <label htmlFor="city">City: </label>
                            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)} placeholder="City"></input>
                        </li>
                        <li>
                            <label htmlFor="country">Country: </label>
                            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)} placeholder="Country"></input>
                        </li>
                        <li>
                            <label htmlFor="postalCode">Postal Code: </label>
                            <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code"></input>
                        </li>

                        <li><button type="submit" className="button primary">Continues</button></li>

                    </ul>
                </form>
            </div>
        </div>


    )
}

export default ShippingScreen;