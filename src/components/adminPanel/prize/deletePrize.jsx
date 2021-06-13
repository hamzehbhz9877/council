import React from 'react';
import {useDispatch} from "react-redux";
import {DeleteSinglePrize} from "../../../redux/actions/prize/prize";

const DeletePrize = ({close, data,title}) => {

    const dispatch=useDispatch()

    const handleSuccess = () => {
        dispatch(DeleteSinglePrize(data.id))
        close()
    }

    return (
        <div className="prize__modal">
            <h4>{title}</h4>
            <p className="mt-0">آیا میخواهید جایزه {data.name} را حذف کنید؟ </p>
            <div className="mt-5">
                <button className="btn btn-success" onClick={handleSuccess}>ثبت</button>
                <button onClick={close} className="btn btn-danger ">بستن</button>
            </div>
        </div>
    );
};

export default DeletePrize;