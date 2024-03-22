import React, { useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import data from'../Model/Data.json'
const QuestionBank = () => {
  const [cateNhanSu, setCateNhanSu] = useState(7)
  const [dataList, setDataList] = useState();
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedCategoryChild, setSelectedCategoryChild] = useState(-1);
  const [contentData, setContentData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [childCategoryData, setChildCategoryData] = useState([]);
  const [isFuncDisable, setIsFuncDisable] = useState(false);

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
        <div className='sidebar-header display: flex  bg-[#EDEFF3] '>                 
            <div className='w-[15%] min-h-[100vh] pt-[5px]'><Sidebar sidebarData={dataList} selectedCate={selectedCategory} selectedChildCate={setSelectedCategoryChild}/></div>
            <div className='w-[85%] min-h-[100vh] p-[5px] flex flex-col'>
              <div className={`w-[100%] h-[7%] max-h-[7%] bg-white flex flex-col justify-center ${isFuncDisable ? "pointer-events-none" : ""}`}><Header setSelectedCate={setSelectedCategory}/></div>
                {(selectedCategory === cateNhanSu && selectedCategoryChild === childCategoryData[0]?.id)  && <Content contentData={contentData} setIsFuncDisable ={setIsFuncDisable}/>}          
            </div>
            
        </div>
    </div>
  )
}

export default QuestionBank