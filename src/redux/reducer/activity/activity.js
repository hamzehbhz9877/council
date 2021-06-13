
export const activityReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_ACTIVITY":
            return {...action.payload};
        case "DELETE_ACTIVITY":
            return { ...action.payload };
        case "ADD_ACTIVITY":
            return { ...action.payload };
        case "EDIT_ACTIVITY":
            return { ...action.payload };
        default:
            return state;
    }
};
