import React, { useEffect, useState } from 'react'
import StatusFilter from './StatusFilter'
import DataFilter from './DataFilter'
import DataList from './DataList'
import PageFilter from './PageFilter'
import '../css/Content.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faCircleCheck, faCircleMinus, faEye, faPencil, faShare, faTrash, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons"

const Content = ({contentData , setIsFuncDisable, showToast}) => {
  const [Data, setData] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [preFilteredData, setPreFilteredData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);

  const [isNoFilter, setIsNoFilter] = useState(false);
  const [isFiltering, setIsFiltering] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [contentIsEmpty, setContentIsEmpty] = useState(false);
  const [statusFilter, setstatusFilter] = useState([]);
  const [searchInputFilter, setSearchInputFilter] = useState("");
  const [alertBoxData, setAlertBoxData] = useState([]);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [listItemToDelete, setListItemToDelete] = useState([]);
  const [resetStatusFunc, setResetStatusFunc] = useState(false);
  const [isFuncFilterDisable, setIsFuncFilterDisable] = useState(false);
  const [resetContentTrig, setResetContentTrig] = useState(false);
  const [disableFocus, setDisableFocus] = useState(false);
  const [isActionClicked, setIsActionClicked] = useState(false);
  const [actionedData, setActionedData] = useState([]);
  const filterData = () =>{

    let filterByStatus = [];
    if (statusFilter.length === 0) {
      filterByStatus = contentData;
    } else {
      let updatedStatusFilter = [...statusFilter]; 
      if (updatedStatusFilter.includes(0)) {
          updatedStatusFilter.push(4);
      }
      const tempListData = Data.filter(item => updatedStatusFilter.includes(parseInt(item.status)));
      filterByStatus = tempListData;
    }

    let filterBySearch = [];
    if(searchInputFilter.trim() === ""){
      filterBySearch = filterByStatus;
    }else{
      let searchText = searchInputFilter.toLowerCase();
      filterBySearch = filterByStatus.filter(item =>
        item.id.toLowerCase().includes(searchText) ||
        item.stringques.toLowerCase().includes(searchText)
      );
    }
    
    setFilteredData(filterBySearch);
    setBaseData(filterBySearch)
    setPreFilteredData(filterBySearch);

  }

  const ShowAlertBox = (questList)=>{
    setListItemToDelete(questList)
    setAlertBoxData(getAlertBoxContent(questList));
    setShowAlertBox(true);
  }

  const handleFormartMessage = (messageInput, typeInput) =>{
    return [{message : messageInput, type : typeInput}]
  }

  const confirmDeleteItem = () =>{
    
    const idsToDelete = listItemToDelete.map(question => question.id);
    const updatedFilteredData = preFilteredData.filter(item => !idsToDelete.includes(item.id));
    const updatedFilteredBaseData = baseData.filter(item => !idsToDelete.includes(item.id));
    const message = "Xoá thành công " + listItemToDelete.length +" item"
    const type = "success"
    setIsConfirmDelete(true);
    setShowAlertBox(false);
    showToast(message, type)
    setBaseData(updatedFilteredBaseData)
    setIsDelete(true);
    setPreFilteredData(updatedFilteredData);
  }

  const unConfirmDelete = () =>{
    setShowAlertBox(false);
    setIsConfirmDelete(false);
  }
  
  const getAlertBoxContent = (questList) =>{
    const contentList = questList.slice(0, 3).map(question => {
      const limitedContent = question.stringques.slice(0, 38);
      return limitedContent;});
    return contentList;
  }

  const resetFilter = () =>{
    setFilteredData(Data)
    setResetStatusFunc(!resetStatusFunc)
    filterData();
  }

  const handleDocumentClick = () => {
    setDisableFocus(!disableFocus);
  };


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
    setIsFiltering(!isFiltering)
  },[statusFilter,contentData])

  useEffect(() =>{
    filterData();
    setIsFiltering(!isFiltering)
  },[searchInputFilter, contentData])

  useEffect(() =>{
      setIsFuncDisable(isFuncFilterDisable)
  }, [isFuncFilterDisable])

  useEffect(() =>{
    resetFilter();
  }, [resetContentTrig])

  useEffect(() => {
    if(statusFilter.length != 0){
      filterData();
    }  
  }, [isActionClicked]);


  return (
    <div className='relative wrapper whitespace-nowrap'>
        <div className={`w-[100%] flex flex-col ${isFuncFilterDisable ? "pointer-events-none opacity-80" : ""}`} onClick={handleDocumentClick}><StatusFilter listStatusFilter={setstatusFilter} resetStatus={resetStatusFunc} /></div>
        <div className='border-b-[0.12rem] border-[#BDC2D2] w-[100%]'></div>
        <div className={`w-[100%] py-[1.5vh] flex ${isFuncFilterDisable ? "pointer-events-none opacity-80" : ""}`} onClick={handleDocumentClick}><DataFilter searchInput={setSearchInputFilter} resetContent={setResetContentTrig}/></div>
        <div className='border-b-[0.12rem] border-[#BDC2D2] w-[100%]'></div>
        <div className='w-[100%] h-[68.13vh] flex p-[0.4vh] dataList_container'><DataList dataFromContent={preFilteredData} originData={contentData} ShowAlertBox={ShowAlertBox} setIsFuncDisable={setIsFuncFilterDisable} showToast={showToast} isConfirmDelete={isConfirmDelete} setIsConfirmDelete={setIsConfirmDelete} disableFocus={disableFocus} onclickDisableFocus={handleDocumentClick} actionedData={setActionedData} isActionClicked={setIsActionClicked} contentIsEmpty={setContentIsEmpty}/></div>
        <div className={`w-[100%] h-[6.8vh] flex pl-[0.4vh] pr-[0.4vh] fixed bottom-0 `} onClick={handleDocumentClick}><PageFilter Data={FilteredData} setCurpageData={setPreFilteredData} originData={contentData} contentIsFilter={isFiltering} isDelete={isDelete} baseData={baseData} isPageChanging={setIsPageChanging} contentIsEmpty={contentIsEmpty} isActionClicked={isActionClicked} isNoFilter={isNoFilter}/></div>      
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
                  {alertBoxData.length == 1 && <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata}</div>}
                  {alertBoxData.length == 2 && 
                                              <div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata}</div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata}</div>
                                              </div>                  
                  } 
                  {alertBoxData.length >= 3 && 
                                              <div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata}</div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>{questdata}</div>
                                                <div className='text-[16px] text-[#36C8CF] font-bold'>...</div>
                                              </div>                  
                  }      

                    <div>Đơn vị bị xóa sẽ <span style={{ color: '#FD7676' }}>KHÔNG</span> thể khôi phục lại.</div>
                </div>
                </div>
                <div className='w-[100%] h-[20%] flex border-[#C3C3C3] border-t-[0.12rem] cursor-pointer' >
                  <div className='w-[50%] flex justify-center items-center border-[#C3C3C3] border-r-[0.12rem]' onClick={unConfirmDelete}>
                      <div className='text-[16px] font-[600] text-[#959DB3] '>KHÔNG XOÁ</div>
                    </div>
                  <div className='w-[50%] flex justify-center items-center gap-3 bg-red-400 cursor-pointer' onClick={confirmDeleteItem}>
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