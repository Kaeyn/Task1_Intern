import { faArrowUp, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from 'react'
import '../css/PageFilter.css'

const PageFilter = ({Data , setCurpageData, originData, setIsPageFilter, contentIsFilter}) => {
    const [isItemLimitShowed, setIsItemLimitShowed] = useState(false);
    const [itemsLimit, setItemsLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageList, setCurrentPageList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [prevState, setPrevState] = useState(true);
    const origLimitList = [5, 50, 75, 100]
    const [limitList, setlimitList] = useState([
        5, 75, 100
    ])
    const Icon16px = ({ classIcon, color }) => {
        const iconSize = {
            width: "16px",
            height: "16px",
            color: color,
            cursor: "pointer"
        };
        return (
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        )
    }
    

    const getTotalPage = () =>{
        const totalPage = Math.ceil(Data.length / itemsLimit)
        setTotalPage(totalPage);
        getCurrentPageItems();
    }

    const getCurrentPageItems = () =>{
        const startIndex = (currentPage - 1) * itemsLimit;
        const endIndex = Math.min(startIndex + itemsLimit, Data.length);
        const currentPageItems = Data.slice(startIndex, endIndex);
        setCurpageData(currentPageItems)
        setPrevState(!prevState)
        setIsPageFilter(!prevState)    
        console.log(currentPage)
        console.log(startIndex)
        console.log(endIndex)
        console.log(currentPageItems)
    }

    const getPageList = (totalPage) => {
        const pageList = [];
        for (let i = 1; i <= totalPage; i++) {
            pageList.push(i);
        }

        setCurrentPageList(pageList);
        
    };

    

    const handleListItemLimitSelected = (item) =>{
        setIsItemLimitShowed(item);
        setItemsLimit(item)
        const tempList = origLimitList.filter((limit) => limit != item)
        setlimitList(tempList);  
        handleItemLimitSelector(); 
    }

    const handleItemLimitSelector = () =>{
        setIsItemLimitShowed(!isItemLimitShowed)
    }

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const generatePaginationButtons = () => {
        console.log("current Total Page: " + totalPage)
        const paginationButtons = [];
        // paginationButtons.push(
        //     <div key={i} className={`flex w-[25px] h-[33px] bg-red-500 justify-center items-center rounded-[3px] ${currentPage === i ? 'bg-gray-400' : ''}`} onClick={() => goToPage(i)}>
        //         {i}
        //     </div>
        // );

        // <div key={index} className='flex w-[25px] h-[33px] bg-red-500 justify-center items-center rounded-[3px]' onClick={() => goToPage(page)}>
        //                 {page === 1 && currentPage > 3 ? "..." : page} 
        //             </div>
        if(totalPage == 1){
            paginationButtons.push(
                <div key={1} className={`flex w-[25px] h-[33px]  justify-center items-center rounded-[3px] cursor-pointer ${currentPage === 1 ? 'bg-gray-400 text-[white]' : ''}`} onClick={() => goToPage(1)}>
                    {1}
                </div>
            )
            
        }
        else if(totalPage <= 3){
            for (let i = 1; i <= totalPage; i++) {
                paginationButtons.push(
                    <div key={i} className={`flex w-[25px] h-[33px]  justify-center items-center rounded-[3px] cursor-pointer ${currentPage === i ? 'bg-gray-400' : ''}`} onClick={() => goToPage(i)}>
                        {i}
                    </div>
                )             
            }            
        }else {
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPage, currentPage + 1);

            if (currentPage >= 3) {
                paginationButtons.push(
                    <div key={'leftEllipsis'} className='flex w-[25px] h-[33px] justify-center items-center rounded-[3px] cursor-pointer' onClick={() => goToPage(currentPage - 2)}>
                        ...
                    </div>
                );
            }
            // else{
            //     paginationButtons.push(
            //         <div key={'leftEllipsis'} className='flex w-[25px] h-[33px] bg-red-500 justify-center items-center rounded-[3px]' disabled>
            //             ...
            //         </div>
            //     );
            // }
            
            if(currentPage == 1){
                endPage = Math.min(totalPage, currentPage + 2);
            }

            if(currentPage == totalPage){
                startPage = Math.max(1, currentPage - 2);
            }
            
    
            for (let i = startPage; i <= endPage; i++) {
                paginationButtons.push(
                    <div key={i} className={`flex w-[25px] h-[33px] justify-center items-center rounded-[3px] cursor-pointer ${currentPage === i ? 'bg-gray-400' : ''}`} onClick={() => goToPage(i)}>
                        {i}
                    </div>
                );
            }
        
            if (currentPage <= totalPage - 2) {
                paginationButtons.push(
                    <div key={'rightEllipsis'} className='flex w-[25px] h-[33px]  justify-center items-center rounded-[3px] cursor-pointer' onClick={() => goToPage(currentPage + 2)}>
                        ...
                    </div>
                );
            }
            
        }
    
        return paginationButtons;
    };
    

    useEffect(() =>{
        getTotalPage();
    },[itemsLimit])

    useEffect(() => { 
        getPageList(totalPage);
    }, [totalPage]);

    useEffect(() => {
        getCurrentPageItems();
    }, [currentPage]);

    useEffect(() =>{
        getTotalPage();
    },[originData])

    useEffect(() =>{
        getTotalPage();
        setCurrentPage(1)
    },[contentIsFilter])

  return (
    <div className='w-[100%] h-[100%] flex justify-between'>
        <div className='w-[50%] h-[100%] flex gap-1 pl-[8px]'>
            <div className='w-[20vh] self-center'>Hiển thị mỗi trang</div>
            <div className='w-[100%] flex'>
                <div className='w-[70px] flex self-center justify-center items-center gap-2 hover:bg-[#F5F6F8] cursor-pointer pt-[6px] pb-[6px]' onClick={handleItemLimitSelector}>
                    <div>{itemsLimit}</div>
                    <Icon16px classIcon={faChevronUp} color={"#959DB3"} />
                </div>
                <div className='w-[80px] h-[59px] relative' >   
                    {isItemLimitShowed ?
                    (
                    <ul className='absolute flex flex-col justify-center w-[70px] shadow-md rounded-[4px] bg-[#FFFFFF] bottom-[50px] right-[80px] ul-parent-child'>
                    {(limitList.sort((a,b) => b - a)).map((limit) => (
                        <li key={limit}><div className='p-[6px] pl-[8px]' onClick={() => handleListItemLimitSelected(limit)}>{limit}</div></li>
                    ))}                                             
                    </ul>
                    ): ""}          
                    
                </div>
 
            </div>
        </div>
        <div className='flex items-center gap-2'>
                    <div className={`flex pagination-button w-[50px] h-[33px] bg-[#F4F5F7] text-[#959DB3] justify-center items-center rounded-[3px]  ${currentPage === 1 ? "": "cursor-pointer"}`} onClick={() => goToPage(1)} disabled={currentPage === 1 ? true : false}>
                        <div>Đầu</div>
                    </div>
                    
                    <div className={`flex w-[25px] h-[33px] bg-[#F4F5F7] text-[#959DB3] justify-center items-center rounded-[3px] ${currentPage === 1 ? "": "cursor-pointer"}`} onClick={prevPage} disabled={currentPage === 1 ? true : false}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    {/* {currentPage > 3? 
                    <div className='flex w-[25px] h-[33px] bg-red-500 justify-center items-center rounded-[3px]'>
                        ...
                    </div>: ""}
                    {currentPageList.map((page, index) => (
                    <div key={index} className='flex w-[25px] h-[33px] bg-red-500 justify-center items-center rounded-[3px]' onClick={() => goToPage(page)}>
                        {page === 1 && currentPage > 3 ? "..." : page} 
                    </div>))} */}
                    {generatePaginationButtons()}
                    {/* {currentPageList[currentPageList.length - 1] < totalPage - 2 ?
                    <div className='flex w-[25px] h-[33px] bg-red-500 justify-center items-center rounded-[3px]'>
                        ...
                    </div>: ""}  */}
                    <div className={`flex w-[25px] h-[33px] bg-[#F4F5F7] text-[#959DB3] justify-center items-center rounded-[3px] ${currentPage === totalPage ? "": "cursor-pointer"}`} onClick={nextPage} disabled={currentPage === totalPage ? true : false}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>                   
                
                    <div className={`pagination-button flex pagination-button w-[50px] h-[33px] bg-[#F4F5F7] text-[#959DB3] justify-center items-center rounded-[3px] ${currentPage === totalPage ? "": "cursor-pointer"}`} onClick={() => goToPage(totalPage)} disabled={currentPage === totalPage ? true : false}>
                        Cuối
                    </div>
                </div>
    </div>
  )
}

export default PageFilter