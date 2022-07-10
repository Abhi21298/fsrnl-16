import { loginUtil, logoutUtil, loginCookieUtil } from "../apiUtil";

const initialState = {
    isLoggedIn : false,
    username:'',
    name:'',
    friendList:[],
    message : '',
    status:false
}


const USER_ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    ADD_FRIEND: "ADD_FRIEND",
    REMOVE_FRIEND: "REMOVE_FRIEND"
};

const loginActionCreator = payload=>{
    const {status, message,data:{username,name,friendList}} = payload;
    const isLoggedIn = status;
    const userData = {status,message,username,name,friendList,isLoggedIn};
    return {type:USER_ACTIONS.LOGIN,payload:userData};
}
const logoutActionCreator = payload=>{
    return {type:USER_ACTIONS.LOGOUT};
}

export const loginAction = (payload)=>{
    return async (dispatch)=>{
        try {
            const userData = await (await loginUtil(payload)).data;
            console.log('userData from response',userData);
            if(userData.status){
                console.log("userReducer",userData);
                alert("Logged in successfully");
                dispatch(loginActionCreator(userData));
            };    
        } catch (error) {
            console.log(error);
            alert("login failed")
        }
    }
};
export const loginWithCookieAction = (payload)=>{
    return async (dispatch)=>{
        try {
            const userData = await (await loginCookieUtil()).data;
            console.log('userData from response',userData);

            if(userData.status){
                console.log("userReducer",userData);
                alert("Logged in successfully");
                dispatch(loginActionCreator(userData));
            };    
        } catch (error) {
            console.log(error);
            alert("login failed")
        }
    }
};
export const logoutAction = ()=>{
    return async (dispatch)=>{
        try {
            const data = await (await logoutUtil()).data;
            if(data.status){
                alert("Logged out successfully");
                dispatch(logoutActionCreator());

            };    
        } catch (error) {
            console.log(error);
            alert("logout failed")
        }
    }
};


const userReducer = (state = initialState,action)=>{
    switch (action.type) {
        case USER_ACTIONS.LOGIN:
            const {payload} = action;
            console.log("loginaction",payload);
            return {...state,...payload}
        case USER_ACTIONS.LOGOUT:
            return initialState
    
        default:
            return state
    }
};


export default userReducer