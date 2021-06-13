import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paginate from "../../utils/pagination";
import HandlePagination from "../../utils/pagination/handlePagination";
import Modal from "../../utils/modal";
import DeleteUser from "./deleteUser";
import AddUser from "./addUser";
import EditUser from "./editUser";
import PanelSearch from "../../utils/panelSearch/panelSearch";
import {GetAllUser} from "../../../redux/actions/user/user";
import ShowUser from "./showUser";
import {useHistory, useRouteMatch} from "react-router-dom";
import _ from "lodash";

const User = () => {

    const selector = useSelector(state => state.userReducer);
    const dispatch = useDispatch();


    const {url} = useRouteMatch()
    const history = useHistory()


    useEffect(() => {
        dispatch(GetAllUser(currPage, ""))
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

    const handleInfoUser = (id) => {
        history.push(url + "/" + id)
    }


    const {
        setCurrPage, se, currPage,
        handleCurrentPage, handleNextPage, handlePrevPage, handleFilter, handleSendData
    } = HandlePagination(GetAllUser);


    const paginate = useMemo(() => {
        return <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                         nextPage={handleNextPage}
                         prevPage={handlePrevPage}
                         currentPage={currPage}
        />
    }, [selector.pages, currPage])


    return (
        <div className="user">
            <div className="card">
                <div className="d-flex table-search flex-wrap">
                    <button className="btn add-btn"
                            onClick={() => handleOpen(<AddUser close={handleClose} title="افزودن کاربر جدید"/>)}>افزودن
                        کاربر
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
                            <th scope="col">نام</th>
                            <th scope="col">نام خانوادگی</th>
                            <th scope="col">جنسیت</th>
                            <th scope="col">سن</th>
                            <th scope="col">شماره تلفن</th>
                            <th scope="col">تاریخ ایجاد</th>
                            <th scope="col">عملیات</th>
                        </tr>

                        </thead>
                        <tbody>
                        {
                            !_.isEmpty(selector) && selector.users.map((user, index) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.age}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.createAt}</td>
                                    <td>

                                        <button onClick={() => handleInfoUser(user.id)}
                                                className="btn btn-primary info">

                                        <span className="iconify delete" data-icon="mdi-account-multiple"
                                              data-inline="false"/>دعوت شده ها
                                        </button>
                                        <button onClick={() => handleOpen(<ShowUser close={handleClose}
                                                                                    data={{id: user.id}}
                                                                                    title="نمایش کاربر"/>)}
                                                className="btn btn-primary">
                                        <span className="iconify delete" data-icon="mdi-information"
                                              data-inline="false"/>نمایش
                                        </button>

                                        <button onClick={() => handleOpen(<EditUser close={handleClose} data={{
                                            id: user.id,
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            gender: user.gender,
                                            age: user.age,
                                            phone: user.phone,
                                            jobId: user.jobId,
                                            districtId: user.districtId,
                                            createAt: user.createAt

                                        }} title="ویرایش کاربر"/>)} className="btn btn-warning"><span
                                            className="iconify edit"
                                            data-icon="mdi-edit"
                                            data-inline="false"/>ویرایش
                                        </button>

                                        <button onClick={() => handleOpen(<DeleteUser close={handleClose}
                                                                                      data={{
                                                                                          id: user.id,
                                                                                          name: user.firstName + " " + user.lastName
                                                                                      }}
                                                                                      title="حذف کاربر"/>)}
                                                className="btn btn-danger"><span className="iconify delete"
                                                                                 data-icon="mdi-delete"
                                                                                 data-inline="false"/>حذف
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

export default User;