import React, { useEffect, useState } from 'react'
import '../css/DataList.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faCircleCheck, faCircleMinus, faEye, faPencil, faShare, faTrash} from "@fortawesome/free-solid-svg-icons"
const DataList = ({dataFromContent, ShowAlertBox, confirmDeleteItem}) => {

  const [datafContent, setDataFContent] = useState([]);
  const [isHoverOrFocus, setIsHoverOrFocus] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const [selectedTooltipID, setSelectedTooltipID] = useState(-1);
  const [funcList , setFuncList] = useState([]);
  const [checkBoxList, setCheckBoxList] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleToolTipClick = (status, index, id) =>{
      setSelectedTooltipID(index)
      setFuncList(handleFunctionOnStatus(status)) 
      if(showTooltip){   
        setShowTooltip(false)
        setIsHoverOrFocus(false)
      }
      else{
        setShowTooltip(true)
        setIsHoverOrFocus(true)
      }
    }
    useEffect(() => {     
      setShowTooltip(showTooltip);
      
    }, [funcList,showTooltip])

    const handleCheckBoxCheck = (index) =>{
      const newCheckedList = [...checkBoxList];
      const alreadyChecked = newCheckedList.includes(index);
      if (alreadyChecked) {
        // Remove the index if it's already present
        const indexToRemove = newCheckedList.indexOf(index);
        newCheckedList.splice(indexToRemove, 1);
      } else {
        // Add the index if it's not present
        newCheckedList.push(index);
      }
      setCheckBoxList(newCheckedList);
    }

    const handleCheckAllBoxes = () =>{
      
      const checkboxes = document.querySelectorAll('.datacheckBox');
      if(!isAllChecked){
        checkAllBoxes(checkboxes)
      }else{
        unCheckAllBoxes(checkboxes)
      }   

      console.log(checkBoxList)
    }

    const checkAllBoxes = (checkboxes) =>{
      const newCheckedList = []; 
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
        newCheckedList.push(checkbox.id)
      });
      setIsAllChecked(true);
      setCheckBoxList(newCheckedList);
    }

    const unCheckAllBoxes = (checkboxes) =>{
      checkboxes.forEach((checkbox) => {       
        checkbox.checked = false;         
      });
      setIsAllChecked(false);
      setCheckBoxList([]);
    }

    const handleBoxesChecking = () =>{
      const parentcheckBox = document.querySelector('.parentCheckBox');
      if(checkBoxList.length == datafContent.length){
        parentcheckBox.checked = true;
      }
      else{
        parentcheckBox.checked = false;
      }   
    }

    const seeDetailsItem = (id) =>{
        alert("Clicked see detial on item: " + id)
    }

    const editItem = (id) =>{
        alert("Clicked see detial on item: " + id)
    }

    const requestApproveItem = (id) =>{
      const index = datafContent.findIndex(item => item.id === id);
      if (index !== -1) {
        datafContent[index].status = "1";
        setDataFContent([...datafContent]);
      }
    }

    const approveItem = (id) =>{
      const index = datafContent.findIndex(item => item.id === id);
      if (index !== -1) {
        datafContent[index].status = "2";
        setDataFContent([...datafContent]);
      }
    }

    const stopDisplayItem = (id) =>{
      const index = datafContent.findIndex(item => item.id === id);
      if (index !== -1) {
        datafContent[index].status = "3";
        setDataFContent([...datafContent]);
      }
    }

    const returnItem = (id) =>{
      const index = datafContent.findIndex(item => item.id === id);
      if (index !== -1) {
        datafContent[index].status = "4";
        setDataFContent([...datafContent]);
      }
    }

    const deleteItem = (id) =>{
        const itemToDelete = datafContent.find(item => item.id === id);
        let questionList = []
          if(itemToDelete){
              let stringques = itemToDelete.stringques
              const chunkSize = 30;       
              let chunk = stringques.slice(0,chunkSize);
              questionList.push({chunk});                     
          }
        
        confirmDeleteItem = confirmDelete(id)
        ShowAlertBox(questionList)
    }
    
    const confirmDelete = (id) =>{
      setDataFContent(prevData => prevData.filter(item => item.id !== id));
    }

    const iconFuncList = [
      { icon: faEye, text: "Xem chi tiết", action: seeDetailsItem},
      { icon: faPencil, text: "Chỉnh sửa", action: editItem},
      { icon: faShare, text: "Gửi duyệt" , action: requestApproveItem},
      { icon: faCircleCheck, text: "Phê duyệt", action: approveItem},
      { icon: faCircleMinus, text: "Ngưng hiển thị", action: stopDisplayItem},
      { icon: faShare, text: "Trả về", action: returnItem},
      { icon: faTrash, text: "Xoá câu hỏi", action: deleteItem},
    ];
  
  
    const Icon24px = ({ classIcon, color }) => {
      const iconSize = {
          width: "24px",
          height: "24px",
          color: color,
          cursor: "pointer"
      };
      return (
          <FontAwesomeIcon icon={classIcon} style={iconSize} />
      )
    }
  

    const handleFunctionOnStatus = (status) =>{
      const statusID = parseInt(status)
      switch (statusID){
        case 0:        
          return [
            iconFuncList[1], iconFuncList[2], iconFuncList[6]          
        ];
        case 1:
          return [  
            iconFuncList[1], iconFuncList[3], iconFuncList[5]  
        ];
        case 2:
          return [  
            iconFuncList[0], iconFuncList[4]    
            
          ]; 
        case 3:
          return [  
            iconFuncList[0], iconFuncList[3], iconFuncList[5]  
          ]; 
        case 4:
          return [  
            iconFuncList[1], iconFuncList[2]       
            
          ]; 
        default: return;
      }     
    }
    
    const handleActionClicked = (action, dataid) =>{
        action(dataid)
        setShowTooltip(false)
    }


    const formatTime = (seconds) => {
      if (seconds < 60) {
          return seconds + "s";
      } else if (seconds < 3600) {
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          return `${minutes}m${remainingSeconds}s`;
      } else {
          const hours = Math.floor(seconds / 3600);
          const remainingMinutes = Math.floor((seconds % 3600) / 60);
          const remainingSeconds = seconds % 60;
          if (remainingMinutes === 0) {
              return `${hours}h${remainingSeconds}s`;
          } else {
              return `${hours}h${remainingMinutes}m${remainingSeconds}s`;
          }
      }
      }
      const formatStatus = (status) =>{
        const statusID = parseInt(status)
        switch (statusID){
          case 0:        
            return "Đang soạn thảo"
          case 1:
            return "Gửi duyệt"
          case 2:
            return "Duyệt áp dụng"
          case 3:
            return "Ngừng áp dụng"
          case 4:
            return "Trả về"
          default: return;
        }     
      }


    useEffect(() => {     
      setDataFContent(dataFromContent);
    }, [dataFromContent])

    useEffect(() => {     
      handleBoxesChecking();
      
    }, [checkBoxList])

    
  return (
    <div className='w-[100%] h-[100%]'>
        <div className='w-[100%] h-[8%] grid grid-cus p-[5px] pb-[2px]'>
            <div className='w-[100%]'>
                <div className='flex justify-center items-center h-[100%] gap-2'>
                  <div><input type="checkbox" name="" id="" className='parentCheckBox' onChange={() => {handleCheckAllBoxes()}} checked={isAllChecked} /></div>
                </div>
            </div>
            <div className='w-[100%]'>
                <div className='flex items-center h-[100%] gap-2'>
                  <div className='text-[#5A6276] font-[600]'>Câu hỏi</div>
                </div>
            </div>
            <div className='w-[100%]'>
              <div className='flex items-center h-[100%]'>
                <div className='text-[#5A6276] font-[600]'>Phân nhóm</div>
              </div>              
            </div>
            <div className='w-[100%] '>
              <div className='flex h-[100%] justify-center items-center'>
                <div className='text-[#5A6276] font-[600]'>Thời gian làm</div>
              </div> 
            </div>
            <div className='w-[100%]'>
              <div className='flex justify-center items-center h-[100%]'>
                  <div className='text-[#5A6276] font-[600]'>Tình trạng</div>
                </div> 
            </div>
            <div className='w-[100%]'>
                <div className='flex items-center h-[100%] gap-2'>
                  
                </div>
            </div>
        </div>
        <div className='w-[100%] h-[64vh] overflow-y-auto'>
        {datafContent && datafContent.map((data,index) => (                  
            <div className='w-[100%] h-[90px] grid grid-cus p-[5px]' key={index}  >                
              <div className={`${checkBoxList.includes(data.id) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[9px]` }>
                  <div className='flex justify-center items-center h-[100%] gap-2 '>
                    <div><input type="checkbox" name="" id={data.id} className='datacheckBox' onChange={() =>(handleCheckBoxCheck(data.id))}/>
                    </div>
                  </div>
              </div>  
                <div className={`${checkBoxList.includes(data.id) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[9px] pt-[9px] pb-[9px]`}>
                  
                    <div className='flex items-center h-[100%] gap-2 '>
                      
                      <div className='flex flex-col justify-center h-[100%]'>
                        <div className='font-[700]'>{data.stringques}</div>
                        <div className='flex gap-2 items-center'>
                          <div>{data.id}</div>
                          <div className='w-[2px] h-[18px] bg-[#C4C4C4] rounded-[3px]'></div>
                          <div>{data.type}</div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={`${checkBoxList.includes(data.id) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[10px] pt-[9px] pb-[9px]`}>
                  <div className='flex items-center h-[100%]'>
                    <div className=''>Thương hiệu, văn hoá cty</div>
                  </div>              
                </div>
                <div className={`${checkBoxList.includes(data.id) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[10px] pt-[9px] pb-[9px]`}>
                  <div className='flex h-[100%] justify-center items-center'>
                    <div className='font-[700]'>{formatTime(data.timelimit)}</div>
                  </div> 
                </div>
                <div className={`${checkBoxList.includes(data.id) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[9px] pt-[9px] pb-[9px]`}>
                  <div className='flex justify-end items-center h-[100%] w-[78%]'>
                      <div className={`${data.status == "0" ? "" : data.status == "1" ? "text-[#31ADFF]" : data.status =="2" ? "text-[#008000]" : data.status == "3" ? "text-[#FB311C]" : data.status == "4" ? "text-[#B7B92F]" : "text-black"} `}>{formatStatus(data.status)}</div>
                      </div> 
                </div>
                
                <div className={`${checkBoxList.includes(data.id) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] bg-[#FFFFFF] ml-[1px] p-[9px]`}>
                  <div className='flex justify-center items-center h-[100%] gap-2 '>
                  <div className={`${(selectedTooltipID === index && isHoverOrFocus) ? "bg-[#BDC2D2] text-white": ""} w-[50px] rounded-[3px] text-center three-dots-hover text-black cursor-pointer relative`} key={index}>
                      {(selectedTooltipID === index && showTooltip) ?
                        (<div className='absolute top-0 -left-[159px] w-[160px] bg-[#BDC2D2] '>
                            <div className=' flex flex-col w-[100%] text-white func-parent '>
                            {funcList.map((item, funcindex) => (
                                
                                <div key={funcindex} className='flex w-[100%] p-2 gap-3 text-[15px]' onClick={() => handleActionClicked(item.action, data.id)} >
                                  <Icon24px classIcon={item.icon} color={"#FFFFFF"} />
                                  {item.text}
                                </div>
                              ))}
                            </div>                      
                        </div>): ""}
                      <div className={`font-[700] w-[30px] h-[30px] tracking-wide`} id={data.id} onClick={() => handleToolTipClick(data.status, index, data.id)}>...</div>
                      
                    </div>       
                    
                  </div>
              </div> 
            </div>                    
        ))}
        </div>
    </div>
  )
}

export default DataList