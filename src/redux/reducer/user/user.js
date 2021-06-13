
export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_USER":
            return {...action.payload};
        case "DELETE_USER":
            return { ...action.payload };
        case "ADD_USER":
            return { ...action.payload };
        case "EDIT_USER":
            return { ...action.payload };
        default:
            return state;
    }
};
