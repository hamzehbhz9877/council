import React from 'react';
import {useDispatch} from "react-redux";
import {EditStatusPrize} from "../../../../redux/actions/user/statusUser";

const StatusPrize = ({data,title,close}) => {

    const dispatch=useDispatch()


    const handleSuccess = () => {
        dispatch(EditStatusPrize(data.userId,data.prizeId))
        close()
    }

    return (
        <div className="prize__modal">
            <h4>{title}</h4>
            <p className="mt-0"> آیا از تغییر وضعیت تحویل جایزه کاربر{`(${data.name})`} مطمین هستید؟ </p>
            <div className="mt-5">
                <button className="btn btn-success" onClick={handleSuccess}>ثبت</button>
                <button onClick={close} className="btn btn-danger ">بستن</button>
            </div>
        </div>
    );
};

export default StatusPrize;