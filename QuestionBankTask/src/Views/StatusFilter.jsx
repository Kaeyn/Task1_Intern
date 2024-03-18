import React, { useState } from 'react'
import "../css/StatusFilter.css"
const StatusFilter = () => {
  const filerCategory = [
    "Đang soạn thảo",
    "Gửi duyệt",
    "Đã duyệt",
    "Ngưng áp dụng"
  ];

  const [checkedList, setCheckedList] = useState([])

  const onChecked = (index) => {
    const newList = [...checkedList];
    newList[index] = !newList[index];
    setCheckedList(newList);
  };

  return (
    <div className='h-[100%]'>
        <div className='flex justify-between items-center h-[100%]'>
          <div className=''>
            <ul className='flex'>
              {filerCategory.map((data, index)=>{
                // const isChecked = checkedList.some((checkboxID) => checkboxID === index)
                const isChecked = checkedList[index] || false;
                return (               
                  <li key={index} className='pr-4 pl-[5px]'>
                    <div className={`${isChecked ? 'border-2 border-[#008000] transition: transform 0.3s ease;' : 'border-2 border-transparent transition: transform 0.3s ease;'} flex items-center gap-4 shadow rounded-[25px] h-[40px] p-4 bg-white text-[#959DB3] cursor-pointer` }>
                      <div className='text-[16px]'>{data}</div>
                      <input type="checkbox" className='checkboxes w-[16px] h-[16px]' id={`checkBox${index}`} onChange={() => {onChecked(index)}} /> 
                      <label htmlFor={`checkBox${index}`} className='checkbox-label'></label>
                       </div>
                       
                  </li>
                )
              })}    
            </ul>
          </div>
          <div>
            <ul className='flex gap-4 pr-[18px]'>
                <li><div className='w-[42px] h-[40px] bg-white shadow rounded-[3px] flex justify-center cursor-pointer'><img src="./assest/Import.png" alt="" className='w-[18px] h-[21px] self-center'/></div></li>
                <li><div className='w-[42px] h-[40px] bg-white shadow rounded-[3px] flex justify-center cursor-pointer'><img src="./assest/export.png" alt="" className='w-[18px] h-[21px] self-center'/></div></li>
                <li><div className='w-[130px] h-[40px] bg-[#1A6634] shadow rounded-[3px] flex justify-center gap-2 cursor-pointer'><img src="./assest/add.png" alt="" className='w-[18px] h-[21px] self-center '/><div className='self-center text-white'>Thêm mới</div></div></li>
            </ul>
          </div>
            
        </div>
    </div>
  )
}

export default StatusFilter