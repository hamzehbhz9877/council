export const chartInfo = (state = {
    payPrizes: [],
    registerUsers: []
}, action) => {
    switch (action.type) {
        case "GET_DATA":
            return {...action.payload};
        default:
            return state;
    }
};
