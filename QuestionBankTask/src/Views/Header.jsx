import React, { useState } from 'react'
import "../css/Header.css"
import { useEffect } from 'react';

const Header = ({setSelectedCate, Data}) => {
    const [selected, setSelected] = useState("M.001");
    const [modules, setModules] = useState([])

    const selectCategory = (index) =>{
        const tempSelected = selected;
        if(index != tempSelected){
            setSelected(index)
            setSelectedCate(index)
        }
    }
    const getModules = () =>{
        const moduleData = Data?.Module || [];
        setModules(moduleData)
        selectCategory("M.008")
    }
    useEffect(() => {
        getModules()
      }, [Data])

    
    
  return (
    <div className='justify-center w-[100%] h-[6.5vh]'>
        <div className='flex justify-between shadow-lg h-[100%] whitespace-nowrap'>
            <div className='self-center h-[100%] w-[80%] overflow-x-auto overflow-y-hidden'>
                <ul className='flex items-center h-[100%]'>
                    {modules.map((data, index) =>{
                        return(
                        <div className='flex items-center gap-5 pl-5 h-[100%] header_module_hover' key={index} >
                            <div className={`w-[2px] h-[30px] bg-[#C4C4C4] rounded-[3px] ${index == 0 ? "hidden" : ""}`}></div>
                            <li  className='relative h-[100%] flex flex-col justify-center cursor-pointer module' title={data.moduleName} onClick={() => selectCategory(data.id)}>
                                <div className=''>
                                    <div className={`font-[600] ${selected == data.id ? "text-[#008000]": "text-[#BBBBBB]"} module_text`}>{data.moduleName}</div>
                                    <div className={`absolute bg-[#008000] w-[80px] h-[5px] rounded-[3px] bottom-0 ${selected == data.id ? "": "hidden"}`}></div>
                                </div>
                                {/* (<div className='text-[#008000] font-[600]'>{data.moduleName}</div>)  */}
                            </li>
                        </div>          
                        );       
                    })}                     
                        {/* <li className='text-[#BBBBBB] cursor-pointer' onClick={() => selectCategory(0)}>------------</li>
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
                        (<div className=''><div className='text-[#008000] font-[600] '>NHÂN SỰ</div> <div className='absolute bg-[#008000] w-[80px] h-[5px] rounded-[3px] bottom-0 '></div></div>) : (<div className='text-[#BBBBBB] font-[600]'>NHÂN SỰ</div>)}</li> */}
                </ul>
            </div>
            <div className='self-center h-[100%] w-[20%]'>
                <ul className='flex items-center justify-end gap-7 pr-7 h-[100%]'> 
                        <li><img src="./assest/searchIcon.png" alt="" className='size-[2vh] cursor-pointer' title='Search'  /></li>
                        <li className='relative h-[100%] flex'>
                            <img src="./assest/Notification.png" alt="" className='size-[2vh] cursor-pointer self-center' title='Notification'/>
                            <div className='bg-[#F1802E] w-[1.8vh] h-[1.8vh] absolute top-[1.6vh] left-[0.8vh] rounded-full flex items-center justify-center self-center'>
                                <div className='text-white text-[1vh]' title='15 Noti'>15</div>
                            </div>
                            </li>
                        <li className='relative h-[100%] flex'>
                            <img src="./assest/Duck_Face.png" alt="" className='size-[3vh] rounded-[30px] cursor-pointer self-center' title='Profile'/>
                            <div className='bg-[#05D103] w-[1vh] h-[1vh] absolute top-[4vh] left-[2vh] rounded-full self-center' title='Online'>
                            </div>
                        </li>
                </ul>    
            </div>
                          
            </div>
    </div>
    
  )
}

export default Header