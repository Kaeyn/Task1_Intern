import React, { useEffect, useState } from 'react'
import "../css/StatusFilter.css"
const StatusFilter = () => {
  const filerCategory = [
    "Đang soạn thảo",
    "Gửi duyệt",
    "Đã duyệt",
    "Ngưng áp dụng"
  ];

  const [checkedList, setCheckedList] = useState([])

  const onCheckBoxChecked = (index) => {
    const newCheckedList = [...checkedList]; // Create a copy
    const alreadyChecked = newCheckedList.includes(index);
    const checkbox = document.getElementById(`checkBox${index}`);
    if (alreadyChecked) {
      // Remove the index if it's already present
      const indexToRemove = newCheckedList.indexOf(index); // Find the index to remove
      newCheckedList.splice(indexToRemove, 1); // Remove it
      checkbox.checked = false;
      setCheckedList(newCheckedList);
      
    } else {
      // Add the index if it's not present
      newCheckedList.push(index);
      checkbox.checked = true;
      setCheckedList(newCheckedList);
    }
    
  };

      useEffect(() => {
        setCheckedList([])
      }, []);

    return (
      <div className='h-[100%]'>
          <div className='flex justify-between items-center h-[100%]'>
            <div className=''>
              <ul className='flex'>
                {filerCategory.map((data, index)=>{
                  const isChecked = checkedList.some((checkboxID) => checkboxID === index);
                  // const isChecked = checkedList[index] || false;
                  return (               
                    <li key={index} className='pr-4 pl-[5px]'>
                      <div className={`${isChecked ? 'border-2 border-[#008000]' : 'border-2 border-transparent'} transition ease-in-out duration-300 flex items-center gap-3 shadow rounded-[25px] h-[40px] p-4 bg-white text-[#959DB3] cursor-pointer` } onClick={() => onCheckBoxChecked(index)}>
                        <div className='text-[16px]'>{data}</div>
                        <input type="checkbox" className='checkboxes w-[17px] h-[17px]' id={`checkBox${index}`} onChange={() => onCheckBoxChecked(index)} disabled/> 
                        <label htmlFor={`checkBox${index}`} className='checkbox-label' ></label>
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