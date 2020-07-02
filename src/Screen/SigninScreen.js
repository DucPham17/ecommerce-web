import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/signinActions.js";
function SigninScreen(props) {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const userSignIn = useSelector(state => state.signin)
  // console.log(userSignIn)
    const { loading, userInfo, error } = userSignIn;
    const dispatch = useDispatch();
    const redirect = props.location.search? props.location.search.split("=")[1]:'/'
    console.log(userInfo)
    if (userInfo) {
        props.history.push(redirect)
    }



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, pass))
    }



    return (
        <div className="form">
            <form method="POST" onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h3>Sign In</h3>
                    </li>
                    <li>{loading ? <div>Loading...</div> : userInfo ? <div>Sign in success</div> : null}
                        {error ? <div>There is an error</div> : null}</li>
                    <li >
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="email"></input>
                    </li>
                    <li>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" onChange={(e) => setPass(e.target.value)} placeholder="password"></input>
                    </li>
                    <li><button type="submit" className="button primary">Sign in</button></li>
                    <li>If you are a new user</li>
                    <li><Link to={redirect === '/' ? "register" : "register?redirect=" + redirect} className="button secondary text-center">Create Your Rose Account</Link></li>
                </ul>
            </form>
        </div>
    )
}

export default SigninScreen;