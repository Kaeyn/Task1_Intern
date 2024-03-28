import { faArrowUp, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from 'react'
import '../css/PageFilter.css'

const PageFilter = ({Data , setCurpageData, originData, setIsPageFilter, contentIsFilter, baseData, isDelete, isPageChanging, contentIsEmpty}) => {
    const [isItemLimitShowed, setIsItemLimitShowed] = useState(false);
    const [itemsLimit, setItemsLimit] = useState(5);
    const [allItemTotalPage, setAllItemTotalPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageList, setCurrentPageList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [prevState, setPrevState] = useState(true);
    const origLimitList = [5, 25, 50, 100]
    const [limitList, setlimitList] = useState([
        25, 50, 100
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
        let totalPage = 0
        if(isDelete == true){
            totalPage = Math.ceil(baseData.length / itemsLimit)
        }else{
            totalPage = Math.ceil(Data.length / itemsLimit)
        }
        setTotalPage(totalPage);
        getCurrentPageItems();
    }

    const getCurrentPageItems = () =>{
        const startIndex = (currentPage - 1) * itemsLimit;
        let endIndex = 0
        let currentPageItems = []
        if(isDelete == true){
            endIndex = Math.min(startIndex + itemsLimit, baseData.length);
            currentPageItems = baseData.slice(startIndex, endIndex);
        }else{
            endIndex = Math.min(startIndex + itemsLimit, Data.length);
            currentPageItems = Data.slice(startIndex, endIndex);
        }
        setCurpageData(currentPageItems)
        isPageChanging(!prevState)
        setPrevState(!prevState)  
        setIsPageFilter(!prevState)  
    
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
        goToPage(1)
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

        const paginationButtons = [];
        if(totalPage == 1){
            paginationButtons.push(
                <div key={1} className={`flex w-[25px] h-[33px]  justify-center items-center rounded-[3px] cursor-pointer hover-page-child ${currentPage === 1 ? 'bg-gray-400 text-[white]' : ''}`} onClick={() => goToPage(1)}>
                    {1}
                </div>
            )
            
        }
        else if(totalPage <= 3){
            for (let i = 1; i <= totalPage; i++) {
                paginationButtons.push(
                    <div key={i} className={`flex w-[25px] h-[33px]  justify-center items-center rounded-[3px] cursor-pointer hover-page-child ${currentPage === i ? 'bg-gray-400 text-white' : ''}`} onClick={() => goToPage(i)}>
                        {i}
                    </div>
                )             
            }            
        }else {
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPage, currentPage + 1);


            if (currentPage >= 3) {
                if (currentPage == totalPage){
                    paginationButtons.push(
                        <div key={'rightEllipsis'} className='flex w-[25px] h-[33px]  justify-center items-center rounded-[3px] cursor-pointer hover-page-child' onClick={() => goToPage(currentPage - 3)}>
                            ...
                        </div>
                    );
                }else{
                    paginationButtons.push(
                        <div key={'leftEllipsis'} className='flex w-[25px] h-[33px] justify-center items-center rounded-[3px] cursor-pointer hover-page-child' onClick={() => goToPage(currentPage - 2)}>
                            ...
                        </div>
                    );
                }
                
            }       
            
            if(currentPage == 1){
                endPage = Math.min(totalPage, currentPage + 2);
            }

            if(currentPage == totalPage){
                startPage = Math.max(1, currentPage - 2);
            }
            
    
            for (let i = startPage; i <= endPage; i++) {
                paginationButtons.push(
                    <div key={i} className={`flex w-[25px] h-[33px] justify-center items-center rounded-[3px] cursor-pointer hover-page-child ${currentPage === i ? 'bg-[#959DB3] text-white' : ''}`} onClick={() => goToPage(i)}>
                        {i}
                    </div>
                );
            }
            
            
            if (currentPage <= totalPage - 2) {
                if (currentPage == 1){
                    paginationButtons.push(
                        <div key={'rightEllipsis'} className='flex w-[25px] h-[33px]  justify-center items-center rounded-[3px] cursor-pointer hover-page-child' onClick={() => goToPage(currentPage + 3)}>
                            ...
                        </div>
                    );
                }
                else{
                    paginationButtons.push(
                        <div key={'rightEllipsis'} className='flex w-[25px] h-[33px]  justify-center items-center rounded-[3px] cursor-pointer hover-page-child' onClick={() => goToPage(currentPage + 2)}>
                            ...
                        </div>
                    );
                }
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
        setAllItemTotalPage(originData);
    },[originData])

    useEffect(() =>{
        getTotalPage();
        setCurrentPage(1)
    },[contentIsFilter])

    useEffect(() =>{
        getTotalPage();
    },[isDelete, baseData])

    useEffect(() =>{
        goToPage(1)
        console.log("no")
    },[contentIsEmpty])
  return (
    <div className='w-[100%] h-[100%] flex self-end justify-between pl-2 pr-2'>
        <div className='h-[100%] flex justify-between gap-1 pl-[8px] whitespace-nowrap'>
            <div className=' self-center'>Hiển thị mỗi trang</div>
            <div className='flex'>
                <div className='w-[70px] flex self-center justify-center items-center gap-2 hover:bg-[#F5F6F8] cursor-pointer pt-[6px] pb-[6px] rounded' onClick={handleItemLimitSelector}>
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
                    <div className={`flex pagination-button w-[50px] h-[33px] bg-[#F4F5F7] text-[#959DB3] justify-center items-center rounded-[3px] shadow-md  ${currentPage === 1 ? "opacity-70": "cursor-pointer bg-[#FFFFFF] hover-page-child"}`} onClick={() => goToPage(1)} disabled={currentPage === 1 ? true : false}>
                        <div>Đầu</div>
                    </div>
                    
                    <div className={`flex w-[25px] h-[33px] bg-[#F4F5F7] text-[#959DB3] justify-center items-center rounded-[3px] shadow-md ${currentPage === 1 ? "opacity-70": "cursor-pointer bg-[#FFFFFF] hover-page-child"}`} onClick={prevPage} disabled={currentPage === 1 ? true : false}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    {generatePaginationButtons()}           
                    <div className={`flex w-[25px] h-[33px] bg-[#F4F5F7] text-[#959DB3] justify-center items-center rounded-[3px] shadow-md  ${currentPage === totalPage ? "opacity-70": "cursor-pointer bg-[#FFFFFF] hover-page-child"}`} onClick={nextPage} disabled={currentPage === totalPage ? true : false}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>                   
                
                    <div className={`pagination-button flex pagination-button w-[50px] h-[33px] bg-[#F4F5F7] text-[#959DB3] justify-center items-center rounded-[3px] shadow-md ${currentPage === totalPage ? "opacity-70": "cursor-pointer bg-[#FFFFFF] hover-page-child"}`} onClick={() => goToPage(totalPage)} disabled={currentPage === totalPage ? true : false}>
                        Cuối
                    </div>
                </div>
    </div>
  )
}

export default PageFilter