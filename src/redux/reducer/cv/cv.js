
export const cvReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_CV":
            return {...action.payload};
        case "EDIT_CV":
            return {...action.payload};
        default:
            return state;
    }
};
