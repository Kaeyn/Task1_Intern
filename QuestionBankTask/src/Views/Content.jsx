import React, { useEffect, useState } from 'react'
import StatusFilter from './StatusFilter'
import DataFilter from './DataFilter'
import DataList from './DataList'


const Content = (contentData) => {
  
  return (
    <div className=' h-[100%]'>
        <div className='w-[100%] h-[8%] max-h-[8%] flex flex-col'><StatusFilter/></div>
        <div className='border-[1px] border-[#BDC2D2] w-[100%]'></div>
        <div className='w-[100%] h-[9%] max-h-[9%] flex pb-[4px]'><DataFilter/></div>
        <div className='border-[1px] border-[#BDC2D2] w-[100%]'></div>
        <div className='w-[100%] h-[76%] max-h-[76%] flex p-[4px]'><DataList/></div>
    </div>      
  )
}

export default Content