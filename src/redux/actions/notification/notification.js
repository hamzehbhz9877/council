import {addNewNotification, deleteNotification, getAllNotification} from "../../../services/council";
import {ErrorMessage, SuccessMessage} from "../notification";



export const AddNewNotification = (notification) => async (dispatch, getState) => {
    const allNotification = {...getState().notificationReducer};

    let updateAllNotification = [...allNotification.notifications];

    try {
        const {data} = await addNewNotification(notification);
        if (data.statusCode === 0) {
            await dispatch({type: "ADD_NOTIFICATION",payload: {...allNotification, notifications: [...updateAllNotification, data.data]}});
            await dispatch(SuccessMessage("اطلاعیه جدید با موفقیت ساخته شد"))
        }
    } catch (e) {
        await dispatch({type: "ADD_NOTIFICATION", payload: {...allNotification}});
    }
};



export const GetAllNotification = (id, value) => async dispatch => {
    try {
        const res = await getAllNotification(id,value);
        console.log(res)
        await dispatch({
            type: "INITIAL_NOTIFICATION",
            payload: {notifications: res.data.data.notifications, pages: res.data.data.pages}
        })
    } catch (e) {

    }
};


export const DeleteSingleNotification = (id) => async (dispatch, getState) => {

    const allNotification = {...getState().notificationReducer};

    let updateAllNotification = [...allNotification.notifications];

    const filter = updateAllNotification.filter(job => job.id !== id);

    updateAllNotification = [...filter];

    try {
        await dispatch({type: "DELETE_NOTIFICATION", payload: {...allNotification, notifications: updateAllNotification}});
        const res = await deleteNotification(id);
        console.log(res)
        if (res.data.statusCode === 0) {
            dispatch(SuccessMessage("اطلاعیه با موفقیت حذف شد"))
        }
        if(res.data.StatusCode === 2)
        {
            dispatch(ErrorMessage(res.data.Message))
            await dispatch({type: "DELETE_NOTIFICATION", payload: {...allNotification}});
        }
    } catch (e) {
        await dispatch({type: "DELETE_NOTIFICATION", payload: {...allNotification}});
    }
}

