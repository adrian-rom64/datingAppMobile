import { LOGIN, SIGNUP } from "../actions/auth";


const initialState = {
    token: null,

}

export default (state = initialState, action) => {
    switch(action.type){
         case LOGIN:
             return {
                token: action.token,
            }
         case SIGNUP: 
            return {
                token: action.token
            }   
            default:
            return state;
    }
}