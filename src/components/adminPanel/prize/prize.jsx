import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paginate from "../../utils/pagination";
import HandlePagination from "../../utils/pagination/handlePagination";
import Modal from "../../utils/modal";
import DeletePrize from "./deletePrize";
import AddPrize from "./addPrize";
import EditPrize from "./editPrize";
import {GetAllPrize} from "../../../redux/actions/prize/prize";
import PanelSearch from "../../utils/panelSearch/panelSearch";
import ShowPrize from "./showPrize";
import _ from "lodash";
import {useHistory, useRouteMatch} from "react-router-dom";

const Prize = () => {

    const selector = useSelector(state => state.prizeReducer);
    const dispatch = useDispatch();
    const {url} = useRouteMatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(GetAllPrize(currPage, ""))
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
    const handleInfoPrize = (id) => {
        history.push(url + "/" + id)
    }

    const {
        setCurrPage,se, currPage,
        handleCurrentPage, handleNextPage, handlePrevPage, handleFilter, handleSendData
    } = HandlePagination(GetAllPrize);
    const paginate = useMemo(() => {
        return <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                         nextPage={handleNextPage}
                         prevPage={handlePrevPage}
                         currentPage={currPage}
        />
    }, [selector.pages, currPage])

    return (
        <div className="prize">
            <div className="card">
                <div className="d-flex table-search flex-wrap">
                    <button className="btn add-btn"
                            onClick={() => handleOpen(<AddPrize close={handleClose} title="افزودن جایزه جدید"/>)}>افزودن
                        جایزه جدید
                    </button>
                     <PanelSearch handleSendData={handleSendData} setCurrPage={setCurrPage}
                                 handleFilter={handleFilter} se={se}/>
                </div>

                <div className="overflow-auto">
                <table className="table text-center">
                    <thead>
                    <tr>
                        <th scope="col">ردیف</th>
                        <th scope="col">عنوان جایزه</th>
                        <th scope="col">توضیحات</th>
                        <th scope="col">تاریخ ثبت</th>
                        <th scope="col">تعداد جایزه</th>
                        <th scope="col">عملیات</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        !_.isEmpty(selector) && selector.prizes.map((prize, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{prize.name}</td>
                                <td>{prize.description}</td>
                                <td>{prize.createAt}</td>
                                <td>{prize.countInvited}</td>
                                <td>

                                    <button onClick={() => handleInfoPrize(prize.id)}
                                            className="btn btn-primary info">
                                        <span className="iconify delete" data-icon="mdi-account-multiple"
                                              data-inline="false"/>گیرنده ها
                                    </button>

                                    <button onClick={() => handleOpen(<ShowPrize close={handleClose}
                                                                                 data={{id: prize.id}}
                                                                                 title="نمایش اطلاعیه"/>)}
                                            className="btn btn-primary">
                                        <span className="iconify delete" data-icon="mdi-information"
                                              data-inline="false"/>نمایش
                                    </button>
                                    <button onClick={() => handleOpen(<EditPrize close={handleClose} data={{
                                        id: prize.id,
                                        des: prize.description,
                                        name: prize.name,
                                        countInvited: prize.countInvited,
                                        createAt: prize.createAt
                                    }} title="ویرایش جایزه"/>)} className="btn btn-warning"><span
                                        className="iconify edit"
                                        data-icon="mdi-edit"
                                        data-inline="false"/>ویرایش
                                    </button>
                                    <button onClick={() => handleOpen(<DeletePrize close={handleClose} data={{
                                        id: prize.id,
                                        name: prize.name
                                    }} title="حذف جایزه"/>)} className="btn btn-danger"><span
                                        className="iconify delete"
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


export default Prize;