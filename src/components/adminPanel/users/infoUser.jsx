import React, {useEffect, useState} from 'react';
import {getInfoUser} from "../../../services/council";
import {useHistory, useParams} from "react-router-dom";
import _ from "lodash";


const InfoUser = () => {

    const match = useParams()
    const history = useHistory()
    const [data, setData] = useState({})

    useEffect(() => {
        getData(match.id)
    }, [match.id])

    const getData = async (id) => {
        const {data} = await getInfoUser(id)
        setData(data.data)
    }
    const handleUsersPage = () => {
        history.push("/adminPanel/users")
    }

    return (
        <div className="invited card">
            <div className="d-flex justify-content-end">
                <button onClick={handleUsersPage} className="btn prev-btn text-white">
                    بازگشت به صفحه قبل
                </button>
            </div>
            <section className="data.userInfo">
                <h4>اطلاعات کاربر</h4>
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
                            <th scope="col">تاریخ ایجاد</th>
                        </tr>

                        </thead>
                        <tbody>
                        {!_.isEmpty(data) && <tr>
                            <th scope="row">1</th>
                            <td>{data.userInfo.firstName}</td>
                            <td>{data.userInfo.lastName}</td>
                            <td>{data.userInfo.gender}</td>
                            <td>{data.userInfo.age}</td>
                            <td>{data.userInfo.phone}</td>
                            <td>{data.userInfo.createAt}</td>
                        </tr>}
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="invited">
                <h4>اطلاعات دعوت شده ها</h4>
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
                            <th scope="col">تاریخ ایجاد</th>
                        </tr>

                        </thead>
                        <tbody>
                        {!_.isEmpty(data) && !_.isEmpty(data.invited) && data.invited.map((user, index) => {
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
            </section>
        </div>
    );
};

export default InfoUser;