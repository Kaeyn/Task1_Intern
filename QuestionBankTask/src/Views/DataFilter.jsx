import React from 'react'
import '../css/DataList.css'
const DataFilter = ({searchInput, resetContent}) => {
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
  const resetFilter = () =>{
    resetContent();
  }
  
  return (
    <div className='w-[100%] h-[100%] grid grid-cols-2 p-[6px]'>
        <div className='w-[100%] h-[100%] grid grid-cols-5 gap-8'>
          <div className='w-[100%] h-[100%] col-span-1'>
              <div className='w-[100%] h-[100%] flex flex-col justify-between'>
                  <div className='flex gap-2 self-center'>
                    <img src="./assest/filter.png" alt="" className='size-[23px] max-h-[23px]'/>
                    <div className='font-[600] text-[#5A6276]'>LỌC DỮ LIỆU</div>
                  </div>
                  <div className='flex gap-2 self-center'>
                    <div className='w-[13px] h-[24px]'></div>
                    <div className='text-[#008000] text-[15px] font-[500] underline cursor-pointer'onClick={() => {resetFilter()}}>Reset bộ lọc</div></div>
              </div>
          </div>
          <div className='w-[100%] h-[100%] col-span-4'>
              <div className='w-[100%] h-[100%] flex flex-col justify-between'>
                  <div className='text-[#959DB3] font-[600]' >Tìm kiếm</div>
                  <div className='w-[100%]'>
                    <div className='relative flex self-center'>
                        <div className='w-[34px]  flex justify-center bg-white rounded-s-[4px] shadow-bottom-left'><img src="./assest/searchIcon.png" alt="" className='absolute size-[15px] self-center'/></div>
                        <div className='w-[100%] h-[34px] grid grid-cols-9 gap-2'>
                          <div className='w-[100%] h-[100%] col-span-6 shadow-bottom-right'><input id='inputbox' type="text" placeholder='Tìm theo mã và câu hỏi' className='w-[100%] h-[100%] rounded-e-[4px] focus:outline-none' onKeyDown={(e) => handleEnterPressed(e)}/></div>                         
                          <div className=' col-span-1 w-[100%] bg-[#008000]  rounded-[3px] shadow cursor-pointer'>
                            <div className='flex justify-center gap-1 w-[100%] h-[100%]' onClick={() => {handleSearch()}}>
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