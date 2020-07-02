import Axios from "axios"
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS } from "../constant/signinConstant"
import Cookie from "js-cookie"
export const signin = (email, pass) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, pass } })
    try {
        const { data } = await Axios.post("api/users/signin", { email, pass })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        console.log(data)

        Cookie.set('userInfo', JSON.stringify(data))
        
        
       // console.log("a")
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error });
    }
}

export const register = (userName, email, password, confirmPassword) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { userName, email, password, confirmPassword } })
    try {
        const { data } = await Axios.post("api/users/register", { userName, email, password, confirmPassword })

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        console.log(data)
        Cookie.set('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error });
    }
}