const initialState = {
    darkMode: false
}

const displayReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DARKMODE_ON": {
            return {
                darkMode: true
            }
        }

        case "DARKMODE_OFF": {
            return {
                darkMode: false
            }
        }

        default: {
            return state;
        }
    }
}

export default displayReducer;