import React, { useEffect, useState } from 'react'
import "../css/Sidebar.css"
const Sidebar = ({sidebarData}) => {
    const [isExpanded, setIsExpanded] = useState(false); // State for expansion
    const [fetchedData, setIsFetchedData] = useState(false);
    const [isChildExpanded, setIsChildExpanded] = useState(false);
    const [sidebarList, setSideBarList] = useState([]);
    const handleCategoryClick = () => {
        setIsExpanded(!isExpanded); // Toggle expansion state
        if(isChildExpanded){
            setIsChildExpanded(false);
        }
    };
    const handleChildCategoryClick = () => {
        setIsChildExpanded(!isChildExpanded); // Toggle expansion state
    };

    useEffect(() => {
        setSideBarList(sidebarData)
        console.log(sidebarList)
      }, [sidebarList])
      
  return (
    <div className='w-[100%]'>
        <div className='w-[100%] h-[65px] imgContainer bg-white'>
            <div className='w-[100%] h-[100%] flex justify-center gap-[60px]'>
                <img src="./assest/Hachilogo.png" alt="" className='h-[100%] cursor-pointer' />
                <img src="./assest/down-arrow.png" alt="" className='size-5 self-center cursor-pointer'/>
            </div>
        </div>
        

        <div className='container'>        
            <div className=''>
                {/* {sidebarList && sidebarList.map((data) => (
                    
                ))} */}
                <ul className=''>
                      
                      <div className='flex w-[100%] h-[50px] items-center bg-[#1A2334] cursor-pointer' onClick={() => {handleCategoryClick()}}>
                          <div className={`${isExpanded ? 'bg-[#5CB800]' : ' bg-white'} w-[5px] h-[100%] transition duration-200`}></div>
                              <div className='flex items-center gap-4 pl-5 pr-5 text-[17px]'>
                                  <img src={`${isExpanded ? "./assest/icon_CheckList.png" : "./assest/checklist.png"}`} className={`${isExpanded ? 'size-[20px]' : ' size-[21px]'} transition duration-200`} alt="" />
                                  <div className='flex gap-5 items-center '>
                                      <div className={`${isExpanded ? 'text-[#5CB800]' : ' text-white'} font-[500] transition duration-200`}>ĐÁNH GIÁ NHÂN SỰ</div>
                                      <img  src={`${isExpanded ? "./assest/up-arrow-green.png" : "./assest/up-arrow.png"}`} className={`${isExpanded ? 'transform rotate-180' : ''} transition duration-300 ease-in-out size-[14px]`} alt="" />
                                  </div>
                                  
                              </div>                       
                      </div>            
                      {isExpanded ? 
                          <li>
                              <div className='flex w-[100%] h-[50px] items-center bg-[#1A2334] cursor-pointer' onClick={() => {handleChildCategoryClick()}}>
                              <div className={`${isChildExpanded ? 'opacity-100' : 'opacity-[0.35]' } transition duration-200 bg-white w-[5px] h-[100%]`}></div>
                                  <div className='flex items-center gap-4 pl-5 pr-5 text-[17px]'>
                                      <img src="./assest/question-white.png" className={`${isChildExpanded ? 'opacity-100' : 'opacity-[0.35]'} transition duration-200`} alt="" />
                                      <div className='flex gap-5 items-center '>
                                          <div className={`${isChildExpanded ? 'opacity-100' : 'opacity-[0.35] '} text-white font-[500] transition duration-200`}>Ngân hàng câu hỏi</div>                     
                                      </div>
                                      
                                  </div>                       
                              </div> 
                          </li>
                                        
                        : ""} 
                  </ul>
            </div>       
        </div>
    </div>
    
  )
}

export default Sidebar