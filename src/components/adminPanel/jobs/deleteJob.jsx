import React from 'react';
import {useDispatch} from "react-redux";
import {DeleteSingleJob} from "../../../redux/actions/jobs/jobs";

const DeleteJob = ({close, data,title}) => {

    const dispatch=useDispatch()

    const handleSuccess = () => {
        dispatch(DeleteSingleJob(data.id))
        close()
    }

    return (
        <div className="job__modal">
            <h4>{title}</h4>
            <p className="mt-0">آیا میخواهید شغل {data.name} را حذف کنید؟ </p>
            <div className="mt-5">
                <button onClick={handleSuccess} className="btn btn-success">ثبت</button>
                <button onClick={close} className="btn btn-danger ">بستن</button>
            </div>
        </div>
    );
};

export default DeleteJob;