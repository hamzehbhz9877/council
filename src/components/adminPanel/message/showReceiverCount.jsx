import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom"
import {getReceiverMessage} from "../../../services/council";
import _ from "lodash";


const ShowReceiverMesssage = () => {

    const match = useParams()

    const history = useHistory()

    const [data, setData] = useState([])

    useEffect(() => {
        receiverCountData(match.id)
    }, [match.id])

    const receiverCountData = async (id) => {
        const {data} = await getReceiverMessage(id)
        setData(data.data)
    }

    const handleMessagePage = () => {
        history.push("/adminPanel/message")
    }

    return (
        <div className="card">
            <div className="d-flex justify-content-end">
                <button onClick={handleMessagePage} className="btn prev-btn text-white">
                    بازگشت به صفحه قبل
                </button>
            </div>
            <section className="receiver-count">
                <h4>اطلاعات گیرنده ها</h4>
                <div className="overflow-auto">
                    <table className="table text-center">
                        <thead>
                        <tr>
                            <th scope="col">ردیف</th>
                            <th scope="col">نام</th>
                            <th scope="col">نام خانوادگی</th>
                            <th scope="col">جنسیت</th>
                            <th scope="col">سن</th>
                            <th scope="col">شماره تلفن</th>
                            <th scope="col">تاریخ ثبت</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!_.isEmpty(data) && data.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.age}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.createAt}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <span>تعداد گیرنده ها: </span>
                    <span>{!_.isEmpty(data) ? data.length : 0}</span>
                </div>
            </section>
        </div>
    );
};

export default ShowReceiverMesssage;