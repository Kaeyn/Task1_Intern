import React, { useState } from 'react'
import '../css/DataList.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faCircleCheck, faCircleMinus, faEye, faPencil, faShare, faTrash} from "@fortawesome/free-solid-svg-icons"
const DataList = () => {

  const iconFuncList = [
    { icon: faEye, text: "Xem chi tiết" },
    { icon: faPencil, text: "Chỉnh sửa" },
    { icon: faShare, text: "Gửi duyệt" },
    { icon: faCircleCheck, text: "Phê duyệt" },
    { icon: faCircleMinus, text: "Ngưng hiển thị" },
    { icon: faShare, text: "Trả về" },
    { icon: faTrash, text: "Xoá câu hỏi" },
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
const [isHoverOrFocus, setIsHoverOrFocus] = useState(false);
const [showTooltip, setShowTooltip] = useState(false);
const [funcList , setFuncList] = useState([]);

    const handleToolTipClick = () =>{
      if(showTooltip){
        setFuncList(handleFunctionOnStatus(0)) 
        setShowTooltip(false)
        setIsHoverOrFocus(false)
      }
      else{
        setShowTooltip(true)
        setIsHoverOrFocus(true)
      }
    }
    const handleFunctionOnStatus = (status) =>{
      switch (status){
        case 0:        
          return [  
            { icon: faPencil, text: "Chỉnh sửa" },
            { icon: faShare, text: "Gửi duyệt" },        
            { icon: faTrash, text: "Xoá câu hỏi" },
        ];
        case 1:
          return [  
            { icon: faPencil, text: "Chỉnh sửa" },
            { icon: faCircleCheck, text: "Phê duyệt" },       
            { icon: faShare, text: "Trả về" },
        ];
        case 2:
          return [  
            { icon: faEye, text: "Xem chi tiết" },
            { icon: faCircleMinus, text: "Ngưng hiển thị" },       
            
          ]; 
        case 3:
          return [  
            { icon: faEye, text: "Xem chi tiết" },
            { icon: faCircleCheck, text: "Phê duyệt" },    
            { icon: faShare, text: "Trả về" },
          ]; 
        case 4:
          return [  
            { icon: faPencil, text: "Chỉnh sửa" },
            { icon: faShare, text: "Gửi duyệt" },      
            
          ]; 
        default: return;
      }
    }
  return (
    <div className='w-[100%] h-[100%]'>
        <div className='w-[100%] h-[8%] grid grid-cus p-[5px] pb-[2px]'>
            <div className='w-[100%]'>
                <div className='flex justify-center items-center h-[100%] gap-2'>
                  <div><input type="checkbox" name="" id="" className='' /></div>
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
            <div className='w-[100%]'>
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
        <div className='w-[100%] h-[92%]'>
            <div className='w-[100%] h-[90px] grid grid-cus p-[5px]'>   
            <div className=' w-[100%] bg-[#FFFFFF] p-[9px]'>
                <div className='flex justify-center items-center h-[100%] gap-2 '>
                  <div><input type="checkbox" name="" id="" className='' /></div>
                </div>
            </div>  
              <div className='w-[100%] bg-[#FFFFFF] pt-[9px] pb-[9px]'>
                
                  <div className='flex items-center h-[100%] gap-2 '>
                    
                    <div className='flex flex-col justify-center h-[100%]'>
                      <div className='font-[700]'>Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng ?</div>
                      <div className='flex gap-2 items-center'>
                        <div>Q.001</div>
                        <div className='w-[2px] h-[18px] bg-[#C4C4C4] rounded-[3px]'></div>
                        <div>Loại câu hỏi</div>
                      </div>
                      </div>
                  </div>
              </div>
              <div className='w-[100%] bg-[#FFFFFF] pt-[9px] pb-[9px]'>
                <div className='flex items-center h-[100%]'>
                  <div className=''>Thương hiệu, văn hoá cty</div>
                </div>              
              </div>
              <div className='w-[100%] bg-[#FFFFFF] pt-[9px] pb-[9px]'>
                <div className='flex h-[100%] justify-center items-center'>
                  <div className='font-[700]'>30s</div>
                </div> 
              </div>
              <div className='w-[100%] bg-[#FFFFFF] pt-[9px] pb-[9px]'>
                <div className='flex justify-center items-center h-[100%]'>
                    <div className=''>Đang soạn thảo</div>
                    </div> 
              </div>
              <div className='w-[100%] bg-[#FFFFFF] ml-[2px] p-[9px]'>
                <div className='flex justify-center items-center h-[100%] gap-2 '>
                <div className={`${isHoverOrFocus ? "bg-[#BDC2D2] text-white": ""} w-[50px] rounded-[3px] text-center three-dots-hover text-black cursor-pointer relative`}>
                    {showTooltip &&
                     <div className='absolute top-0 -left-[159px] w-[160px] bg-[#BDC2D2] '>
                        <div className=' flex flex-col w-[100%] text-white func-parent '>
                        {funcList.map((item) => (
                            <div key={item.text} className='flex w-[100%] p-2 gap-3 text-[15px]'>
                              <Icon24px classIcon={item.icon} color={"#FFFFFF"} />
                              {item.text}
                            </div>
                          ))}
                        </div>                      
                    </div>}
                    <div className={`font-[700] w-[30px] h-[30px] tracking-wide`} onClick={() => handleToolTipClick()}>...</div>
                    
                  </div>       
                  
                </div>
            </div> 
            </div>
            
        </div>
    </div>
  )
}

export default DataList