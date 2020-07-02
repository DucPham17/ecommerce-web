import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import {productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer} from './reducers/productReducers'
import thunk from 'redux-thunk'
import { cartReducer } from "./reducers/cartReducer"
import Cookie from "js-cookie"
import signinReducer from "./reducers/signinReducer"
const cartItem = Cookie.getJSON("cartItem") || []
const userInfo = Cookie.getJSON("userInfo") || null;
console.log(userInfo);
const initialState = {cart: {cartItem}, signin : {userInfo}}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    signin : signinReducer.signinReducer,
    register : signinReducer.registerReducer,
    
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store;