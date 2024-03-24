import React, { useEffect, useState } from 'react'
import "../css/Sidebar.css"
const Sidebar = ({sidebarData, selectedCate, selectedChildCate}) => {
    const [isExpanded, setIsExpanded] = useState(false); 
    const [isChildExpanded, setIsChildExpanded] = useState(false);
    const [sidebarList, setSideBarList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedChild, setSelectedChild] = useState(-1);
    const handleCategoryClick = () => {
        setIsExpanded(!isExpanded); 
        if(isChildExpanded){
            setIsChildExpanded(false);
        }
    };
    const handleChildCategoryClick = (id) => {
        setIsChildExpanded(!isChildExpanded);
        if(id != selectedChild){
            selectedChildCate(id);
            setSelectedChild(id);
        }else{           
            selectedChildCate(-1);
            setSelectedChild(-1)
        }
        
    };


    useEffect(() => {
        
        if (sidebarData && sidebarData.Module && sidebarData.Module.length > 0) {
            setSideBarList(sidebarData.Module[0].category);
            setSelectedCategory(selectedCate);
            handleChildCategoryClick(-1);
            setIsChildExpanded(false);
        }
        
    }, [sidebarData, selectedCate])
    
  return (
    <div className='w-[100%] h-[100%] bg-[#5A6276]'>
        <div></div>
        <div className='w-[100%] h-[65px] imgContainer bg-white'>
            <div className='w-[100%] h-[100%] flex justify-center gap-[60px]' title='HachiHachi'>
                <img src="./assest/Hachilogo.png" alt="" className='h-[100%] cursor-pointer' />
                <img src="./assest/down-arrow.png" alt="" className='size-5 self-center cursor-pointer'/>
            </div>
        </div>
        
        {selectedCategory === 7 &&
        <div className='container'>        
            <div className=''>
                {sidebarList.map((data) => (
                    <ul className='' key={data.name}>                       
                      <div className='flex w-[100%] h-[50px] items-center bg-[#1A2334] cursor-pointer' title={`${data.name}`} onClick={() => {handleCategoryClick()}}>
                          <div className={`${isExpanded ? 'bg-[#5CB800]' : ' bg-white'} w-[6px] h-[100%] transition duration-200`}></div>
                              <div className='flex items-center gap-4 pl-4 pr-2 text-[16px]'>
                                  <img src={`${isExpanded ? `./assest/${data.icons[0]}` : `./assest/${data.icons[1]}`}`} className={`${isExpanded ? 'size-[20px]' : ' size-[21px]'} transition duration-200`} alt="" />
                                  <div className='flex gap-5 items-center '>
                                      <div className={`${isExpanded ? 'text-[#5CB800]' : ' text-white'} font-[550] transition duration-200 w-[100%] text-[16px]`}>{data.name}</div>
                                      <img  src={`${isExpanded ? "./assest/up-arrow-green.png" : "./assest/up-arrow.png"}`} className={`${isExpanded ? '' : 'transform rotate-180'} transition duration-300 ease-in-out size-[14px]`} alt="" />
                                  </div>
                                  
                              </div>                       
                      </div>            
                      {isExpanded ? 
                            data.catechild.map((childData) =>(
                            <li key={childData.id}>
                                <div className='flex w-[100%] h-[50px] items-center bg-[#1A2334] cursor-pointer' title={`${childData.name}`}  onClick={() => {handleChildCategoryClick(childData.id)}}>
                                <div className={`${isChildExpanded ? 'opacity-100' : 'opacity-[0.35]' } transition duration-200 bg-white w-[6px] h-[100%]`}></div>
                                    <div className='flex items-center gap-4 pl-4 pr-2 text-[16px]'>
                                        <img src={`./assest/${childData.icon[0]}`} className={`${isChildExpanded ? 'opacity-100' : 'opacity-[0.35]'} transition duration-200`} alt="" />
                                        <div className='flex gap-5 items-center '>
                                            <div className={`${isChildExpanded ? 'opacity-100' : 'opacity-[0.35] '} text-white font-[500] transition duration-200`} >{childData.name}</div>                     
                                        </div>
                                        
                                    </div>                       
                                </div> 
                            </li>
                            ))
                          
                                        
                        : ""} 
                  </ul>
                ))}
                
            </div>       
        </div>}
        
    </div>
    
  )
}

export default Sidebar