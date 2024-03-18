import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'

const QuestionBank = () => {
  return (
    <div className='Home'>
        <div className='sidebar-header display: flex'>          
            <div className='w-[15%] min-h-[100vh] bg-[#5A6276] pt-[5px]'><Sidebar/></div>
            <div className='w-[85%] min-h-[100vh] bg-[#EDEFF3] p-[5px]'>
                <Content/>
            </div>
            
        </div>
    </div>
  )
}

export default QuestionBank