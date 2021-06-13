import React, {useEffect, useState} from 'react';
import {getSingleUser} from "../../../services/council";

const ShowUser = ({data, title, close}) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [district, setDistrict] = useState("")
    const [job, setJob] = useState("");
    const [createAt, setCreateAt] = useState("");


    useEffect(() => {
        getData(data.id)
    }, [data.id])

    const getData = async (id) => {
        const {data} = await getSingleUser(id)
        setFirstName(data.data.firstName)
        setLastName(data.data.lastName)
        setPhone(data.data.phone)
        setGender(data.data.gender)
        setAge(data.data.age)
        setDistrict(data.data.district)
        setJob(data.data.job)
        setCreateAt(data.data.createAt)
    }


    return (
        <div className="message__modal">
            <div className="d-flex justify-content-between align-items-baseline">
                <h4>{title}</h4>
                <span>{createAt}</span>
            </div>
            <div className="form-group">
                <label htmlFor="">نام</label>
                <input value={firstName} className="form-control" type="text" readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="">نام خانوادگی</label>
                <input value={lastName} className="form-control" type="text" readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="">شماره تلفن</label>
                <input value={phone} className="form-control" type="number" readOnly/>
            </div>

            <div className="form-group">
                <label htmlFor="">جنسیت</label>
                <input value={gender} className="form-control" type="text" readOnly/>
            </div>

            <div className="form-group">
                <label htmlFor="">سن</label>
                <input value={age} className="form-control" type="text" readOnly/>
            </div>

            <div className="form-group">
                <label htmlFor="">محله</label>
                <input value={district} className="form-control" type="text" readOnly/>
            </div>

            <div className="form-group">
                <label htmlFor="">شغل</label>
                <input value={job} className="form-control" type="text" readOnly/>
            </div>


            <div className="mt-5">
                <button onClick={close} className="btn btn-primary ">بستن</button>
            </div>
        </div>
    );
};

export default ShowUser;