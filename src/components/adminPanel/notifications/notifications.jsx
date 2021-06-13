import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paginate from "../../utils/pagination";
import HandlePagination from "../../utils/pagination/handlePagination";
import Modal from "../../utils/modal";
import DeleteNotification from "./deleteNotification";
import AddNotification from "./addNotification";
import {GetAllNotification} from "../../../redux/actions/notification/notification";
import {useHistory, useRouteMatch} from "react-router-dom";
import PanelSearch from "../../utils/panelSearch/panelSearch";
import ShowNotification from "./showNotification";
import _ from "lodash";

const Notification = () => {


    const selector = useSelector(state => state.notificationReducer);
    const dispatch = useDispatch();
    const {url} = useRouteMatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(GetAllNotification(currPage, ""))
    }, []);


    const [open, setOpen] = React.useState(false);

    const [data, setData] = useState("");

    const handleOpen = (data) => {
        setOpen(true);
        setData(data)
    };

    const handleClose = () => {
        setOpen(false);
    };


    const {
        setCurrPage,se, currPage,
        handleCurrentPage, handleNextPage, handlePrevPage, handleFilter, handleSendData
    } = HandlePagination(GetAllNotification);
    const paginate = useMemo(() => {
        return <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                         nextPage={handleNextPage}
                         prevPage={handlePrevPage}
                         currentPage={currPage}
        />
    }, [selector.pages, currPage])

    const handleReceiverNotification = (id) => {
        history.push(url+"/"+id)
    }

    return (
        <div className="notification">
            <div className="card">
                <div className="d-flex table-search flex-wrap">
                    <button className="btn add-btn"
                            onClick={() => handleOpen(<AddNotification close={handleClose}
                                                                       title="افزودن اطلاعیه جدید"/>)}>افزودن اطلاعیه
                        جدید
                    </button>
                     <PanelSearch handleSendData={handleSendData} setCurrPage={setCurrPage}
                                 handleFilter={handleFilter} se={se}/>
                </div>

                <div className="overflow-auto">
<table className="table text-center">
                    <thead>
                    <tr>
                        <th scope="col">ردیف</th>
                        <th scope="col">عنوان اطلاعیه</th>
                        <th scope="col">متن اطلاعیه</th>
                        <th scope="col">تاریخ ارسال</th>
                        <th scope="col">عملیات</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        !_.isEmpty(selector) && selector.notifications.map((notification, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{notification.title}</td>
                                <td>{notification.text}</td>
                                <td>{notification.createAt}</td>
                                <td>

                                    <button onClick={()=>handleReceiverNotification(notification.id)} className="btn btn-primary info">
                                        <span className="iconify delete" data-icon="mdi-account-multiple"
                                              data-inline="false"/>گیرنده ها
                                    </button>

                                    <button onClick={() => handleOpen(<ShowNotification close={handleClose}
                                                                                        data={{id: notification.id}}
                                                                                        title="نمایش اطلاعیه"/>)}
                                            className="btn btn-primary">
                                        <span className="iconify delete" data-icon="mdi-information"
                                              data-inline="false"/>نمایش
                                    </button>
                                    <button onClick={() => handleOpen(<DeleteNotification close={handleClose} data={{
                                        id: notification.id,
                                        name: notification.title
                                    }} title="حذف اطلاعیه"/>)} className="btn btn-danger"><span
                                        className="iconify delete"
                                        data-icon="mdi-delete" data-inline="false"/>حذف
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
                {
                    (selector.pages && selector.pages > 1) ? paginate : ""
                }
            </div>


            {
                open && <Modal showModal={open} close={handleClose} >
                    {data}
                </Modal>
            }
        </div>
    );
};

export default Notification;