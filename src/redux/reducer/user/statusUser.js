
export const userStatusReducer = (state =[], action) => {
    switch (action.type) {
        case "INITIAL_USER-STATUS":
            return [...action.payload];
        case "EDIT_USER-STATUS":
            return [...action.payload];
        default:
            return state;
    }
};
