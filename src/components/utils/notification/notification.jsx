import React, {useEffect} from 'react';
import HandlePagination from "../pagination/handlePagination";
import {useDispatch, useSelector} from "react-redux";
import {GetAllPost} from "../../../redux/actions/post";
import Paginate from "../pagination";
import ReactHtmlParser, {convertNodeToElement, processNodes} from "react-html-parser";
import _ from "lodash";
import NoInfo from "../noinfoTabel/noInfo";

const Notification = () => {

    const selector = useSelector(state => state.postReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllPost(currPage, "",""))
    }, []);

    const {
        currPage, handleCurrentPage, handleNextPage, handlePrevPage
    } = HandlePagination(GetAllPost);

    function transform(node, index) {
        // return null to block certain elements
        // don't allow <span> elements
        if (node.type === "tag" && node.name === "span") {
            return null;
        }

        // Transform <ul> into <ol>
        // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
        if (node.type === "tag" && node.name === "ul") {
            node.name = "ol";
            return convertNodeToElement(node, index, transform);
        }

        // return an <i> element for every <b>
        // a key must be included for all elements
        if (node.type === "tag" && node.name === "b") {
            return <i key={index}>{processNodes(node.children, transform)}</i>;
        }

        // all links must open in a new window
        if (node.type === "tag" && node.name === "a") {
            node.attribs.target = "_blank";
            return convertNodeToElement(node, index, transform);
        }
    }

    const options = {
        decodeEntities: true,
        transform
    };
    return (
        <>
            <section className="notification">
                {!_.isEmpty(selector) && selector.notifications.map((item, index) => {
                        return (
                            <div key={index} className="notification-card card col-md-7 mx-auto">
                                <div className="notification-content">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <h4 className="notification-title">
                                            <strong>
                                                     {item.title}
                                            </strong>
                                        </h4>
                                        <span>
                                            {item.createAtPersian}
                                        </span>
                                    </div>
                                </div>
                                <div className="nnn">{ReactHtmlParser(item.text, options)}</div>
                            </div>
                        )
                    }
                )}
                {!_.isEmpty(selector) && _.isEmpty(selector.notifications) && <NoInfo/>}
                {
                    (selector.pages && selector.pages > 1) ?
                    <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                              nextPage={handleNextPage}
                              prevPage={handlePrevPage}
                              currentPage={currPage}
                    />:""
                }
            </section>
        </>
    );
};

export default Notification;