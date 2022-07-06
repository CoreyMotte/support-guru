export const logInUserRedux = (user) => {
    return {
        type: "LOGIN",
        payload: user
    }
}

export const logOutUserRedux = () => {
    return {
        type: "LOGOUT",
        payload: null
    }
}