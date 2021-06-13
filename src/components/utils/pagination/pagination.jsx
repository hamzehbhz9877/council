import React from "react";


const Pagination = ({pageNumber, handleCurrentPage, currentPage, nextPage, prevPage,allPage}) => {

    var rows = pageNumber.map( ( item, index ) =>
        <li key={index} id={index} className={`page-item ${currentPage === item? "active-link" : ""}`} onClick={() => handleCurrentPage(item)} aria-current="page-number">
            <span  className="page-link">
                {item}
            </span>
        </li>
    );

    return (
        <div>
            <nav >
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                        onClick={prevPage}>
                        <span className="page-link"
                           tabIndex={currentPage === 1 ? "-1" : "0"} aria-current="prev-page"
                           aria-disabled={currentPage === 1}>قبلی</span>
                    </li>
                    {rows}
                    <li className={`page-item ${currentPage === allPage ? "disabled" : ""}`}
                        onClick={nextPage} aria-current="next-page">
                        <span className="page-link">بعدی</span>
                    </li>
                </ul>
            </nav>

        </div>
    )
};
export default Pagination