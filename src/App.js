import React from 'react';
import './App.css';
import data from "./data.js"

import { BrowserRouter, Route,Link } from 'react-router-dom';
import ProductScreen from "./Screen/ProductScreen"
import HomeScreen from "./Screen/HomeScreen"
import CartScreen from "./Screen/CartScreen"

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        sideBar : false,
        data: data
      }
 }

  openMenu () {
    
    document.querySelector(".sidebar").classList.add('open')
   
    
  }
  
  closeMenu(){
    document.querySelector(".sidebar").classList.remove('open')
  }
   
    
 
 render(){
   return(
     <BrowserRouter>
     <div className="grid-container">
       <header className="header">
        <div className="brand">
          <button onClick={this.openMenu.bind(this)}>
            &#9776;
          </button>
          <Link to="/">Rose</Link>
          </div>
          <div className="header-links">
            <a href="Cart.html">Cart </a>
            <a href="signin">Sign In</a>
            </div>
            <div className="header-links">
            <a href="signup">Sign Up</a>
            </div>
      </header>
      <aside className="sidebar">
        <button onClick={this.closeMenu.bind(this)}>X</button>
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
          <Route path="/products/:id" exact={true} component={ProductScreen} />
          <Route path="/cart/:id?" exact={true} component={CartScreen}/>
          <Route path="/" exact={true} component={HomeScreen}/>
            </div>
        </main>
        <footer className="footer">
          Everything is ready to serve
          </footer>
      </div>
      </BrowserRouter>
   )
 }
}

export default App;
