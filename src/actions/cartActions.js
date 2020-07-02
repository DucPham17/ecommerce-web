import Axios from "axios"
import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_SAVE_SHIPPING,  CART_SAVE_PAYMENT } from "../constant/cartConstant"
import Cookie from "js-cookie"
import data from "../data"
export const cartAddItems = (productId, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await Axios("/api/product/" + productId)
        data.quantity = quantity
        dispatch({ type: CART_ADD_ITEM, payload: data })        
        const {cart:  {cartItem}  } = getState()
       // console.log(cartItem)
        Cookie.set("cartItem", JSON.stringify(cartItem));
    } catch (error) {
        console.log(error)
    }
}

export const cartDeleteItems = (productId) => async (dispatch, getState) => {
    dispatch({ type: CART_DELETE_ITEM, payload: productId })
    const { cart:  {cartItem}  } = getState()
    Cookie.set("cartItem", JSON.stringify(cartItem));
}

export const saveShipping = (data)  => dispatch => {
    dispatch({type : CART_SAVE_SHIPPING, payload: data})
}

export const savePayment = (paymentMethod) => dispatch => {
    dispatch({type : CART_SAVE_PAYMENT, payload: paymentMethod})
}