
import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constant/cartConstant";

export const cartReducer = (state = {cartItem : [],shipping :{},payment : {}},action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const itemInCart = state.cartItem.find(product => product.id == item.id? product : null)
            if(itemInCart != null){
                const position = state.cartItem.indexOf(itemInCart)
                const newCart = [].concat(state.cartItem.slice(0,position),state.cartItem.slice(position+1,state.cartItem.length))
                newCart.push(item)
                return {cartItem: newCart}
            }
            return {cartItem: [...state.cartItem,item]}
        case CART_DELETE_ITEM:
            const productId = action.payload;
            const newCart = state.cartItem.filter(product => product.id != productId)
            return {cartItem: newCart}
        case CART_SAVE_SHIPPING:
            return {...state, shipping: action.payload}
        case CART_SAVE_PAYMENT:
            return {...state, payment: action.payload}
        default: return state
    }
}