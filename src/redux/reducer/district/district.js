
export const districtReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_DISTRICT":
            return {...action.payload};
        case "DELETE_DISTRICT":
            return { ...action.payload };
        case "ADD_DISTRICT":
            return { ...action.payload };
        case "EDIT_DISTRICT":
            return { ...action.payload };
        default:
            return state;
    }
};
