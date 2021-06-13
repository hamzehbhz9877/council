import {addNewActivity, deleteActivity, editActivity, getAllActivity} from "../../../services/council";
import {ErrorMessage, SuccessMessage} from "../notification";



export const AddNewActivity = (activity) => async (dispatch, getState) => {
    const allActivity = {...getState().activityReducer};

    let updateAllActivity = [...allActivity.activities];

    try {
        const {data} = await addNewActivity(activity);
        if (data.statusCode === 0) {
            await dispatch({type: "ADD_ACTIVITY", payload:{...allActivity, activities: [...updateAllActivity, data.data]}});
            await dispatch(SuccessMessage("فعالیت جدید با موفقیت ساخته شد"))
        }
    } catch (e) {
        await dispatch({type: "ADD_ACTIVITY", payload: {...allActivity}});
    }
};



export const GetAllActivity = (id, value) => async dispatch => {
    try {
        const res = await getAllActivity(id,value);
        console.log(res)
        await dispatch({
            type: "INITIAL_ACTIVITY",
            payload: {activities: res.data.data.activities, pages: res.data.data.pages}
        })
    } catch (e) {

    }
};


export const DeleteSingleActivity = (id) => async (dispatch, getState) => {

    const allActivity = {...getState().activityReducer};

    let updateAllActivity = [...allActivity.activities];

    const filter = updateAllActivity.filter(activity => activity.id !== id);

    updateAllActivity = [...filter];

    try {
        await dispatch({type: "DELETE_ACTIVITY", payload: {...allActivity, activities: updateAllActivity}});
        const res = await deleteActivity(id);
        console.log(res)
        if (res.data.statusCode === 0) {
            dispatch(SuccessMessage("فعالیت با موفقیت حذف شد"))
        }
        if(res.data.StatusCode === 2)
        {
            dispatch(ErrorMessage(res.data.Message))
            await dispatch({type: "DELETE_ACTIVITY", payload: {...allActivity}});
        }
    } catch (e) {
        await dispatch({type: "DELETE_ACTIVITY", payload: {...allActivity}});
    }
}

export const EditSingleActivity = (Activity, id) => async (dispatch, getState) => {

    const allActivity = {...getState().activityReducer};

    const updateAllActivity = [...allActivity.activities];
    const ActivityIndex = updateAllActivity.findIndex(Activity => Activity.id === id);
    let findActivity = updateAllActivity[ActivityIndex];
    findActivity = {...Activity};
    updateAllActivity[ActivityIndex] = findActivity;
    console.log(updateAllActivity)

    try {
        dispatch({type: "EDIT_ACTIVITY", payload: {...allActivity, activities: updateAllActivity}});
        const {status} = await editActivity(Activity,id);
        if (status === 200) {
            await dispatch(SuccessMessage("فعالیت با موفقیت ویرایش شد"))
        }
    } catch (e) {
        dispatch({type: "EDIT_ACTIVITY", payload: {...allActivity}});
    }
};

