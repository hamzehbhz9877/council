import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paginate from "../../utils/pagination";
import HandlePagination from "../../utils/pagination/handlePagination";
import _ from "lodash";
import Modal from "../../utils/modal";
import {GetAllMessage} from "../../../redux/actions/message/message";
import {useHistory, useRouteMatch} from "react-router-dom";
import AddMessage from "./addMessagee";
import PanelSearch from "../../utils/panelSearch/panelSearch";
import ShowMessage from "./showMessage";

const Message = () => {

    const selector = useSelector(state => state.messageReducer);
    const dispatch = useDispatch();
    const {url} = useRouteMatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(GetAllMessage(currPage, ""))
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
        setCurrPage, se, currPage,
        handleCurrentPage, handleNextPage, handlePrevPage, handleFilter, handleSendData
    } = HandlePagination(GetAllMessage);
    const paginate = useMemo(() => {
        return <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                         nextPage={handleNextPage}
                         prevPage={handlePrevPage}
                         currentPage={currPage}
        />
    }, [selector.pages, currPage])

    const handleReceiverMessage = (id) => {
        history.push(url + "/" + id)
    }
    return (
        <div className="message">
            <div className="card">
                <div className="d-flex table-search flex-wrap">
                    <button className="btn add-btn" onClick={() => handleOpen(<AddMessage close={handleClose}
                                                                                          title="افزودن پیامک جدید"/>)}>افزودن
                        پیامک جدید
                    </button>
                    <PanelSearch handleSendData={handleSendData} setCurrPage={setCurrPage}
                                 handleFilter={handleFilter} se={se}/>
                </div>

                <div className="overflow-auto">
                    <table className="table text-center">
                        <thead>
                        <tr>
                            <th scope="col">ردیف</th>
                            <th scope="col">عنوان پیامک</th>
                            <th scope="col">متن پیامک</th>
                            <th scope="col">تاریخ ارسال</th>
                            <th scope="col">هزینه ارسال</th>
                            <th scope="col">عملیات</th>
                        </tr>

                        </thead>
                        <tbody>
                        {
                            !_.isEmpty(selector) && selector.messages.map((message, index) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{message.title}</td>
                                    <td>{message.text}</td>
                                    <td>{message.createAt}</td>
                                    <td>{message.price}</td>
                                    <td>
                                        <button onClick={() => handleReceiverMessage(message.id)}
                                                className="btn btn-primary info">
                                        <span className="iconify delete" data-icon="mdi-account-multiple"
                                              data-inline="false"/>گیرنده ها
                                        </button>
                                        <button onClick={() => handleOpen(<ShowMessage close={handleClose}
                                                                                       data={{id: message.id}}
                                                                                       title="نمایش پیامک"/>)}
                                                className="btn btn-primary">
                                            <span className="iconify delete" data-icon="mdi-information"
                                                  data-inline="false"/>نمایش
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

export default Message;