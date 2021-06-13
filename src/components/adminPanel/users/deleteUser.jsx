import React from 'react';
import {useDispatch} from "react-redux";
import {DeleteSingleUser} from "../../../redux/actions/user/user";

const DeleteUser = ({close, data, title}) => {

    const dispatch=useDispatch()

    const handleSuccess = () => {
        dispatch(DeleteSingleUser(data.id))
        close()
    }

    return (
        <div className="user__modal">
            <h4>{title}</h4>
            <p className="mt-0">آیا میخواهید کاربر {data.name} را حذف کنید؟ </p>
            <div className="mt-5">
                <button className="btn btn-success" onClick={handleSuccess}>ثبت</button>
                <button onClick={close} className="btn btn-danger ">بستن</button>
            </div>
        </div>
    );
};

export default DeleteUser;