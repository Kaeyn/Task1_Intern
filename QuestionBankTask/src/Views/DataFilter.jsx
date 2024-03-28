import React, { useState } from 'react'
import '../css/DataList.css'
const DataFilter = ({searchInput, resetContent}) => {
  const [resetState, setResetState] = useState(false)
  const handleSearch = () =>{
    const input = document.getElementById('inputbox');
    const searchText = input.value.trim();
    searchInput(searchText);
  }

  const handleEnterPressed = (event) =>{
    if (event.key === 'Enter') {
      handleSearch();
    }
  }
  const resetFilter =() =>{
    const inputBox = document.getElementById('inputbox');
    inputBox.value = "";
    searchInput("");
    resetContent(!resetState);
    setResetState(!resetState)
  }
  
  
  return (
    <div className=' h-[100%] pl-[6px] pr-[6px]'>
        <div className='h-[100%] grid grid-cols-5 gap-8'>
          <div className='h-[100%] col-span-1'>
              <div className='h-[100%] flex flex-col justify-between'>
                  <div className='flex gap-2' >
                    <img src="./assest/filter.png" alt="" className='size-[23px] max-h-[23px]'/>
                    <div className='font-[600] text-[#0c0c0c]'>LỌC DỮ LIỆU</div>
                  </div>
                  <div className='flex gap-2'>
                    <div className='w-[13px] h-[24px]'></div>
                    <div className='text-[#008000] text-[15px] font-[500] underline cursor-pointer'onClick={() => {resetFilter()}} title={"Reset bộ lọc"}>Reset bộ lọc</div></div>
              </div>
          </div>
          <div className=' h-[100%] col-span-4'>
              <div className=' h-[100%] flex flex-col justify-between'>
                  <div className='text-[#959DB3] font-[600]' >Tìm kiếm</div>
                  <div className=''>
                    <div className='relative flex '>
                        <div className='w-[34px]  flex justify-center bg-white rounded-s-[4px] shadow-bottom-left'><img src="./assest/searchIcon.png" alt="" className='absolute size-[15px] self-center'/></div>
                        <div className=' h-[34px] flex gap-2'>
                          <div className='w-[400px] h-[100%] col-span-6 shadow-bottom-right'><input id='inputbox' type="text" placeholder='Tìm theo mã và câu hỏi' className='w-[100%] h-[100%] rounded-e-[4px] focus:outline-none' onKeyDown={(e) => handleEnterPressed(e)}/></div>                         
                          <div className='w-[60px]  bg-[#008000]  rounded-[3px] shadow cursor-pointer'>
                            <div className='flex justify-center gap-1  shadow-md h-[100%] hover:border-[1px] hover:border-white rounded-[3px]' onClick={() => {handleSearch()}} title={"Tìm"} >
                              <img src="./assest/searchIcon_white.png" alt="" className='size-[17px] self-center'/>
                              <div className='text-white self-center' >Tìm</div>
                            </div>                            
                          </div>
                        </div>                       
                      </div>
                    <div id="space"></div>
                  </div>
              </div>
          </div>
        </div>
        <div className='w-[100%] h-[100%]'></div>
    </div>
  )
}

export default DataFilter