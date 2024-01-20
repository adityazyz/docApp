import React, { useEffect, useState } from 'react'
import SpecDataTable from "../../../components/SpecDataTable"
import axios from 'axios'
import { useSelector } from 'react-redux';


function Specialities() {

  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen)

  const [updateMade, setUpdateMade] = useState(false); // to rerender data
  const toggleUpdateMade = ()=>{
    updateMade === false ? setUpdateMade(true) : setUpdateMade(false);
  }

  const [myData, setMyData] = useState();

  useEffect(() => { 
    axios.get("/api/specGet")
    .then((response)=>{
      setMyData(response.data.data);
      function extractFieldValues(arr, fieldName) {
        return arr.map(obj => obj[fieldName]);
      }

    })
    .catch((error)=>{
      console.log(error.message);
    })
  
  }, [updateMade])
  
  return (
    <div className={`${adminSidebarOpen === true ? "ml-[10px] md:ml-[265px]" : "ml-[15px]" } border border-[#F0F0F0] mr-5 mb-16 rounded-sm`}>
      {myData && <SpecDataTable searchField = {"name"} data = {myData} toggle = {toggleUpdateMade}/>}
    </div>
  )
}

export default Specialities