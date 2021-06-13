
export const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_NOTIFICATION":
            return {...action.payload};
        case "DELETE_NOTIFICATION":
            return { ...action.payload };
        case "ADD_NOTIFICATION":
            return { ...action.payload };
        default:
            return state;
    }
};
