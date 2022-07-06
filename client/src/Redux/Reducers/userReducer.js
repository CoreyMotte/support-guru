const initialState = {
    user: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN": {
            const user = action.payload;
            return {
                user: {
                    username: user.username,
                    userId: user.userId,
                    email: user.email
                }
            }
        }

        case "LOGOUT": {
            return {
                user: null
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer;