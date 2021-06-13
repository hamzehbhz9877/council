import {addNewDistrict, deleteDistrict, editDistrict, getAllDistrict} from "../../../services/council";
import {ErrorMessage, SuccessMessage} from "../notification";



export const AddNewDistrict = (district) => async (dispatch, getState) => {

    const allDistrict = {...getState().districtReducer};

    let updateAllDistrict = [...allDistrict.districts];

    try {
        const {data} = await addNewDistrict(district);
        if (data.statusCode === 0) {
            await dispatch({type: "ADD_DISTRICT", payload:{...allDistrict, districts: [...updateAllDistrict, data.data]}});
            await dispatch(SuccessMessage("محله جدید با موفقیت ساخته شد"))
        }
    } catch (e) {
        await dispatch({type: "ADD_DISTRICT", payload: {...allDistrict}});
    }
};



export const GetAllDistrict = (id, value) => async dispatch => {
    try {
        const res = await getAllDistrict(id,value);
        console.log(res)
        await dispatch({
            type: "INITIAL_DISTRICT",
            payload: {districts: res.data.data.districts, pages: res.data.data.pages}
        })
    } catch (e) {

    }
};


export const DeleteSingleDistrict = (id) => async (dispatch, getState) => {


    const allDistrict = {...getState().districtReducer};

    let updateAllDistrict = [...allDistrict.districts];

    const filter = updateAllDistrict.filter(district => district.id !== id);

    updateAllDistrict = [...filter];

    try {
        await dispatch({type: "DELETE_DISTRICT", payload: {...allDistrict, districts: updateAllDistrict}});
        const res = await deleteDistrict(id);
        if (res.data.statusCode === 0) {
            dispatch(SuccessMessage("محله با موفقیت حذف شد"))
        }
        if(res.data.StatusCode === 2)
        {
            dispatch(ErrorMessage(res.data.Message))
            await dispatch({type: "DELETE_DISTRICT", payload: {...allDistrict}});
        }
    } catch (e) {
        await dispatch({type: "DELETE_DISTRICT", payload: {...allDistrict}});
    }
}

export const EditSingleDistrict = (District, id) => async (dispatch, getState) => {

    const allDistrict = {...getState().districtReducer};

    const updateAllDistrict = [...allDistrict.districts];
    const DistrictIndex = updateAllDistrict.findIndex(District => District.id === id);
    let findDistrict = updateAllDistrict[DistrictIndex];
    findDistrict = {...District};
    updateAllDistrict[DistrictIndex] = findDistrict;
    console.log(updateAllDistrict)

    try {
        dispatch({type: "EDIT_DISTRICT", payload: {...allDistrict, districts: updateAllDistrict}});
        const {status} = await editDistrict(District,id);
        if (status === 200) {
            await dispatch(SuccessMessage("محله با موفقیت ویرایش شد"))
        }
    } catch (e) {
        dispatch({type: "EDIT_DISTRICT", payload: {...allDistrict}});
    }
};

