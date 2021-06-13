import {editCv, getAllCv} from "../../../services/council";
import {SuccessMessage} from "../notification";

export const GetAllCv = () => async dispatch => {
    try {
        const {data} = await getAllCv();
        console.log(data)
        await dispatch({
            type: "INITIAL_CV",
            payload: {title: data.data.title, description: data.data.description, images: data.data.images}
        })
    } catch (e) {

    }
};


export const EditSingleCv = (cv) => async (dispatch, getState) => {

    const allCv = {...getState().cvReducer};

    const imagesRes = [...cv.images];
    const imagesResBase64 = [...cv.images];

    let images = imagesRes.map(item => item.split(",")[1])

    let base64Image = imagesResBase64.map((item) => {
        return {base64: item}
    })

    try {
        const {data} = await editCv({...cv, images});
        if (data.statusCode === 0) {
            await dispatch(SuccessMessage("رزومه با موفقیت ویرایش شد"))
            await dispatch({type: "EDIT_CV", payload: {...cv, images:base64Image}});
        }
    } catch (e) {
        dispatch({type: "EDIT_CV", payload: {...allCv}});
    }
};