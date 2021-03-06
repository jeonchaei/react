import produce from "immer";

const dummyUser = (data) => ({
    ...data,
    nickname : 'CHAECHAE',
    id : 1,
    Posts : [{id:1}],
    Followings : [{id:'h'}],
    Followers : [{id:'k'},{id:'h'}],
});
export const initialState = {
    logInLoading : false,
    logInDone : false,
    logInError : null,
    logOutLoading : false,
    logOutDone : false,
    logOutError : null,
    signupLoading : false,
    signupDone : false,
    signupError : null,
    changeNicknameLoading : false,
    changeNicknameDone : false,
    changeNicknameError : null,
    me : null,
    signUpDate : {},
    loginData : [],
}

export const LOG_IN_REQUEST= 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS='LOG_IN_SUCCESS';
export const LOG_IN_FAILURE='LOG_IN_FAILURE';

export const LOG_OUT_REQUEST= 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS='LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE='LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST= 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS='SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE='SIGN_UP_FAILURE';

export const FOLLOW_REQUEST= 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS='FOLLOW_SUCCESS';
export const FOLLOW_FAILURE='FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST= 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS='UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE='UNFOLLOW_FAILURE';

export const CHANGE_NICKNAME_REQUEST= 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS='CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE='CHANGE_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = (data) => {
    return {
        type : LOG_IN_REQUEST,
        data,
    }
}
export const logoutRequestAction = () => {
    return {
        type : LOG_OUT_REQUEST,
    }
}

export const logoutSuccessAction = (data) => {
    return {
        type : LOG_OUT_SUCCESS,
        data,
    }
}

export const logoutFailureAction = (data) => {
    return {
        type : LOG_OUT_FAILURE,
        data,
    }
}

const dummyFollower = {
    id : 'halomalo',
}

const reducer = (state=initialState, action)=>
    produce(state,(draft)=>{
    switch(action.type){
        case FOLLOW_REQUEST:
                draft.followLoading = true;
                draft.followDone=false;
                draft.followError=null;
                break;
        case FOLLOW_SUCCESS:
                draft.me.Followings.push({id : action.data});
                draft.followLoading = false;
                draft.followDone = true;
                break;
        case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
                break;
        case UNFOLLOW_REQUEST:
                    draft.unfollowLoading = true;
                    draft.unfollowDone=false;
                    draft.unfollowError=null;
                    break;
        case UNFOLLOW_SUCCESS:
                    draft.me.Followings = draft.me.Followings.filter((v)=>v.id !== action.data);
                    draft.unfollowLoading = false;
                    draft.unfollowDone = true;
                    break;
            case UNFOLLOW_FAILURE:
                    draft.unfollowLoading = false;
                    draft.unfollowError = action.error;
                    break;       
        case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
        case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.me = action.data;
                break;
        case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
        case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutError = null;
                draft.logOutDone = false;
                break;
        case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.me = null;
                break;
        case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
        case SIGN_UP_REQUEST:
                draft.signupLoading = true;
                draft.signupError = null;
                draft.signupDone = false;
                break;
        case SIGN_UP_SUCCESS:
                draft.signupLoading = false;
                draft.signupDone = true;
                draft.me = null;
                break;
        case SIGN_UP_FAILURE:
                draft.signupLoading = false;
                draft.signupError = action.error;
                break;
        case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading = true;
                draft.changeNicknameError = null;
                draft.changeNicknameDone = false;
                break;
        case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                draft.me = null;
                break;
        case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
        case ADD_POST_TO_ME:
                draft.me.Posts.unshift({id:action.data});
                break;
        case REMOVE_POST_OF_ME:
                draft.me.Posts = draft.me.Posts.filter((v)=>v.id!==action.data);
                break;
        default : 
            break;
    }
});

export default reducer;