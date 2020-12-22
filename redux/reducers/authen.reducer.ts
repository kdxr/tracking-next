import { LOGIN,CLEAR,SET } from '../types';
import React, { ReactElement } from 'react'

const initialState = {
    token: null,
    user:  null,
    sidebarShow: 'responsive'
}

const initxState = () => {
    return {
        token : JSON.parse(localStorage.getItem('token')) || null,
        user : JSON.parse(localStorage.getItem('user')) || null,
        sidebarShow: 'responsive'
    }
}

export default  (state = initxState, { type, payload }) => {
    switch (type) {

    case LOGIN:
        return { 
                ...state, 
                token: payload.token, 
                user: {
                    email: payload.user.email, 
                    name: payload.user.name, 
                    uid: payload.user.uid, 
                    token : payload.user.token
                } 
            }
    
    case CLEAR:
        return initialState
    case SET:
            return {...state, ...payload }
    default:
        return state
    }
}
