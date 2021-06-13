import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {EditSinglePrize} from "../../../redux/actions/prize/prize";

const EditPrize = ({title,data,close}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [countInvited, setCountInvited] = useState(0)
    const dispatch = useDispatch()

    useEffect(()=>{
        setName(data.name)
        setDescription(data.des)
        setCountInvited(data.countInvited)
    },[])

    const handleSuccess = (e) => {
        e.preventDefault()
        const state = {
            id:data.id,
            name,
            description,
            countInvited,
            createAt:data.createAt
        }
        dispatch(EditSinglePrize(state,data.id))
        close()
    }

    return (
        <div className="prize__modal">
            <h4>{title}</h4>
            <form onSubmit={handleSuccess}>
                <div className="form-group">
                    <label htmlFor="">نام</label>
                    <input value={name}   className="form-control" onChange={e => setName(e.target.value)} type="text" placeholder="وارد کنید"/>
                </div>
                <div className="form-group">
                    <label htmlFor="">توضیحات</label>
                    <textarea value={description} className="form-control" rows="5" cols="15"
                              onChange={e => setDescription(e.target.value)} placeholder="وارد کنید"/>
                    <div className="form-group">
                        <label htmlFor="">تعداد جایزه</label>
                        <input value={countInvited} className="form-control" onChange={e => setCountInvited(e.target.value)}
                               type="number" placeholder="وارد کنید"/>
                    </div></div>
                <div className="mt-5">
                    <button className="btn btn-success" onClick={handleSuccess} type="submit">ثبت</button>
                    <button onClick={close} className="btn btn-danger ">بستن</button>
                </div>
            </form>
        </div>
    );
};

export default EditPrize;


