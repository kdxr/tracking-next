import { useRouter } from 'next/dist/client/router';
import { Account } from './../../types/Accounts';
import { LOGIN,CLEAR } from './../types';

const setLoginReducer = (payload) => ({
    type: LOGIN,
    payload
})

const clearLoginReducer = () => ({
    type: CLEAR
})

const login = ({email, name, uid, token}:Account) => {
    return dispatch=>{
        setTimeout(() => {
            const randtoken = Math.random().toString()
            dispatch(setLoginReducer({ token : randtoken, user:{email,name,uid,token} }))
            localStorage.setItem('token', JSON.stringify(randtoken))
            localStorage.setItem('user', JSON.stringify({email, name, uid}))
        }, 2000);
    }
}

const clear = () => {
    return dispatch=> {
        dispatch(clearLoginReducer())
    }
}

export default {
    login,
    clear
}