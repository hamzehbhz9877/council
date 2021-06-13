import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paginate from "../../utils/pagination";
import HandlePagination from "../../utils/pagination/handlePagination";
import Modal from "../../utils/modal";
import DeleteJob from "./deleteJob";
import AddJob from "./addJob";
import EditJob from "./editJob";
import {GetAllJob} from "../../../redux/actions/jobs/jobs";
import PanelSearch from "../../utils/panelSearch/panelSearch";
import _ from "lodash";

const Job = () => {

    const selector = useSelector(state => state.jobReducer);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(GetAllJob(currPage, ""))
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
        setCurrPage,se,currPage,
        handleCurrentPage, handleNextPage, handlePrevPage, handleFilter, handleSendData
    } = HandlePagination(GetAllJob);


    const paginate = useMemo(() => {
        return <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                         nextPage={handleNextPage}
                         prevPage={handlePrevPage}
                         currentPage={currPage}
        />
    }, [currPage,selector.pages])


    return (
        <div className="job">
            <div className="card">
                <div className="d-flex table-search flex-wrap">
                    <button className="btn add-btn"
                            onClick={() => handleOpen(<AddJob close={handleClose} title="افزودن شغل جدید"/>)}>افزودن شغل
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
                            <th scope="col">نام شغل</th>
                            <th scope="col">عملیات</th>
                        </tr>

                        </thead>
                        <tbody>
                        {
                            !_.isEmpty(selector) && selector.jobs.map((job, index) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{job.name}</td>
                                    <td>
                                        <button onClick={() => handleOpen(<EditJob close={handleClose} data={{
                                            id: job.id,
                                            des: job.description,
                                            name: job.name
                                        }} title="ویرایش شغل"/>)} className="btn btn-warning"><span
                                            className="iconify edit"
                                            data-icon="mdi-edit"
                                            data-inline="false"/>ویرایش
                                        </button>
                                        <button onClick={() => handleOpen(<DeleteJob close={handleClose}
                                                                                     data={{id: job.id, name: job.name}}
                                                                                     title="حذف شغل"/>)}
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

export default Job;