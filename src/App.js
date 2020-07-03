import React, { useEffect } from 'react';
import './App.css';
import data from "./data.js"

import { BrowserRouter, Route, Link } from 'react-router-dom';
import ProductScreen from "./Screen/ProductScreen"
import HomeScreen from "./Screen/HomeScreen"
import CartScreen from "./Screen/CartScreen"
import SigninScreen from './Screen/SigninScreen';
import RegisterScreen from './Screen/RegisterScreen'
import { useSelector } from 'react-redux';
import ProductsScreen from './Screen/ProductsScreen';
import ShippingScreen from './Screen/ShippingScreen';
import PaymentScreen from './Screen/PaymentScreen';
import PlaceOrderScreen from './Screen/PlaceOrderScreen';
import ProfileScreen from './Screen/ProfileScreen';

function App(props) {

  const userSignin = useSelector(state => state.signin);
  console.log(userSignin)
  const  {userInfo}  = userSignin;
  // useEffect(() => {
  //   if(userInfo){
  // //  window.location.reload(true)
  //   }
  // },[])
  // if(userSignin != null){
  //   userInfo = userSignin.userInfo;
  // }
 // console.log(userSignin)

  const openMenu = () => {

    document.querySelector(".sidebar").classList.add('open')


  }



  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove('open')
  }




  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
          </button>
            <Link to="/">Rose</Link>
          </div>
          <div className="header-links">
            <a href="cart">Cart </a>
          </div>
          <div className="header-links">
            {userInfo? <Link to="/profile">{userInfo.name}</Link> : <Link to="signin">Sign In</Link>}
          </div>
        </header>
        <aside className="sidebar">
          <button onClick={closeMenu}>X</button>
          <h3>Shopping Categories</h3>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/products" component={ProductsScreen}/>
            <Route path="/product/:id" exact={true} component={ProductScreen} />
            <Route path="/cart/:id?" exact={true} component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingScreen}/>
            <Route path="/payment" component={PaymentScreen}/>
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/profile" component={ProfileScreen} />
          </div>
        </main>
        <footer className="footer">
          Everything is ready to serve
          </footer>
      </div>
    </BrowserRouter>
  )

}

export default App;
