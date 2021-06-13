import React, {useEffect, useState} from 'react';
import {getSinglePrize} from "../../../services/council";

const ShowPrize = ({close, data, title}) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [countInvited, setCountInvited] = useState(0)


    useEffect(() => {
        getData(data.id)
    }, [data.id])

    const getData = async (id) => {
        const {data} = await getSinglePrize(id)
        setName(data.data.name)
        setDescription(data.data.description)
        setCountInvited(data.data.countInvited)
    }

    return (
        <div className="prize__modal">
            <h4>{title}</h4>
            <div className="form-group">
                <label htmlFor="">نام</label>
                <input value={name} className="form-control" type="text"
                       readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="">توضیحات</label>
                <textarea value={description} className="form-control" rows="5" cols="15"
                          readOnly/>
                <div className="form-group">
                    <label htmlFor="">تعداد جایزه</label>
                    <input value={countInvited} className="form-control"
                           type="number" readOnly/>
                </div>
            </div>
            <div className="mt-5">
                <button onClick={close} className="btn btn-primary ">بستن</button>
            </div>
        </div>
    );
};

export default ShowPrize;