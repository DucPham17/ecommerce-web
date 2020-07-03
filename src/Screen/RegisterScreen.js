import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/signinActions.js";
import { Link } from "react-router-dom";
function RegisterScreen(props) {

    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [userName, setUsername] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const userRegister = useSelector(state => state.signin)
    console.log(userRegister)
    const { loading, userInfo, error } = userRegister;
    
    const dispatch = useDispatch();
    const redirect = props.location.search? props.location.search.split("=")[1]:'/'
    if (userRegister.userInfo) {
        props.history.push("/")
    }



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(userName, email, password, confirmPassword))
    }



    return (
        <div className="form">
            <form method="POST" onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h3>Register</h3>
                    </li>
                    <li>
                        {loading != null ? error ? <div>Register Fail</div> : <div>Register Ok</div> : null}
                    </li>

                    <li>
                        <label htmlFor="username">User Name: </label>
                        <input type="text" name="userName" id="userName" onChange={(e) => setUsername(e.target.value)} placeholder="User Name"></input>
                    </li>
                    <li >
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                    </li>
                    <li>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" onChange={(e) => setPass(e.target.value)} placeholder="Password"></input>
                    </li>
                    <li>
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"></input>
                    </li>
                    <li><button type="submit" className="button primary">Sign Up</button></li>
                    <li>If you already have an account</li>
                    <li>
                    <li><Link to={redirect === '/' ? "register" : "register?redirect=" + redirect} className="button secondary text-center">Create Your Rose Account</Link></li>
                    </li>

                </ul>
            </form>
        </div>
    )
}

export default RegisterScreen;