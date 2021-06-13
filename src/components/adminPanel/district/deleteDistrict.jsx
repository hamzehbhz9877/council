import React from 'react';
import {DeleteSingleDistrict} from "../../../redux/actions/district/district";
import {useDispatch} from "react-redux";

const DeleteDistrict = ({close, data,title}) => {

    const dispatch=useDispatch()

    const handleSuccess = () => {
        dispatch(DeleteSingleDistrict(data.id))
        close()
    }

    return (
        <div className="district__modal">
            <h4>{title}</h4>
            <p className="mt-0">آیا میخواهید محله {data.name} را حذف کنید؟ </p>
            <div className="mt-5">
                <button className="btn btn-success" onClick={handleSuccess}>ثبت</button>
                <button onClick={close} className="btn btn-danger ">بستن</button>
            </div>
        </div>
    );
};

export default DeleteDistrict;