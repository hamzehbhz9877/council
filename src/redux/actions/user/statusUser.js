import {changeStatus, getInfoPrize} from "../../../services/council";
import {SuccessMessage} from "../notification";


export const GetAllPrizeInfo = (id, value) => async dispatch => {
    try {
        const res = await getInfoPrize(id, value);
        console.log(res)
        await dispatch({
            type: "INITIAL_USER-STATUS",
            payload: [...res.data.data]
        })
    } catch (e) {

    }
};


export const EditStatusPrize = (userId, prizeId) => async (dispatch, getState) => {

    const allStatusPrize = [...getState().userStatusReducer];

    try {
        const {data} = await changeStatus(userId, prizeId);
        if (data.statusCode === 0) {

            const PrizeIndex = allStatusPrize.findIndex(user => user.id === userId);
            let findPrize = allStatusPrize[PrizeIndex];
            findPrize = {...findPrize, status: data.data};
            allStatusPrize[PrizeIndex] = findPrize;
            dispatch({type: "EDIT_USER-STATUS", payload: [...allStatusPrize]});
            await dispatch(SuccessMessage("تغییر وضعیت جایزه با موفقیت انجام شد"))
        }
    } catch (e) {
        dispatch({type: "EDIT_USER-STATUS", payload: [...allStatusPrize]});
    }
};

