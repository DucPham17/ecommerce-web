import axios from "axios"
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_REQUEST,
    PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } = require("../constant/productConstants")
const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get("/api/products")

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        console.log(product)
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product })
      //  console.log(getState())
        const { signin: { userInfo } } = getState();
     //   console.log(userInfo.token)
        if(product._id == undefined){
            const { data } = await axios.post('/api/products', product, {
                headers: {
                    'Autorization': 'Bearer' + userInfo.token
                }
            })
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data })
        }
        else{
            console.log("a")
            const { data } = await axios.put('/api/products/'+product._id, product, {
                headers: {
                    'Autorization': 'Bearer' + userInfo.token
                }
            })
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data })
        }
        
        
    }
    catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message })
    }
}

const detailProducts = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const { data } = await axios.get("/api/product/" + id)
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message })
    }
}

const deleteProduct = (product) => async (dispatch, getState) => {
    try {
        const { signin: { userInfo } } = getState();
        dispatch({ type: PRODUCT_DELETE_REQUEST })
        if(userInfo){
            const { data } = await axios.delete('/api/products/' + product._id, {
                headers: {
                    'Autorization': 'Bearer' + userInfo.token
                }
            })
            dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true })
        }
        
    }
    catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message })
    }
}
export { detailProducts }
export { listProducts }
export {saveProduct}
export {deleteProduct}

