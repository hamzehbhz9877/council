// import React, {useEffect, useState} from 'react';
//
// const Test = () => {
//     const [currentPage, setCurrentPage] = useState(1)
//     const [arrBtn, setArrBtn] = useState([])
//
//     const page = 6;
//
//     const totalPage = []
//
//     for (let i = 1; i <= page; i++) {
//         totalPage.push(i)
//     }
//
//     const handleNext = () => {
//         if (currentPage < totalPage.length)
//             setCurrentPage(currentPage + 1)
//     }
//     const handlePrev = () => {
//         if (currentPage > 1)
//             setCurrentPage(currentPage - 1)
//     }
//
//     const handleGoTo = (to) => {
//         setCurrentPage(to)
//     }
//
//     useEffect(() => {
//         let temp = [...arrBtn]
//
//         const dotInitial = "..."
//         const dotRight = " ..."
//         const dotLeft = "... "
//
//         if(page<6)
//         {
//             temp = totalPage
//         }
//         else if (currentPage >= 1 && currentPage <= 3) {
//             temp = [1, 2, 3, 4, dotInitial, page]
//         } else if (currentPage === 4) {
//             const sliced = totalPage.slice(0, 5)
//             temp = [...sliced, dotInitial, page]
//         } else if (currentPage > 4 && currentPage < page - 2) {
//             const sliced1 = totalPage.slice(currentPage - 2, currentPage)
//             const sliced2 = totalPage.slice(currentPage, currentPage + 1)
//             temp = ([1, dotLeft, ...sliced1, ...sliced2, dotRight, page])
//         } else if (currentPage > page - 3) {
//             const sliced = totalPage.slice(page - 4)
//             temp = ([1, dotInitial, ...sliced])
//         } else if (currentPage === dotInitial) {
//             handleGoTo(arrBtn[arrBtn.length - 3] + 1)
//         } else if (currentPage === dotLeft) {
//             handleGoTo(arrBtn[3] - 2)
//         } else if (currentPage === dotRight) {
//             handleGoTo(arrBtn[3] + 2)
//         }
//         setArrBtn(temp)
//     }, [currentPage])
//
//     return (
//         <div>
//             <button onClick={handlePrev}>prev</button>
//             {arrBtn.map((item, index) => <button onClick={() => handleGoTo(item)}
//                                                  className={`btn ${currentPage === item && "btn-primary"}`}
//                                                  key={index}>{item}</button>)}
//             <button onClick={handleNext}>next</button>
//         </div>
//     );
// };
//
// export default Test;


// import React, { useState, useEffect } from 'react';
//
// function Test({ pages = 8 }) {
//
//      const [currentPage, setCurrentPage] = useState(1)
//
//     //Set number of pages
//     const numberOfPages = []
//     for (let i = 1; i <= pages; i++) {
//         numberOfPages.push(i)
//     }
//
//     // Current active button number
//     const [currentButton, setCurrentButton] = useState(1)
//
//     // Array of buttons what we see on the page
//     const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])
//
//     useEffect(() => {
//         let tempNumberOfPages = [...arrOfCurrButtons]
//
//         let dotsInitial = '...'
//         let dotsLeft = '... '
//         let dotsRight = ' ...'
//
//         if (numberOfPages.length < 6) {
//             tempNumberOfPages = numberOfPages
//         }
//
//         else if (currentButton >= 1 && currentButton <= 3) {
//             tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
//         }
//
//         else if (currentButton === 4) {
//             const sliced = numberOfPages.slice(0, 5)
//             tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
//         }
//
//         else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {               // from 5 to 8 -> (10 - 2)
//             const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5]
//             const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
//             tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) // [1, '...', 4, 5, 6, '...', 10]
//         }
//
//         else if (currentButton > numberOfPages.length - 3) {                 // > 7
//             const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4)
//             tempNumberOfPages = ([1, dotsLeft, ...sliced])
//         }
//
//         else if (currentButton === dotsInitial) {
//             // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
//             // arrOfCurrButtons[3] = 4 + 1 = 5
//             // or
//             // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
//             // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
//             setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1)
//         }
//         else if (currentButton === dotsRight) {
//             setCurrentButton(arrOfCurrButtons[3] + 2)
//         }
//
//         else if (currentButton === dotsLeft) {
//             setCurrentButton(arrOfCurrButtons[3] - 2)
//         }
//
//         setArrOfCurrButtons(tempNumberOfPages)
//         setCurrentPage(currentButton)
//     }, [currentButton])
//
//
//     return (
//         <div className="pagination-container">
//             <a
//
//                 className={`${currentButton === 1 ? 'disabled' : ''}`}
//                 onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
//             >
//                 Prev
//             </a>
//
//             {arrOfCurrButtons.map(((item, index) => {
//                 return <a
//
//                     key={index}
//                     className={`${currentButton === item ? 'active' : ''}`}
//                     onClick={() => setCurrentButton(item)}
//                 >
//                     {item}
//                 </a>
//             }))}
//
//             <a
//
//                 className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
//                 onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
//             >
//                 Next
//             </a>
//         </div>
//     );
// }
//
//
// export default Test

import React from "react"
import * as Yup from "yup"

const Test = () => {


    let schema = Yup.string().matches(/^(09([0-3]|9)[0-9]-?[0-9]{3}-?[0-9]{4})$/,"شماره همراه معتبر نمیباشد");


    const ff=async ()=>{
        console.log( await schema.isValid("0930185832"))
    }

    ff()

    return (
        <div>
        asas
        </div>
    );
};


export default Test;
