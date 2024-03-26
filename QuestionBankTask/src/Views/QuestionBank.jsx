import React, { useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import data from'../Model/Data.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import AlertMessage from './AlertMessage'
import { Flip, ToastContainer, Zoom, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const QuestionBank = () => {
  const [cateNhanSu, setCateNhanSu] = useState(7)
  const [dataList, setDataList] = useState();
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedCategoryChild, setSelectedCategoryChild] = useState(-1);
  const [contentData, setContentData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [childCategoryData, setChildCategoryData] = useState([]);
  const [isFuncDisable, setIsFuncDisable] = useState(false);
  const [toastMessage, setToastMessage] = useState([{message: "", type:"error"}])

  const getContentData = (childCateId) => {
    const moduleData = dataList?.Module || [];
    const categories = moduleData.flatMap(module => module.category || []);
    const childCategories = categories.flatMap(category => category.catechild || []);
    const selectedChildCategories = childCategories.filter(child => child.id === childCateId);

    if (selectedChildCategories.length > 0) {
      setContentData(selectedChildCategories[0].content || []);
      setCategoryData(categories)
      setChildCategoryData(selectedChildCategories);
    } else {
      setContentData([]);
      setCategoryData([])
      setChildCategoryData([]);
    }
    
  };


  const contextClass = {
    success: "bg-[#1A6634]",
    error: "bg-[#FD7676]",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  const showToast = (message, type) => {
    const textLength = message.length;
    let maxWidth = 270
    let width = Math.min(textLength * 10, 500);
    if (textLength >= 30) {
      width = maxWidth;
    }
    if(type === "error"){
      toast.error(message, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style:{width: `${width}px`},
        icon: <FontAwesomeIcon icon={faXmarkCircle} className='w-[20px] min-h-[20px] self-center'/>,
        transition: Zoom,
        })
    }else{
      toast.success(message, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style:{width: `${width}px`},
        icon : <FontAwesomeIcon icon={faCheckCircle} className='w-[20px] min-h-[20px] self-center'/>,
        transition: Zoom,
        })
    }
  }
  useEffect(() =>{
    getContentData(selectedCategoryChild) 
  },[selectedCategoryChild])

  useEffect(() =>{
    
    
  },[selectedCategory])

  useEffect(() => {     
    setDataList(data);
    
  }, [dataList])


  return (
    <div className='Home'>
        <div className='sidebar-header display: flex  bg-[#EDEFF3] select-none '>                 
            <div className='w-[15%] min-h-[100vh] pt-[5px]'><Sidebar sidebarData={dataList} selectedCate={selectedCategory} selectedChildCate={setSelectedCategoryChild}/></div>
            <div className='w-[85%] min-h-[100vh] p-[5px] flex flex-col'>
              <div className={`w-[100%] h-[7%] max-h-[7%] bg-white flex flex-col justify-center ${isFuncDisable ? "" : ""}`}><Header setSelectedCate={setSelectedCategory}/></div>
                {(selectedCategory === cateNhanSu && selectedCategoryChild === childCategoryData[0]?.id)  && <Content contentData={contentData} setIsFuncDisable ={setIsFuncDisable} showToast ={showToast}/>}          
            </div>
            {/* <AlertMessage/> */}
            <ToastContainer
                closeButton={false}
                toastClassName={(context) =>
                contextClass[context?.type || "default"] +
                " relative flex left-[11vh] rounded-[12px] justify-between overflow-hidden cursor-pointer mb-[10px] w-auto"
              }
              bodyClassName={() => "text-sm font-white font-med block p-3 flex "}
              position="bottom-left"
              autoClose={2000}             
            />
        </div>
    </div>
  )
}

export default QuestionBank