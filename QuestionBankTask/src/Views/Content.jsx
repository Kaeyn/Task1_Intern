import React, { useEffect, useState } from 'react'
import StatusFilter from './StatusFilter'
import DataFilter from './DataFilter'
import DataList from './DataList'
import PageFilter from './PageFilter'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faCircleCheck, faCircleMinus, faEye, faPencil, faShare, faTrash, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons"

const Content = ({contentData}) => {
  const [Data, setData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [statusFilter, setstatusFilter] = useState([]);
  const [searchInputFilter, setSearchInputFilter] = useState("");
  const [alertBoxData, setAlertBoxData] = useState([]);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const filterData = () =>{
    let filterByStatus = [];
    if (statusFilter.length === 0) {
      filterByStatus = Data;
    } else {
      const tempListData = Data.filter(item => statusFilter.includes(parseInt(item.status)) )
      filterByStatus = tempListData;
    }

    let filterBySearch = [];
    if(searchInputFilter.trim() === ""){
      filterBySearch = filterByStatus;
      console.log("No")
    }else{
      let searchText = searchInputFilter.toLowerCase();
      // filterBySearch = filterByStatus.filter(item => statusFilter.includes(item.id.toLowerCase().includes(searchText) && item.stringques.toLowerCase().includes(searchText)));
      filterBySearch = filterByStatus.filter(item =>
        item.id.toLowerCase().includes(searchText) ||
        item.stringques.toLowerCase().includes(searchText)
      );
    }
    
    setFilteredData(filterBySearch);
  }

  const ShowAlertBox = (questList)=>{
    
    setAlertBoxData(questList);
    console.log(questList)
    setShowAlertBox(true);
  }

  const confirmDeleteItem = () =>{

  }
  
  const resetContent = () =>{
    setFilteredData(Data);
    setstatusFilter([0]);
    setSearchInputFilter("");
  }

  const Icon = ({ classIcon, color }) => {
    const iconSize = {
        width: "30px",
        height: "30px",
        color: color,
        cursor: ""
    };
    return (
        <FontAwesomeIcon icon={classIcon} style={iconSize} />
    )
  }

  const Icon24px = ({ classIcon, color }) => {
    const iconSize = {
        width: "24x",
        height: "24px",
        color: color,
        cursor: ""
    };
    return (
        <FontAwesomeIcon icon={classIcon} style={iconSize} />
    )
  }

  useEffect(() => {     
    setData(contentData);
  }, [contentData])

  useEffect(() =>{
    filterData();
  },[statusFilter,contentData])
  useEffect(() =>{
    filterData();
  },[searchInputFilter, contentData])

  return (
    <div className=' h-[100%] relative'>
        <div className='w-[100%] h-[8%] max-h-[8%] flex flex-col'><StatusFilter listStatusFilter={setstatusFilter} /></div>
        <div className='border-[1px] border-[#BDC2D2] w-[100%]'></div>
        <div className='w-[100%] h-[9%] max-h-[9%] flex pb-[4px]'><DataFilter searchInput={setSearchInputFilter} resetContent={resetContent}/></div>
        <div className='border-[1px] border-[#BDC2D2] w-[100%]'></div>
        <div className='w-[100%] h-[76%] max-h-[76%] flex p-[4px]'><DataList dataFromContent={FilteredData} confirmDeleteItem={confirmDeleteItem} ShowAlertBox={ShowAlertBox}/></div>
        <div className='w-[100%] h-[7%] max-h-[76%] flex p-[4px]'><PageFilter Data={Data} curpageData={setData}/></div>
        {showAlertBox ? 
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>  
        {alertBoxData ? alertBoxData.map((questdata, index) => 
          <div className='flex flex-col w-[30%] h-[35%] bg-[#FFFFFF] shadow-md absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 alertbox'>
                <div className='flex w-[100%] h-[20%] border-[#C3C3C3] border-b-[0.12rem] justify-center items-center gap-3'>
                <div><Icon classIcon={faTriangleExclamation} color={"#FD7676"}/></div>
                <div className='font-[650] text-[#FD7676] text-[18px]'>XOÁ CÂU HỎI</div>
                </div>
                <div className='w-[100%] h-[60%] flex flex-col justify-center'>
                <div className='flex-col justify-center text-center items-center p-[7px]'>
                  <div className='text-[17px]'>Bạn chắc chắn muốn xóa phân nhóm</div>
                  {alertBoxData.length == 1 && <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata.chunk}</div>}
                  {alertBoxData.length == 2 && 
                                              <div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata.chunk}</div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata.chunk1}</div>
                                              </div>                  
                  } 
                  {alertBoxData.length == 3 && 
                                              <div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata[0]}</div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata[1]}</div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>...</div>
                                              </div>                  
                  }      

                    <div>Đơn vị bị xóa sẽ <span style={{ color: '#FD7676' }}>KHÔNG</span> thể khôi phục lại.</div>
                </div>
                </div>
                <div className='w-[100%] h-[20%] flex border-[#C3C3C3] border-t-[0.12rem] cursor-pointer' onClick={() => (setShowAlertBox(false))}>
                  <div className='w-[50%] flex justify-center items-center border-[#C3C3C3] border-r-[0.12rem]'>
                  <div className='text-[16px] font-[600] text-[#959DB3] '>KHÔNG XOÁ</div>
                    </div>
                  <div className='w-[50%] flex justify-center items-center gap-3 bg-red-400 cursor-pointer' onClick={() => {confirmDeleteItem()}}>
                      <div className=''> <Icon24px classIcon={faTrash} color={"#FFFFFF"}/></div>      
                      <div className='text-[16px] font-[550] text-[#FFFFFF]'>XOÁ</div>         
                  </div>
              </div>
            </div>) : ""}     
        
        </div> : ""
        }
        
        
    </div>      
  )
}

export default Content