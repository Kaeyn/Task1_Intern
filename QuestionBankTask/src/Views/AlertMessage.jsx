import { faXmarkCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from 'react'

const AlertMessage = ({messages}) => {
    const [displayedMessages, setDisplayedMessages] = useState([]);

    const Icon20px = ({ classIcon, color }) => {
        const iconSize = {
            width: "20x",
            height: "20px",
            color: color,
            cursor: ""
        };
        return (
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        )
      }
      
      const typeAlert = [
        { type: "success", text: "Xem chi tiết thành công"},
        { type: "success", text: "Chỉnh sửa thành công"},
        { type: "success", text: "Gửi duyệt thành công"},
        { type: "success", text: "Phê duyệt thành công"},
        { type: "success", text: "Ngưng hiển thị thành công"},
        { type: "success", text: "Trả về thành công"},
        { type: "success", text: "Xoá thành công"},
        { type: "error", text: "Gửi duyệt thất bại"},
        { type: "error", text: "Phê duyệt thất bại"},
        { type: "error", text: "Xoá thất bại"},
      ];
      

    useEffect(() => {
        // if (messages.length > 0) {
        // // Add the new message to the end of the displayedMessages array
        // setDisplayedMessages(prevMessages => [...prevMessages, messages[0]]);

        // // Remove the message after 3 seconds
        // const timerId = setTimeout(() => {
        //     setDisplayedMessages(prevMessages => prevMessages.slice(1));
        // }, 3000);

        // return () => clearTimeout(timerId);
        // }
    }, [messages]);
  return (    
        // <div className='fixed z-100 bottom-[40px] left-[13vh] '>
        //     {displayedMessages.map((message, index) =>{
        //         <div className='bg-red-500 flex items-center rounded-[12px]' key={index}>
        //             <div className='w-[40px] min-h-[40px] flex justify-center items-center'><Icon20px classIcon={message.type === "success" ? faCheckCircle : faXmarkCircle} color={"#FFFFFF"}/> </div>
        //             <div className='max-w-[260px] p-[10px] text-white font-[400] text-[15px]'>{message}</div>
        //         </div>
        //     })}                       
        // </div>

        <div className='fixed z-100 bottom-[40px] left-[13vh]  '>
            <div className='bg-red-500 flex items-center rounded-[12px]'>
                <div className='w-[40px] min-h-[40px] flex justify-center items-center'><Icon20px classIcon={ faCheckCircle} color={"#FFFFFF"}/> </div>
                <div className='max-w-[260px] p-[10px] text-white font-[400] text-[15px]'>Đã xảy ra lỗi khi xóa: không được phép xóa câu hỏi này</div>
            </div>                      
        </div>
    
  )
}

export default AlertMessage