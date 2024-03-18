import React from 'react'
import Header from './Header'
import StatusFilter from './StatusFilter'

const Content = () => {
  return (
    <div>
        <div className='w-[100%] h-[60px] bg-white flex flex-col justify-center'><Header/></div>
        <div className='w-[100%] h-[80px] flex flex-col'><StatusFilter/></div>
    </div>
    
    
  )
}

export default Content