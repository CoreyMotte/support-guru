import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
}

if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => this.user = userData,
    logout: () => { }
});

function authReducer(state, action) {
    switch (action.type) {

        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }

        case 'LOGOUT':
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        const { _id, email, perms, token, username, pending_admin } = userData;
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", _id);
        localStorage.setItem("perms", perms);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("perms");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider };