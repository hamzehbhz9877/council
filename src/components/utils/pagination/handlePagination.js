import {useState} from 'react';
import {useDispatch} from "react-redux";

const HandlePagination = (event) => {


    const [currPage, setCurrPage] = useState(1);
    const [se, setSe] = useState("");


    const dispatch = useDispatch();

    const handleCurrentPage = (page) => {
        window.scrollTo(0, 0);
        dispatch(event(page, se));
        setCurrPage(page)
    };

    const handleNextPage = () => {
        window.scrollTo(0, 0);
        dispatch(event(currPage + 1, se));
        setCurrPage(currPage + 1)
    };

    const handlePrevPage = () => {
        window.scrollTo(0, 0);
        dispatch(event(currPage - 1, se));
        setCurrPage(currPage - 1)
    };

    const handleFilter = () => {
        dispatch(event(currPage, ""));
        setCurrPage(1);
        setSe("")
    };

    const handleSendData = (values) => {
        setSe(values.search);
        dispatch(event(currPage, values.search));
    };


    return {
        se, setSe, currPage, handleCurrentPage,setCurrPage,
        handleNextPage, handlePrevPage, handleFilter, handleSendData
    };
};

export default HandlePagination;