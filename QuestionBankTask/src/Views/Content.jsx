import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../css/Content.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowRightRotate, faCheckCircle, faChevronRight, faCircleCheck, faCircleMinus, faCirclePlus, faEye, faInfoCircle, faPencil, faPlus, faShare, faTrash, faTrashCan, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

const Content = ({ contentData, setIsFuncDisable, showToast }) => {
  const [baseData, setBaseData] = useState([]);
  const [positionList, setPositionList] = useState([])
  const [competenceList, setCompetenceList] = useState([])
  const [competenceLevelList, setCompetenceLevelList] = useState([])
  const [updatedValue, setUpdatedValue] = useState(false);
  const [oldValue, setOldValue] = useState(0);

  const getFrameData = () => {
    const newPositionList = [];
    const newCompetenceList = [];
    baseData.forEach(data => {
      if (!newPositionList.some(item => item.PositionID === data.PositionID)) {
        newPositionList.push(data)
      }
      if (!newCompetenceList.some(item => item.CompetenceID === data.CompetenceID)) {
        newCompetenceList.push(data)
      }
    });
    setPositionList(newPositionList)
    setCompetenceList(newCompetenceList)
  }

  const getLevel = () => {
    let competenceLevelList = Array.from({ length: competenceList.length }, () => Array(positionList.length).fill().map(() => []));

    for (let i = 0; i < competenceList.length; i++) {
      for (let j = 0; j < positionList.length; j++) {
        baseData.forEach(data => {
          if (competenceList[i].CompetenceID === data.CompetenceID && positionList[j].PositionID === data.PositionID) {
            competenceLevelList[i][j].push(data)
          }
        })
      }
    }
    // competenceLevelList = competenceLevelList.map(row => row.filter(item => item.length > 0));

    setCompetenceLevelList(competenceLevelList)
    setUpdatedValue(false);
    console.log(competenceLevelList)
  }

  const updateValue = (e, datacode, field) => {
    let positionName, competenceName;
    const newValue = (e.target.value.trim() === "" || e.target.value <= 0 || e.target.value > 10) ? oldValue : parseInt(e.target.value);
    const updatedBaseData = baseData.map((item) => {
      if (item.Code === datacode) {
        positionName = item.PositionName;
        competenceName = item.CompetenceName;
        let updatedItem = { ...item, [field]: newValue };

        if (field === "CompetenceLevel" && (item.CompetenceLevelMax === "" || item.CompetenceLevelMax === null || item.CompetenceLevelMax < newValue)) {
          updatedItem = { ...updatedItem, CompetenceLevelMax: newValue };
        } else if (field === "CompetenceLevelMax" && (item.CompetenceLevel === "" || item.CompetenceLevel === null)) {
          updatedItem = { ...updatedItem, CompetenceLevel: newValue };
        }

        return updatedItem
      } else {
        return item;
      }
    });

    setBaseData(updatedBaseData)
    setUpdatedValue(true);
    if(e.target.value.trim() != ""){
      if (e.target.value <= 0 || e.target.value > 10) {
        showToast("Vui lòng nhập giá trị trong khoảng 0 - 10 !", "error")
      } else if (newValue != oldValue) {
        showToast("Cập nhập khung năng lực thành công!\n " + positionName + " - " + competenceName)
      }
    } 
  }
  const Icon = ({ classIcon, color, size }) => {
    const iconSize = {
      width: size,
      height: size,
      color: color,
      cursor: "pointer"
    };
    return (
      <FontAwesomeIcon icon={classIcon} style={iconSize} />
    )
  }



  const calcIconPos = (text) => {
    const textLength = text.length;
    // Assuming initial right position
    let rightPosition = 35 - (textLength - 3) * 3;

    // Set a minimum right position to prevent negative values

    return `${rightPosition}px`;
  };

  const handleChangeValue = (e, competenceIndex, positionIndex, minormax) => {
    const { value } = e.target;
    const updatedCompetenceLevelList = [...competenceLevelList];
    if (minormax == 0) {
      updatedCompetenceLevelList[competenceIndex][positionIndex][0].CompetenceLevel = value;
    }
    else {
      updatedCompetenceLevelList[competenceIndex][positionIndex][0].CompetenceLevelMax = value;
    }
    setCompetenceLevelList(updatedCompetenceLevelList);
  };

  //Lấy data từ Module AssessmentManage
  useEffect(() => {
    setBaseData(contentData)

  }, [contentData])

  //Xử lí data từ Module AssessmentManage
  useEffect(() => {
    getFrameData()
  }, [baseData])

  useEffect(() => {
    getLevel();
  }, [positionList, competenceList])

  return (
    <div className='content-container'>
      <div className='competence-cate-func'>
        <div className="competence-cate">
          <div className='font-[700] text-[#1A6634] cursor-pointer' title='ĐÁNH GIÁ NHÂN SỰ'>ĐÁNH GIÁ NHÂN SỰ</div>
          <div><Icon classIcon={faChevronRight} color={"#1A6634"} size={"16px"}></Icon></div>
          <div className='font-[700] text-[#1A6634] cursor-pointer' title='KHUNG NĂNG LỰC'>KHUNG NĂNG LỰC</div>
          <div><Icon classIcon={faChevronRight} color={"#BDC2D2"} size={"16px"}></Icon></div>
          <div className='font-[700] text-[#959DB3] cursor-pointer' title='CHI TIẾT KHUNG NĂNG LỰC'>CHI TIẾT KHUNG NĂNG LỰC</div> 
        </div>
        <div className='competence-func'>
          <div className='func-item bg-[#EB273A] ml-[10px]'>
            <div className='h-full flex self-center'><Icon classIcon={faTrashCan} color={"#ffffff"} size={"20px"} /></div>
            <div>XOÁ KHUNG NL</div>
          </div>
          <div className='func-item bg-[#1A6634]'>
            <div className='h-full flex self-center'><Icon classIcon={faShare} color={"#ffffff"} size={"20px"} /></div>
            <div>GỬI DUYỆT</div>
          </div>
          <div className='func-item bg-[#1A6634]'>
            <div className='h-full flex self-center'><Icon classIcon={faPlus} color={"#ffffff"} size={"20px"} /></div>
            <div>THÊM MỚI</div>
          </div>
        </div>
      </div>
      <div className='competence-detail-container'>
        <div className='detail-title-text'>THÔNG TIN KHUNG NĂNG LỰC </div>
        <div className='detail-frame'>
          <div className='datetime-status'>
            <div className='font-[700]'>Ngày hiệu lực khung năng lực</div>
            <div className=''>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="" sx={{
                  width: '43%',
                  backgroundColor: "#EDEFF3",
                }} />
              </LocalizationProvider>
            </div>
            <div className='font-[700]'>Tình trạng</div>
            <div className='text-[#1A6634] font-[700]'>Đã phê duyệt</div>
          </div>
          <div className='name-des'>
                <div className='font-[700]'>Tên khung năng lực</div>
                <div className=''><input type="text" name="" id="" className='competence-name-input'/></div>
                <div className='font-[700]'>Diễn giải</div>
                <div><textarea name="" id="" className='competence-detail-input' ></textarea></div>
          </div>
        </div>
      </div>
      <div className='competence-frame-container'>
        <div className='detail-title-text'>CHI TIẾT KHUNG NĂNG LỰC</div>
        <div className='competence-frame'>
          <div className='competence-container'>
            <div className='title-container col-position-width row-item-height'>
              <div className='h-[49.5%] text-right mr-[30px]  text-[#5A6276] font-[600]'>Năng lực</div>
              <div className='split-line'></div>
              <div className='h-[49.5%] text-left ml-[30px] text-[#5A6276] font-[600]'>Chức danh</div>
            </div>
            <div className='position-items'>
              {positionList.map((item, index) => (
                <div className='position-item col-position-width row-item-height '>
                  <div className='truncate' title={item.PositionID}>{item.PositionID}</div>
                  <div className={`w-[2px] h-[18px] bg-[#C4C4C4] rounded-[3px]`}></div>
                  <div className='truncate' title={item.PositionName}>{item.PositionName}</div>
                </div>
              ))}
              <div className='col-position-width add-item-position cursor-pointer' title='Thêm chức danh' onClick={() => showToast("Chọn chức năng thêm chức danh")}>
                <div className='h-full flex flex-col justify-center'><Icon classIcon={faCirclePlus} color={"#1A6634"} size={"20px"} /></div>
                <div className=''>Thêm chức danh</div>
              </div>
            </div>

          </div>
          <div className='position-level-container'>
            <div className='competence-items row-item-height'>
              {competenceList.map((item, index) => (
                <div className='competence-item row-item-height'>
                  <div className='h-[50%] relative font-[700] truncate' title={`${item.CompetenceName}`}>
                    {item.CompetenceName}
                    {/* <div className={`absolute `}><Icon classIcon={faInfoCircle} color={"#31ADFF"} size={"8px"}/></div> */}
                  </div>
                  <div className='level-container'>
                    <div className='min-max-item'>Min</div>
                    <div className='min-max-item'>Max</div>
                  </div>
                </div>
              ))}
              <div className='flex items-center justify-center row-item-height'>
                <div className='add-competence-item cursor-pointer' title='Thêm năng lực' onClick={() => showToast("Chọn chức năng thêm năng lực")}>
                  <div className='h-full flex flex-col justify-center'><Icon classIcon={faCirclePlus} color={"#1A6634"} size={"20px"} /></div>
                  <div className=''>Thêm năng lực</div>
                </div>

              </div>
            </div>
            <div className='competence-level-container'>
              {competenceLevelList.map((data, index) => (
                <div className={`flex flex-col ${index % 2 != 0 ? "bg-[#DBDEE7]" : ""}`} key={index}>
                  {positionList.map((item, i) => {
                    return ((data[i] && data[i].length > 0) ? (<div className='competence-level-item row-item-height' key={i}>
                      {/* {console.log("Min: " + data[i][0].CompetenceLevel + " Max: " + data[i][0].CompetenceLevelMax)} */}

                      <div data-code={data[i][0].Code} className='min-max-item'><input className='input-competence' id={data[i][0].Code + "Min"} type="number" value={data[i][0].CompetenceLevel} onChange={(e) => handleChangeValue(e, index, i, 0)} onBlur={(e) => updateValue(e, data[i][0].Code, 'CompetenceLevel')} onFocus={() => setOldValue(data[i][0].CompetenceLevel)} /></div>
                      <div data-code={data[i][0].Code} className='min-max-item'><input className='input-competence' id={data[i][0].Code + "Max"} type="number" value={data[i][0].CompetenceLevelMax} onChange={(e) => handleChangeValue(e, index, i, 1)} onBlur={(e) => updateValue(e, data[i][0].Code, 'CompetenceLevelMax')} onFocus={() => setOldValue(data[i][0].CompetenceLevelMax)} /></div>
                      {/* <div className='min-max-item'>{data[i][0].CompetenceLevel == null ? "null" : data[i][0].CompetenceLevel}</div>
                    <div className='min-max-item'>{data[i][0].CompetenceLevelMax == null ? "null" : data[i][0].CompetenceLevelMax}</div> */}
                    </div>) : "")


                  })}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Content