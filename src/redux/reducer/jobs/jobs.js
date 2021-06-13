
export const jobReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_JOB":
            return {...action.payload};
        case "DELETE_JOB":
            return { ...action.payload };
        case "ADD_JOB":
            return { ...action.payload };
        case "EDIT_JOB":
            return { ...action.payload };
        default:
            return state;
    }
};
