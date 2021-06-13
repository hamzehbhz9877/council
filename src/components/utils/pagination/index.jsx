import React, {useEffect, useState} from "react";
import Pagination from "./pagination";

const Paginate = ({handleCurrentPage, nextPage, prevPage, pageNumber, currentPage}) => {


    const [arrBtn, setArrBtn] = useState([])

    const totalPage = []

    for (let i = 1; i <= pageNumber; i++) {
        totalPage.push(i)
    }

    useEffect(() => {
        let temp = [...arrBtn]

        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'

        if (totalPage.length < 6) {
            temp = totalPage
        } else if (currentPage >= 1 && currentPage <= 3) {
            temp = [1, 2, 3, 4, dotsInitial, totalPage.length]
        } else if (currentPage === 4) {
            const sliced = totalPage.slice(0, 5)
            temp = [...sliced, dotsInitial, totalPage.length]
        } else if (currentPage > 4 && currentPage < totalPage.length - 2) {
            const sliced1 = totalPage.slice(currentPage - 2, currentPage)
            const sliced2 = totalPage.slice(currentPage, currentPage + 1)
            temp = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, totalPage.length])
        } else if (currentPage > totalPage.length - 3) {
            const sliced = totalPage.slice(totalPage.length - 4)
            temp = ([1, dotsLeft, ...sliced])
        } else if (currentPage === dotsInitial) {
            handleCurrentPage(arrBtn[arrBtn.length - 3] + 1)
        } else if (currentPage === dotsRight) {
            handleCurrentPage(arrBtn[3] + 2)
        } else if (currentPage === dotsLeft) {
            handleCurrentPage(arrBtn[3] - 2)
        }

        setArrBtn(temp)
    }, [currentPage, pageNumber])

    return (
        <div className="rtl d-flex justify-content-center">
            <div className="container my-3">
                <div className="row">
                    <div className="col">
                        <Pagination pageNumber={arrBtn} allPage={pageNumber} handleCurrentPage={handleCurrentPage}
                                    nextPage={nextPage}
                                    prevPage={prevPage}
                                    currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Paginate