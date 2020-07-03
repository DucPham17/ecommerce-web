
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react"
import { signout } from "../actions/signinActions";
function ProfileScreen (props){
    const userProfile = useSelector(state => state.signin);
    console.log(userProfile);
    const {loading,userInfo,error} = userProfile;
    const dispatch = useDispatch();

    useEffect(() => {
        
    },[])
    // if(userInfo == null){
    //     props.history.push("/")
    // }
    const signoutHandler = () => {
        dispatch(signout());
        console.log(userInfo);
        props.history.push("/");
    }

    

    return(
        loading? <div>Loading...</div>:
        <div className="profile-container">
            <div className="profile-info">
            <div>
                Name : {userInfo.name}
            </div>
            <div>
                Email : {userInfo.email}
            </div>
            </div>
            <div className="profile-action">
            <button className="button primary" onClick={signoutHandler}>Sign Out</button>
            <button className="button secondary">Update Info</button>
            </div>
        </div>
    )
}

export default ProfileScreen;