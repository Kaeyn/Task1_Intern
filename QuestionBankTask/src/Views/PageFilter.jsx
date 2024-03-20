import { faArrowUp, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from 'react'
import '../css/PageFilter.css'

const PageFilter = ({Data , curpageData}) => {
    const [dataLength, setDataLength] = useState(25);
    const [isItemLimitShowed, setIsItemLimitShowed] = useState(false);
    const [itemsLimit, setItemsLimit] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
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
    const limitList = [
        25, 50, 75, 100
    ]

    const totalPage = Math.ceil(Data.length / itemsLimit)
    const startIndex = (currentPage - 1) * itemsLimit
    const endIndex = startIndex + itemsLimit
    const currentPageItems = Data.slice(startIndex, endIndex)
    const handleItemLimitSelector = () =>{
        setIsItemLimitShowed(!isItemLimitShowed)
    }

    const nextPage = () =>{
        setCurrentPage()
    }

    const prevPage = () =>{
        
    }

    useEffect(() =>{
        setDataLength(Data)
    },[Data])
    
  return (
    <div className='w-[100%] h-[100%] flex justify-between'>
        <div className='w-[50%] h-[100%] flex gap-1 pl-[8px]'>
            <div className='w-[20vh] self-center'>Hiển thị mỗi trang</div>
            <div className='w-[100%] flex'>
                <div className='w-[70px] flex self-center justify-center items-center gap-2 hover:bg-[#F5F6F8] cursor-pointer pt-[6px] pb-[6px]' onClick={() => handleItemLimitSelector()}>
                    <div>100</div>
                    <Icon16px classIcon={faChevronUp} color={"#959DB3"} />
                </div>
                <div className='w-[80px] h-[59px] relative' >   
                    {isItemLimitShowed ?
                    (
                    <ul className='absolute flex flex-col justify-center w-[70px] shadow-md rounded-[4px] bg-[#FFFFFF] bottom-[50px] right-[80px] ul-parent-child'>
                    {limitList.map((limit) => (
                        <li key={limit}><div className='p-[6px] pl-[8px]'>{limit}</div></li>
                    ))}                                             
                    </ul>
                    ): ""}          
                    
                </div>
 
            </div>
        </div>
        <div>
            NextPage
        </div>
    </div>
  )
}

export default PageFilter