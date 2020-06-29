import axios from "axios"
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_FAIL,PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_REQUEST } = require("../constant/productConstants")
const listProducts = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get("/api/product")
        dispatch({type: PRODUCT_LIST_SUCCESS,payload : data.data})
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
    }

const detailProducts = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAIL_REQUEST})
        const {data} = await axios.get("/api/product/"+id)
        dispatch({type: PRODUCT_DETAIL_SUCCESS,payload : data})
    }
    catch(error){
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.message})
    }
}
export {detailProducts}
export {listProducts}
    
