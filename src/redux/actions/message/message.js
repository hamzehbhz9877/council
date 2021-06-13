import {addNewMessage, getAllMessage} from "../../../services/council";
import {SuccessMessage} from "../notification";



export const AddNewMessage = (message) => async (dispatch, getState) => {
    const allMessage = {...getState().messageReducer};

    let updateAllMessage = [...allMessage.messages];

    try {
        const {data} = await addNewMessage(message);
        if (data.statusCode === 0) {
            await dispatch({type: "ADD_MESSAGE", payload:{...allMessage, messages: [...updateAllMessage, data.data]}});
            await dispatch(SuccessMessage("پیامک جدید با موفقیت ساخته شد"))
        }
    } catch (e) {
        await dispatch({type: "ADD_MESSAGE", payload: {...allMessage}});
    }
};



export const GetAllMessage = (id, value) => async dispatch => {
    try {
        const res = await getAllMessage(id,value);
        console.log(res)
        await dispatch({
            type: "INITIAL_MESSAGE",
            payload: {messages: res.data.data.messages, pages: res.data.data.pages}
        })
    } catch (e) {

    }
};



