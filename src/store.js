import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import thunk from 'redux-thunk'
import { cartReducer } from "./reducers/cartReducer"
import Cookie from "js-cookie"
const cartItem = Cookie.getJSON("cartItem") || []

const initialState = {cart: {cartItem}}
console.log(initialState)
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store;