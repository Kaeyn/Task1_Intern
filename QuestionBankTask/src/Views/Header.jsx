import React, { useState } from 'react'
import "../css/Header.css"
import { useEffect } from 'react';

const Header = ({setSelectedCate}) => {
    const [selected, setSelected] = useState(6);
    const selectCategory = (index) =>{
        const tempSelected = selected;
        if(index != tempSelected){
            setSelected(index)
            setSelectedCate(index)
        }
    }
    useEffect(() => {
        setSelected(6)
      }, [])
    
  return (
    
    <div className='justify-center h-[100%]'>
        <div className='flex justify-between shadow-lg h-[100%]'>
            <div className='self-center h-[100%]'>
                <ul className='flex items-center gap-5 px-5 h-[100%]'>                          
                        <li className='text-[#BBBBBB] cursor-pointer' onClick={() => selectCategory(0)}>------------</li>
                        <div className='w-[2px] h-[30px] bg-[#C4C4C4] rounded-[3px]'></div>
                        <li className='text-[#BBBBBB] cursor-pointer' onClick={() => selectCategory(1)}>------------</li>
                        <div className='w-[2px] h-[30px] bg-[#C4C4C4] rounded-[3px]'></div>
                        <li className='text-[#BBBBBB] cursor-pointer' onClick={() => selectCategory(2)}>------------</li>
                        <div className='w-[2px] h-[30px] bg-[#C4C4C4] rounded-[3px]'></div>
                        <li className='text-[#BBBBBB] cursor-pointer' onClick={() => selectCategory(3)}>------------</li>
                        <div className='w-[2px] h-[30px] bg-[#C4C4C4] rounded-[3px]'></div>
                        <li className='text-[#BBBBBB] cursor-pointer' onClick={() => selectCategory(4)}>------------</li>
                        <div className='w-[2px] h-[30px] bg-[#C4C4C4] rounded-[3px]'></div>
                        <li className='text-[#BBBBBB] cursor-pointer' onClick={() => selectCategory(5)}>------------</li>
                        <div className='w-[2px] h-[30px] bg-[#C4C4C4] rounded-[3px]'></div>
                        <li className='text-[#BBBBBB] cursor-pointer' onClick={() => selectCategory(6)}>------------</li>
                        <div className='w-[2px] h-[30px] bg-[#C4C4C4] rounded-[3px]'></div>
                        <li  className='relative h-[100%] flex flex-col justify-center cursor-pointer' title='NHÂN SỰ' onClick={() => selectCategory(7)}>{selected === 7 ? 
                        (<div className=''><div className='text-[#008000] font-[600]'>NHÂN SỰ</div> <div className='absolute bg-[#008000] w-[80px] h-[5px] rounded-[3px] bottom-0 '></div></div>) : (<div className='text-[#BBBBBB] font-[600]'>NHÂN SỰ</div>)}</li>
                </ul>
            </div>
            <div className='self-center'>
                <ul className='flex items-center gap-7 pr-7'> 
                        <li><img src="./assest/searchIcon.png" alt="" className='size-[19px] cursor-pointer' title='Search'  /></li>
                        <li><img src="./assest/Notification.png" alt="" className='size-[20px] cursor-pointer' title='Notification'/></li>
                        <li><img src="./assest/Duck_Face.png" alt="" className='size-[35px] rounded-[30px] cursor-pointer' title='Profile'/></li>
                </ul>    
            </div>
                          
            </div>
    </div>
    
  )
}

export default Header