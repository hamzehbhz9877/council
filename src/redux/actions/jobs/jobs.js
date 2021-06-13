import {addNewJob, deleteJob, editJob, getAllJob} from "../../../services/council";
import {ErrorMessage, SuccessMessage} from "../notification";



export const AddNewJob = (job) => async (dispatch, getState) => {
    const allJob = {...getState().jobReducer};

    let updateAllJob = [...allJob.jobs];

    try {
        const {data} = await addNewJob(job);
        if (data.statusCode === 0) {
            await dispatch({type: "ADD_JOB", payload:{...allJob, jobs: [...updateAllJob, data.data]}});
            await dispatch(SuccessMessage("شغل جدید با موفقیت ساخته شد"))
        }
    } catch (e) {
        await dispatch({type: "ADD_JOB", payload: {...allJob}});
    }
};



export const GetAllJob = (id, value) => async dispatch => {
    try {
        const res = await getAllJob(id,value);
        console.log(res)
        await dispatch({
            type: "INITIAL_JOB",
            payload: {jobs: res.data.data.jobs, pages: res.data.data.pages}
        })
    } catch (e) {

    }
};


export const DeleteSingleJob = (id) => async (dispatch, getState) => {

    const allJob = {...getState().jobReducer};

    let updateAllJob = [...allJob.jobs];

    const filter = updateAllJob.filter(job => job.id !== id);

    updateAllJob = [...filter];

    try {
        await dispatch({type: "DELETE_JOB", payload: {...allJob, jobs: updateAllJob}});
        const res = await deleteJob(id);
        console.log(res)
        if (res.data.statusCode === 0) {
            dispatch(SuccessMessage("شغل با موفقیت حذف شد"))
        }
        if(res.data.StatusCode === 2)
        {
            dispatch(ErrorMessage(res.data.Message))
            await dispatch({type: "DELETE_JOB", payload: {...allJob}});
        }
    } catch (e) {
        await dispatch({type: "DELETE_JOB", payload: {...allJob}});
    }
}

export const EditSingleJob = (Job, id) => async (dispatch, getState) => {

    const allJob = {...getState().jobReducer};

    const updateAllJob = [...allJob.jobs];
    const JobIndex = updateAllJob.findIndex(Job => Job.id === id);
    let findJob = updateAllJob[JobIndex];
    findJob = {...Job};
    updateAllJob[JobIndex] = findJob;
    console.log(updateAllJob)

    try {
        dispatch({type: "EDIT_JOB", payload: {...allJob, jobs: updateAllJob}});
        const {status} = await editJob(Job,id);
        if (status === 200) {
            await dispatch(SuccessMessage("شغل با موفقیت ویرایش شد"))
        }
    } catch (e) {
        dispatch({type: "EDIT_JOB", payload: {...allJob}});
    }
};

