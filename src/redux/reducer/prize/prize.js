
export const prizeReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_PRIZE":
            return {...action.payload};
        case "DELETE_PRIZE":
            return { ...action.payload };
        case "ADD_PRIZE":
            return { ...action.payload };
        case "EDIT_PRIZE":
            return { ...action.payload };
        default:
            return state;
    }
};
