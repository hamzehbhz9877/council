import {addNewPrize, changeStatus, deletePrize, editPrize, getAllPrize} from "../../../services/council";
import {ErrorMessage, SuccessMessage} from "../notification";



export const AddNewPrize = (prize) => async (dispatch, getState) => {
    const allPrize = {...getState().prizeReducer};

    let updateAllPrize = [...allPrize.prizes];

    try {
        const {data} = await addNewPrize(prize);
        if (data.statusCode === 0) {
            await dispatch({type: "ADD_PRIZE", payload:{...allPrize, prizes: [...updateAllPrize, data.data]}});
            await dispatch(SuccessMessage("جایزه جدید با موفقیت ساخته شد"))
        }
    } catch (e) {
        await dispatch({type: "ADD_PRIZE", payload: {...allPrize}});
    }
};



export const GetAllPrize = (id, value) => async dispatch => {
    try {
        const res = await getAllPrize(id,value);
        console.log(res)
        await dispatch({
            type: "INITIAL_PRIZE",
            payload: {prizes: res.data.data.prizes, pages: res.data.data.pages}
        })
    } catch (e) {

    }
};


export const DeleteSinglePrize = (id) => async (dispatch, getState) => {

    const allPrize = {...getState().prizeReducer};

    let updateAllPrize = [...allPrize.prizes];

    const filter = updateAllPrize.filter(job => job.id !== id);

    updateAllPrize = [...filter];

    try {
        await dispatch({type: "DELETE_PRIZE", payload: {...allPrize, prizes: updateAllPrize}});
        const res = await deletePrize(id);
        console.log(res)
        if (res.data.statusCode === 0) {
            dispatch(SuccessMessage("جایزه با موفقیت حذف شد"))
        }
        if(res.data.StatusCode === 2)
        {
            dispatch(ErrorMessage(res.data.Message))
            await dispatch({type: "DELETE_PRIZE", payload: {...allPrize}});
        }
    } catch (e) {
        await dispatch({type: "DELETE_PRIZE", payload: {...allPrize}});
    }
}

export const EditSinglePrize = (Prize, id) => async (dispatch, getState) => {

    const allPrize = {...getState().prizeReducer};

    const updateAllPrize = [...allPrize.prizes];
    const PrizeIndex = updateAllPrize.findIndex(Prize => Prize.id === id);
    let findPrize = updateAllPrize[PrizeIndex];
    findPrize = {...Prize};
    updateAllPrize[PrizeIndex] = findPrize;
    console.log(updateAllPrize)

    try {
        dispatch({type: "EDIT_PRIZE", payload: {...allPrize, prizes: updateAllPrize}});
        const {status} = await editPrize(Prize,id);
        if (status === 200) {
            await dispatch(SuccessMessage("جایزه با موفقیت ویرایش شد"))
        }
    } catch (e) {
        dispatch({type: "EDIT_PRIZE", payload: {...allPrize}});
    }
};
