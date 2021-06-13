
export const alertReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_ALERT":
            return [...state, {...action.payload}];
        case "REMOVE_ALERT":
            return state.filter(el => el.id !== action.id);
        default:
            return state;
    }
};
