import {addNewUser, deleteUser, editUser, getAllUser} from "../../../services/council";
import {ErrorMessage, SuccessMessage} from "../notification";


export const AddNewUser = (user) => async (dispatch, getState) => {
    const allUser = {...getState().userReducer};

    let updateAllUser = [...allUser.users];

    try {
        const {data} = await addNewUser(user);
        if (data.statusCode === 0) {
            await dispatch({type: "ADD_USER", payload: {...allUser, users: [...updateAllUser, data.data]}});
            await dispatch(SuccessMessage("کاربر جدید با موفقیت ساخته شد"))
        }
    } catch (e) {
        await dispatch({type: "ADD_USER", payload: {...allUser}});
    }
};


export const GetAllUser = (id, value) => async dispatch => {
    try {
        const res = await getAllUser(id, value);
        console.log(res)
        await dispatch({
            type: "INITIAL_USER",
            payload: {users: res.data.data.users, pages: res.data.data.pages}
        })
    } catch (e) {

    }
};


export const DeleteSingleUser = (id) => async (dispatch, getState) => {

    const allUser = {...getState().userReducer};

    let updateAllUser = [...allUser.users];

    const filter = updateAllUser.filter(job => job.id !== id);

    updateAllUser = [...filter];

    try {
        await dispatch({type: "DELETE_USER", payload: {...allUser, users: updateAllUser}});
        const res = await deleteUser(id);
        console.log(res)
        if (res.data.statusCode === 0) {
            dispatch(SuccessMessage("کاربر با موفقیت حذف شد"))
        }
        if (res.data.StatusCode === 2) {
            dispatch(ErrorMessage(res.data.Message))
            await dispatch({type: "DELETE_USER", payload: {...allUser}});
        }
    } catch (e) {
        await dispatch({type: "DELETE_USER", payload: {...allUser}});
    }
}

export const EditSingleUser = (User, id) => async (dispatch, getState) => {


    const checkGenderAgent = (gender) => {

        let genderRes;
        if (gender === "1") {
            genderRes = "آقا"
        } else if (gender === "2") {
            genderRes = "خانم"
        } else {
            genderRes = gender
        }
        return genderRes
    }

    const genderAgent = checkGenderAgent(User.gender)


    const allUser = {...getState().userReducer};


    const updateAllUser = [...allUser.users];
    const UserIndex = updateAllUser.findIndex(User => User.id === id);
    let findUser = updateAllUser[UserIndex];
    findUser = {...User,gender:genderAgent};
    updateAllUser[UserIndex] = findUser;


    const checkGender = (gender) => {
        let genderRes;
        if (gender === "آقا") {
            genderRes = 1
        } else if (gender === "خانم") {
            genderRes = 2
        } else {
            genderRes = gender
        }
        return genderRes
    }

    const gender = checkGender(User.gender)


    try {
        dispatch({type: "EDIT_USER", payload: {...allUser, users: updateAllUser}});
        const {status} = await editUser({...User, gender}, id);
        if (status === 200) {
            await dispatch(SuccessMessage("کاربر با موفقیت ویرایش شد"))
        }
    } catch (e) {
        dispatch({type: "EDIT_USER", payload: {...allUser}});
    }
};

