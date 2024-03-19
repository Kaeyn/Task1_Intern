import React, { useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import data from'../Model/Data.json'
const QuestionBank = () => {
  const [dataList, setDataList] = useState();
  useEffect(() => {  
    let tempdata = data;  
    setDataList(tempdata);
    console.log(dataList)
  }, [dataList])
  return (
    <div className='Home'>
        <div className='sidebar-header display: flex'>          
            <div className='w-[15%] min-h-[100vh] bg-[#5A6276] '><Sidebar sidebarData={dataList}/></div>
            <div className='w-[85%] min-h-[100vh] bg-[#EDEFF3] p-[5px] flex flex-col'>
              <div className='w-[100%] h-[7%] max-h-[7%] bg-white flex flex-col justify-center'><Header/></div>
                <Content contentData={dataList}/>
            </div>
            
        </div>
    </div>
  )
}

export default QuestionBank