import React from 'react'
import "../css/Sidebar.css"

const Sidebar = () => {
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
                <ul className=''>
                    
                    <div className='flex w-[100%] h-[50px] items-center bg-[#1A2334] cursor-pointer'>
                        <div className='w-[5px] h-[100%] bg-white'></div>
                            <div className='flex items-center gap-4 pl-5 pr-5 text-[17px]'>
                                <img src="./assest/checklist.png" className='size-5 ' alt="" />
                                <div className='flex gap-5 items-center '>
                                    <div className='font-[500] text-white'>ĐÁNH GIÁ NHÂN SỰ</div>
                                    <img src="./assest/up-arrow.png" className='size-[14px]' alt="" />
                                </div>
                                
                            </div>
                        
                        </div>            
                    <li>Ngân hàng câu hỏi</li>            
                </ul>
            </div>       
        </div>
    </div>
    
  )
}

export default Sidebar