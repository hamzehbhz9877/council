import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paginate from "../../utils/pagination";
import HandlePagination from "../../utils/pagination/handlePagination";
import _ from "lodash";
import Modal from "../../utils/modal";
import DeleteDistrict from "./deleteDistrict";
import {GetAllDistrict} from "../../../redux/actions/district/district";
import AddDistrict from "./addDistrict";
import EditDistrict from "./editDistricts";
import PanelSearch from "../../utils/panelSearch/panelSearch";


const District = () => {


    const selector = useSelector(state => state.districtReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllDistrict(currPage, ""))
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
    } = HandlePagination(GetAllDistrict);


    const paginate = useMemo(() => {
        return <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                         nextPage={handleNextPage}
                         prevPage={handlePrevPage}
                         currentPage={currPage}
        />
    }, [currPage,selector.pages])


    return (
        <div className="district">
            <div className="card">
                <div className="d-flex table-search flex-wrap">
                    <button className="btn add-btn" onClick={() => handleOpen(<AddDistrict close={handleClose}
                                                                                                    title="افزودن محله جدید"/>)}>افزودن
                        محله جدید
                    </button>
                     <PanelSearch handleSendData={handleSendData} setCurrPage={setCurrPage}
                                 handleFilter={handleFilter} se={se}/>
                </div>

                <div className="overflow-auto">

<table className="table text-center">
                    <thead>
                    <tr>
                        <th scope="col">ردیف</th>
                        <th scope="col">نام محله</th>
                        <th scope="col">عملیات</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        !_.isEmpty(selector) &&  selector.districts.map((district, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{district.name}</td>
                                <td>
                                    <button onClick={() => handleOpen(<EditDistrict close={handleClose} data={{
                                        id: district.id,
                                        des: district.description,
                                        name: district.name
                                    }} title="ویرایش محله"/>)} className="btn btn-warning"><span
                                        className="iconify edit"
                                        data-icon="mdi-edit"
                                        data-inline="false"/>ویرایش
                                    </button>
                                    <button onClick={() => handleOpen(<DeleteDistrict close={handleClose} data={{
                                        id: district.id,
                                        name: district.name
                                    }} title="حذف محله"/>)} className="btn btn-danger"><span
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

export default District;