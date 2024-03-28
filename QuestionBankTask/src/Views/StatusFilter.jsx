import React, { useEffect, useState } from 'react'
import "../css/StatusFilter.css"
const StatusFilter = ({listStatusFilter, resetStatus}) => {
  const filerCategory = [
    "Đang soạn thảo",
    "Gửi duyệt",
    "Đã duyệt",
    "Ngưng áp dụng"
  ];

  const [checkedList, setCheckedList] = useState([0])

  const onCheckBoxChecked = (index) => {
    const newCheckedList = [...checkedList];
    const alreadyChecked = newCheckedList.includes(index);
    const checkbox = document.getElementById(`checkBox${index}`);
    if (alreadyChecked) {
      const indexToRemove = newCheckedList.indexOf(index); 
      newCheckedList.splice(indexToRemove, 1); 
      checkbox.checked = false;
      setCheckedList(newCheckedList);
      listStatusFilter(newCheckedList);
      
    } else {
      newCheckedList.push(index);
      checkbox.checked = true;
      setCheckedList(newCheckedList);
      listStatusFilter(newCheckedList);
    }
    
  };
  const unCheckStatusList = () =>{
    const checkBoxes = document.querySelectorAll(".statusCheckBoxes")
    const firstCheckBox = document.getElementById("checkBox0")
    checkBoxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    listStatusFilter([0]);
    setCheckedList([0])
    firstCheckBox.checked = true;
  } 

    useEffect(() =>{
      unCheckStatusList();
    },[resetStatus])
    return (
      <div className='h-[100%]'>
          <div className='flex items-center h-[100%]'>
            <div className='w-[60%] overflow-x-auto overflow-y-hidden whitespace-nowrap'>
              <ul className='flex items-center'>
                {filerCategory.map((data, index)=>{
                  const isChecked = checkedList.some((checkboxID) => checkboxID === index);
                  // const isChecked = checkedList[index] || false;
                  return (               
                    <li key={index} className='pr-4 pl-[5px] pb-[2px]'>
                      <div className={`${isChecked ? 'border-2 border-[#008000]' : 'border-2 border-transparent'} status-hover transition ease-in-out duration-300 flex items-center gap-3 shadow rounded-[25px] h-[40px] p-4 bg-white text-[#959DB3] cursor-pointer` } title={data} onClick={() => onCheckBoxChecked(index)}>
                        <div className='text-[16px]'>{data}</div>
                        <input type="checkbox" className='checkboxes w-[17px] h-[17px] statusCheckBoxes' id={`checkBox${index}`} onChange={() => onCheckBoxChecked(index)} disabled/> 
                        <label htmlFor={`checkBox${index}`} className='checkbox-label' ></label>
                      </div>
                        
                    </li>
                  )
                })}    
            </ul>
          </div>
          <div className='w-[40%] justify-end flex'>
            <ul className='flex gap-4 pr-[18px] pb-[2px]'>
                <li><div className='w-[42px] h-[40px] bg-white shadow rounded-[3px] flex justify-center cursor-pointer  excel_function_hover'  title='Import Excel'><img src="./assest/Import.png" alt="" className='w-[18px] h-[21px] self-center'/></div></li>
                <li><div className='w-[120px] h-[40px] bg-white shadow rounded-[3px] flex justify-center cursor-pointer gap-2  excel_function_hover'  title='Export Excel'><img src="./assest/export.png" alt="" className='w-[18px] h-[21px] self-center' /><div className='self-center text-[#959DB3]'>Template</div></div></li>
                <li><div className='w-[130px] h-[40px] bg-[#1A6634] shadow-lg shadow-[#ADDEF6] rounded-[3px] flex justify-center gap-2 cursor-pointer addnew_function_hover'  title='Thêm mới'><img src="./assest/add.png" alt="" className='w-[18px] h-[21px] self-center '/><div className='self-center text-white'>Thêm mới</div></div></li>
            </ul>
          </div>
            
        </div>
    </div>
  )
}

export default StatusFilter