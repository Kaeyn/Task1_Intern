import { faArrowUp, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from 'react'
import '../css/PageFilter.css'

const PageFilter = ({Data , setCurpageData}) => {
    const [dataLength, setDataLength] = useState(25);
    const [isItemLimitShowed, setIsItemLimitShowed] = useState(false);
    const [itemsLimit, setItemsLimit] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageList, setCurrentPageList] = useState([]);
    const [startPage, setStartPage] = useState(0);
    
    const [totalPage, setTotalPage] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
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
        const startIndex = (currentPage - 1) * itemsLimit
        const endIndex = startIndex + itemsLimit
        setTotalPage(totalPage);
        setStartIndex(startIndex)
        setEndIndex(endIndex)
    }

    const getCurrentPageItems = () =>{
        const items = Data.slice(startIndex, endIndex)
        // setCurpageData(items)
        console.log(items)
    }

    const getPageList = () => {
        const pageList = [];
        for (let i = 1; i <= totalPage; i++) {
            pageList.push(i);
        }
        setCurrentPageList(pageList);
        
        let startPage = 1;
        if(startPage > 2){
            
        }
    };

    const handleItemLimitSelector = () =>{
        setIsItemLimitShowed(!isItemLimitShowed)
    }

    const handleListItemLimitSelected = (item) =>{
        setIsItemLimitShowed(item);
        setItemsLimit(item)
        const tempList = origLimitList.filter((limit) => limit != item)
        setlimitList(tempList);  
        handleItemLimitSelector(); 
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

    useEffect(() =>{
        setDataLength(Data)
    },[Data])

    useEffect(() =>{
        getTotalPage();
    },[itemsLimit])

    useEffect(() =>{
        getCurrentPageItems();
    },[currentPage])
    
  return (
    <div className='w-[100%] h-[100%] flex justify-between'>
        <div className='w-[50%] h-[100%] flex gap-1 pl-[8px]'>
            <div className='w-[20vh] self-center'>Hiển thị mỗi trang</div>
            <div className='w-[100%] flex'>
                <div className='w-[70px] flex self-center justify-center items-center gap-2 hover:bg-[#F5F6F8] cursor-pointer pt-[6px] pb-[6px]' onClick={() => handleItemLimitSelector()}>
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
            {currentPageList.map((page, index) => (
                <div key={index}>
                    <div className='pagination-button' onClick={() => goToPage(1)} disabled={currentPage === 1}>
                        Đầu
                    </div>
                    
                    <div className='' onClick={prevPage()} disabled={currentPage === 1}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    {currentPageList[0] > 1 ? 
                    <div className=''>
                        ...
                    </div>: ""}
                    
                    <div className='' onClick={() => goToPage(page)}>
                        {page}
                    </div>
                    {currentPageList.endIndex < totalPage ?
                    <div className=''>
                        ...
                    </div>: ""} 
                    <div className='' onClick={nextPage()} disabled={currentPage === totalPage}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                    
                    <div className='pagination-button' onClick={() => goToPage(totalPage)} disabled={currentPage === totalPage}>
                        Cuối
                    </div>
            </div>
            ))}
                
            </div>
    </div>
  )
}

export default PageFilter