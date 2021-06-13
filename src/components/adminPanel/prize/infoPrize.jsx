import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import StatusPrize from "./statusPrize/statusPrize";
import Modal from "../../utils/modal";
import {GetAllPrizeInfo} from "../../../redux/actions/user/statusUser";
import {useDispatch, useSelector} from "react-redux";


const InfoPrize = () => {

    const match = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const selector = useSelector(state => state.userStatusReducer);

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState("");


    const handleOpen = (data) => {
        setOpen(true);
        setData(data)
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(GetAllPrizeInfo(match.id))
    }, [match.id])


    const handlePrizePage = () => {
        history.push("/adminPanel/prize")
    }

    console.log(selector)

    return (
        <div className="invited card">
            <div className="d-flex justify-content-end">
                <button onClick={handlePrizePage} className="btn prev-btn text-white">
                    بازگشت به صفحه قبل
                </button>
            </div>
            <section className="invited">
                <h4>اطلاعات دریافت کننده ها</h4>
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
                        <th scope="col">تعداد دعوت شده ها</th>
                        <th scope="col">وضعیت</th>
                    </tr>

                    </thead>
                    <tbody>
                    {selector.length > 0 && selector.map((prize, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{prize.firstName}</td>
                                <td>{prize.lastName}</td>
                                <td>{prize.gender}</td>
                                <td>{prize.age}</td>
                                <td>{prize.phone}</td>
                                <td>{prize.invitedCount}</td>
                                <td>
                                    <button onClick={() => handleOpen(<StatusPrize close={handleClose} data={{
                                        prizeId: Number(match.id),
                                        userId: prize.id,
                                        name:prize.firstName+" "+prize.lastName
                                    }} title="تغییر وضعیت جایزه"/>)}
                                            className={`btn btn-${prize.status === "تحویل داده شده" ? "success" : "danger"} py-2`}>
                                        {prize.status}
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                </div>
            </section>
            {
                open && <Modal showModal={open} close={handleClose} >
                    {data}
                </Modal>
            }
        </div>
    );
};

export default InfoPrize;