import React, { useEffect, useState } from 'react'
import '../css/DataList.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateLeft, faCheckCircle, faCircleCheck, faCircleMinus, faEye, faPencil, faShare, faTrash} from "@fortawesome/free-solid-svg-icons"
const DataList = ({dataFromContent, ShowAlertBox, confirmDeleteItem, setIsFuncDisable, setAlertMessage}) => {

  const [datafContent, setDataFContent] = useState([]);
  const [isHoverOrFocus, setIsHoverOrFocus] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showMultiTooltip, setShowMultiTooltip] = useState(false);
  const [listMultiToolFunc, setListMultiToolFunc] = useState([]);
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

  const handleCloseMultiToolTip = () =>{
      setShowMultiTooltip(false);
      unCheckBoxesOnCloseToolTip();
  }
    

    

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

    const handleCheckBoxUpdate = () =>{
      
      checkBoxList.forEach(checkboxID => {
        const checkBox = document.getElementById(checkboxID);
        if(checkBox != null){
        checkBox.checked = true;
        }
      });
    }

    const checkAllBoxes = (checkboxes) =>{
      const newCheckedList = []; 
      checkboxes.forEach((checkbox) => {
          checkbox.checked = true;
          newCheckedList.push(checkbox.id)
        
      });
      console.log(newCheckedList)
      setIsAllChecked(true);
      setCheckBoxList(newCheckedList);
    }

    const unCheckAllBoxes = (checkboxes) =>{
      checkboxes.forEach((checkbox) => {   
        if(checkbox != null){
          checkbox.checked = false; 
        }                 
      });
      setIsAllChecked(false);
      setCheckBoxList([]);
    }
    
    const unCheckBoxesOnCloseToolTip = () =>{
      checkBoxList.forEach((id) => {      
          const checkbox = document.getElementById(`${id}`)  
          if(checkbox != null){ 
            checkbox.checked = false;     
           }         
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
      setAlertMessage(typeAlert[0].id)
    }

    const editItem = (id) =>{      
      setAlertMessage(typeAlert[1].id)
    }

    const requestApproveItem = (id) =>{
      const item = datafContent.find(item => item.id === id);
        if (!item || !item.id || !item.stringques || !item.type || !item.group || !item.timelimit) {
          setAlertMessage(typeAlert[7].id)
        return;
      }

      const index = datafContent.findIndex(item => item.id === id);
      if (index !== -1) {
        datafContent[index].status = "1";
        setDataFContent([...datafContent]);
        setAlertMessage(typeAlert[2].id)
      }
    }

    const approveItem = (id) =>{
      const index = datafContent.findIndex(item => item.id === id);
      const item = datafContent.find(item => item.id === id);
      if (!item || !item.id || !item.stringques || !item.type || !item.group || !item.timelimit) {
        setAlertMessage(typeAlert[8].id)
      }else{
        if (index !== -1) {
          datafContent[index].status = "2";
          setDataFContent([...datafContent]);
          setAlertMessage(typeAlert[3].id)
        }
      }
      
    }

    const stopDisplayItem = (id) =>{
      const index = datafContent.findIndex(item => item.id === id);
      if (index !== -1) {
        datafContent[index].status = "3";
        setDataFContent([...datafContent]);
        setAlertMessage(typeAlert[4].id)
      }
    }

    
    const returnItem = (id) =>{
      const index = datafContent.findIndex(item => item.id === id);
      if (index !== -1) {
        datafContent[index].status = "4";
        setDataFContent([...datafContent]);
        setAlertMessage(typeAlert[5].id)
      }
    }

    const requestApproveListItem = () =>{
      checkBoxList.forEach(itemID => {
        const status = getItemStatus(itemID);     
        if(status != null && (status === "0" || status === "4")){
          requestApproveItem(itemID)
        }
        
      });
      unCheckBoxesOnCloseToolTip();
    }

    const approveListItem = () =>{
      checkBoxList.forEach(itemID => {
        const status = getItemStatus(itemID);
        if(status != null && (status === "1" || status === "3")){
          approveItem(itemID)
        }
        
      });
      unCheckBoxesOnCloseToolTip();
    }

    const stopDisplayListItem = () =>{      
      checkBoxList.forEach(itemID => {
        const status = getItemStatus(itemID);
        if(status != null && (status === "2")){
          stopDisplayItem(itemID)
        }
      });
      unCheckBoxesOnCloseToolTip();
    }

    const returnListItem = (id) =>{
      checkBoxList.forEach(itemID => {
        const status = getItemStatus(itemID);
        if(status != null && (status === "1" || status === "3")){
          returnItem(itemID)
        } 
      });
      unCheckBoxesOnCloseToolTip();
    }

    const deleteMultiItem = () =>{
      let questionList = [];
      // Biến đếm số item có id là null
      let emptyIDCount = 0;
      checkBoxList.forEach(id => {
        const itemToDelete = datafContent.find(item => item.id === id); 
        if(id == "emptyIDCheckBox"){
          emptyIDCount += 1
        }else{
          if (!itemToDelete  || itemToDelete.status == 4) {
            setAlertMessage(typeAlert[9].id)  
          }else{
            if(itemToDelete){
              questionList.push(itemToDelete);
              setAlertMessage(typeAlert[6].id)                     
            }
          }
        }
        

      });

      ShowAlertBox(questionList)
  }

    const getItemStatus = (id) =>{
      const item = datafContent.find(item => item.id === id);
      return item ? item.status : null;
    }

    const deleteItem = (id) =>{
        const itemToDelete = datafContent.find(item => item.id === id);
        let questionList = []
        if(id.length == 0){
          setAlertMessage(typeAlert[9].id)
        }
        else{
          if (!itemToDelete || itemToDelete.status == 4) {
            
          }else{
            if(itemToDelete){
              questionList.push(itemToDelete);                
              ShowAlertBox(questionList)
            }
            setAlertMessage(typeAlert[6].id)
          }
        }
        
        
    }
    

    const getListMultitool = () =>{
      let listStatus = []
      let listFunc = []
      checkBoxList.forEach(id => {
        const status = getItemStatus(id);
        if(status != null){
          const isContained = listStatus.find(item => item === status);
          if(!isContained){
            listStatus.push(status)
          }    
        }  
      }); 
      listStatus.forEach(status => {
          let func = handleFuncOnStatusMultiTool(status)
          func.forEach(f => {
            if(!listFunc.includes(f)) {
                listFunc.push(f);
            }
        });
      });       
      listFunc.sort((a, b) => a.id - b.id);    
      setListMultiToolFunc(listFunc)
    }
    

    const iconFuncList = [
      { icon: faEye, text: "Xem chi tiết", action: seeDetailsItem},
      { icon: faPencil, text: "Chỉnh sửa", action: editItem},
      { icon: faShare, text: "Gửi duyệt" , action: requestApproveItem},
      { icon: faCircleCheck, text: "Phê duyệt", action: approveItem},
      { icon: faCircleMinus, text: "Ngưng hiển thị", action: stopDisplayItem},
      { icon: faArrowRotateLeft, text: "Trả về", action: returnItem},
      { icon: faTrash, text: "Xoá câu hỏi", action: deleteItem},
    ];

    const typeAlert = [
      { id:0, type: "success", text: "Xem chi tiết thành công"},
      { id:1, type: "success", text: "Chỉnh sửa thành công"},
      { id:2, type: "success", text: "Gửi duyệt thành công"},
      { id:3, type: "success", text: "Phê duyệt thành công"},
      { id:4, type: "success", text: "Ngưng hiển thị thành công"},
      { id:5, type: "success", text: "Trả về thành công"},
      { id:6, type: "success", text: "Xoá thành công"},
      { id:7, type: "error", text: "Gửi duyệt thất bại"},
      { id:8, type: "error", text: "Phê duyệt thất bại"},
      { id:9, type: "error", text: "Xoá thất bại"},
    ];

    const multiToolFuncList = [
      { id: 1,icon: faShare, text: "Gửi duyệt" , action: requestApproveListItem},
      { id: 3,icon: faCircleCheck, text: "Duyệt áp dụng", action: approveListItem},
      { id: 4,icon: faCircleMinus, text: "Ngừng áp dụng", action: stopDisplayListItem},
      { id: 2,icon: faArrowRotateLeft, text: "Trả về", action: returnListItem},
      { id: 5,icon: faTrash, text: "Xoá câu hỏi", action: deleteMultiItem}
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
    
    const Icon20px = ({ classIcon, color }) => {
      const iconSize = {
          width: "20px",
          height: "20px",
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

    const handleFuncOnStatusMultiTool = (status) => {
      const statusID = parseInt(status)
      switch (statusID){
        case 0:        
          return [
            multiToolFuncList[0], multiToolFuncList[4]      
        ];
        case 1:
          return [  
            multiToolFuncList[1], multiToolFuncList[3]
        ];
        case 2:
          return [  
            multiToolFuncList[2]
            
          ]; 
        case 3:
          return [  
            multiToolFuncList[1], multiToolFuncList[3]
          ]; 
        case 4:
          return [  
            multiToolFuncList[0]    
            
          ]; 
        default: return;
      }     
    }
    
    const handleActionClicked = (action, dataid) =>{
        action(dataid)
        setShowTooltip(false)
    }

    const handleMultitoolActionClicked = (action) =>{
      action()   
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
      handleCheckBoxUpdate();
      handleBoxesChecking();     
    }, [checkBoxList])

    useEffect(() => {     
      setShowTooltip(showTooltip);
      
    }, [funcList,showTooltip])

    useEffect(() => {     
      if(checkBoxList.length > 0){
        setShowMultiTooltip(true)
        setIsFuncDisable(true)
      }else{
        setShowMultiTooltip(false)
        setIsFuncDisable(false)
      }     
    }, [checkBoxList])

    useEffect(() =>{
      getListMultitool();
    },[checkBoxList])
    
  return (
    <div className='w-[100%] h-[100%]'>
        <div className='w-[100%] h-[8%] grid grid-cus p-[5px] pb-[2px]'>
            <div className='w-[100%]'>
                <div className='flex justify-center items-center h-[100%] gap-2'>
                  <div><input type="checkbox" name="" id="" className='parentCheckBox' title={"Chọn tất cả"} onChange={() => {handleCheckAllBoxes()}} checked={isAllChecked} /></div>
                </div>
            </div>
            <div className='w-[100%]'>
                <div className='flex items-center h-[100%] gap-2'>
                  <div className='text-[#5A6276] font-[600]' title={"Câu hỏi"} >Câu hỏi</div>
                </div>
            </div>
            <div className='w-[100%]'>
              <div className='flex items-center h-[100%]'>
                <div className='text-[#5A6276] font-[600]' title={"Phân nhóm"}>Phân nhóm</div>
              </div>              
            </div>
            <div className='w-[100%] '>
              <div className='flex w-[90%] h-[100%] justify-center items-center'>
                <div className='text-[#5A6276] font-[600]' title={"Thời gian làm"}>Thời gian làm</div>
              </div> 
            </div>
            <div className='w-[100%]'>
              <div className='flex justify-center items-center h-[100%]'>
                  <div className='text-[#5A6276] font-[600]' title={"Tình trãng"}>Tình trạng</div>
                </div> 
            </div>
            <div className='w-[100%]'>
                <div className='flex items-center h-[100%] gap-2'>
                  
                </div>
            </div>
        </div>
        <div className='w-[100%] h-[64vh] z-0 scroll-container '>
          {showMultiTooltip === true && 
          <div  className='h-[100px] bg-white fixed top-[65%] -translate-x-1/2 left-[60%] -translate-y-1/2 rounded-[6px] shadow-sm'>
            
                    <div className='h-[100%] p-[10px] flex items-center'>
                          <div className='w-[120px] h-[100%] bg-[#008000] mr-[10px] flex flex-col justify-center items-center text-white rounded-l-[4px]'>
                            <div className='font-bold text-[26px]'>{checkBoxList.length}</div>
                            <div className=''>Đã chọn</div>
                          </div>             
                      {listMultiToolFunc.map((item, index) => (           
                        <div key={index} className={`w-[120px] h-[85%] ml-[10px] mr-[10px] flex flex-col justify-center items-center text-[15px] gap-1 ${item.id == 5 ? "text-[#FD7676]" : "text-[#26282E]"} cursor-pointer hover:bg-[#26282e18] `} onClick={() => handleMultitoolActionClicked(item.action)}>
                            <div><Icon20px classIcon={item.icon} color={item.id == 5 ? "#FD7676" : "#959DB3"} ></Icon20px></div>
                            <div>{item.text}</div>
                          </div> 
                          ))}                                           
                          <div className='w-[120px] h-[85%]  ml-[10px] flex justify-center items-center border-[#BDC2D2] border-l-2 text-[20px] text-[#26282E] cursor-pointer hover:bg-[#26282e18] rounded-r-[4px]' onClick={() => handleCloseMultiToolTip()}>
                          <div>X</div>
                          </div>
                    </div></div>} 
          
          
          {datafContent ? datafContent.map((data,index) => (                  
              <div className='w-[100%] h-[90px] grid grid-cus p-[5px]' key={index}  >                
                <div className={`${(checkBoxList.includes(data.id) || checkBoxList.includes("emptyIDCheckBox")) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[9px]` }>
                    <div className='flex justify-center items-center h-[100%] gap-2 '>
                      <div><input type="checkbox" name="" id={data.id.length == 0 ? "emptyIDCheckBox" : data.id} className='datacheckBox' onChange={() =>(handleCheckBoxCheck(data.id))}/>
                      </div>
                    </div>
                </div>  
                  <div className={`${checkBoxList.includes(data.id) || checkBoxList.includes("emptyIDCheckBox") ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[9px] pt-[9px] pb-[9px] `}>
                    
                      <div className='flex items-center h-[100%] gap-2 '>
                        
                        <div className='flex flex-col justify-center h-[100%]'>
                          <div className={`question-text-limit font-[700] ${data.stringques.length == 0 ? "invisible" : ""}`} title={data.stringques}>{data.stringques.length > 0 ? data.stringques : "empty"}</div>
                          <div className={`flex items-center ${data.id.length > 0 ? "gap-2" : "gap-0"}`}>
                            <div title={data.id}>{data.id}</div>
                            <div className={`w-[2px] h-[18px] bg-[#C4C4C4] rounded-[3px] ${(data.id.length == 0 || data.type.length == 0) ? "hidden" : ""}`}></div>
                            <div title={`${data.type}`}>{data.type}</div>
                          </div>
                          </div>
                      </div>
                  </div>
                  <div className={`${(checkBoxList.includes(data.id) || checkBoxList.includes("emptyIDCheckBox")) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[10px] pt-[9px] pb-[9px]`}>
                    <div className='flex items-center h-[100%]'>
                      <div className='' title={data.type}>Thương hiệu, văn hoá cty</div>
                    </div>              
                  </div>
                  <div className={`${(checkBoxList.includes(data.id) || checkBoxList.includes("emptyIDCheckBox")) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[10px] pt-[9px] pb-[9px]`}>
                    <div className='flex h-[100%] justify-center items-center'>
                      <div className='font-[700]' title={`${formatTime(data.timelimit)}`}>{data.timelimit.length == 0 ? "" : formatTime(data.timelimit)}</div>
                    </div> 
                  </div>
                  <div className={`${(checkBoxList.includes(data.id) || checkBoxList.includes("emptyIDCheckBox")) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] p-[9px] pt-[9px] pb-[9px]`}>
                    <div className='flex justify-end items-center h-[100%] w-[76%]'>
                        <div className={`${data.status == "0" ? "" : data.status == "1" ? "text-[#31ADFF]" : data.status =="2" ? "text-[#008000]" : data.status == "3" ? "text-[#FB311C]" : data.status == "4" ? "text-[#B7B92F]" : "text-black"} `} title={formatStatus(data.status)}>{formatStatus(data.status)}</div>
                        </div> 
                  </div>
                  
                  <div className={`${(checkBoxList.includes(data.id) || checkBoxList.includes("emptyIDCheckBox")) ? 'bg-[#1A6634B2]' : 'bg-[#FFFFFF]'} w-[100%] ml-[1px] p-[9px]`}>
                    <div className='flex justify-center items-center h-[100%] gap-2 '>
                    <div className={`${(selectedTooltipID === index && isHoverOrFocus) ? "bg-[#BDC2D2] text-white": ""} w-[50px] rounded-[3px] text-center three-dots-hover text-black cursor-pointer relative`} key={index}>
                        {(selectedTooltipID === index && showTooltip) ?
                          (<div className='absolute top-0 -left-[159px] w-[160px] bg-[#BDC2D2] '>
                              <div className=' flex flex-col w-[100%] text-white func-parent '>
                              {funcList.map((item, funcindex) => (
                                  
                                  <div key={funcindex} className='flex w-[100%] p-2 gap-3 text-[15px]' onClick={() => handleActionClicked(item.action, data.id)} >
                                    <Icon24px classIcon={item.icon} color={"#FFFFFF"}/>
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
                                
                                
          )): (
            <div className='w-[100%] h-[90px] p-[5px]'>                
                  <div className={`bg-[#FFFFFF] w-[100%] p-[9px]` }>
                      <div className='flex justify-center items-center h-[100%] gap-2 '>
                        <div>
                          Không tìm thấy dữ liệu
                        </div>
                      </div>
                  </div>  
            </div>  )}      
          
        </div>
    </div>
  )
}

export default DataList