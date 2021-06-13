import React, {useEffect, useState} from 'react';
import {getSingleNotification} from "../../../services/council";


const ShowNotification = ({data, close, title}) => {

    const[titleRes,setTitleRes]=useState("")
    const[text,setText]=useState("")
    const[createAt,setCreateAt]=useState("")


    useEffect(() => {
        getData(data.id)
    }, [data.id])

    const getData = async (id) => {
        const {data} = await getSingleNotification(id)
        setTitleRes(data.data.title)
        setText(data.data.text)
        setCreateAt(data.data.createAt)
    }

    return (
        <div className="notification__modal">
            <div className="d-flex justify-content-between align-items-baseline">
                <h4>{title}</h4>
                <span>{createAt}</span>
            </div>

            <div className="form-group">
                <label htmlFor="">عنوان اطلاعیه</label>
                <input value={titleRes} className="form-control" type="text"
                       placeholder="وارد کنید" readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="">متن اطلاعیه</label>
                <textarea value={text} className="form-control" rows="5" cols="15" placeholder="وارد کنید" readOnly/>
            </div>
            <div className="mt-5">
                <button onClick={close} className="btn btn-primary ">بستن</button>
            </div>
        </div>
    )
};

export default ShowNotification;