import React from 'react';
import {useDispatch} from "react-redux";
import {DeleteSingleNotification} from "../../../redux/actions/notification/notification";

const DeleteNotification = ({close, data,title}) => {

    const dispatch=useDispatch()

    const handleSuccess = () => {
        dispatch(DeleteSingleNotification(data.id))
        close()
    }

    return (
        <div className="notification__modal">
            <h4>{title}</h4>
            <p className="mt-0">آیا میخواهید اطلاعیه {data.name} را حذف کنید؟ </p>
            <div className="mt-5">
                <button className="btn btn-success" onClick={handleSuccess}>ثبت</button>
                <button onClick={close} className="btn btn-danger ">بستن</button>
            </div>
        </div>
    );
};

export default DeleteNotification;