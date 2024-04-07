import axios from 'axios'
import Jwt from 'jsonwebtoken'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MyPatientCard from '../../../components/MyPatientCard'


function MyPatients() {
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen)

  const [patientArray, setPatientArray] = useState();
  useEffect(() => {
     //  just update the last visit
     let token = localStorage.getItem("token");
     if (token) {
       let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

       axios.get(`/api/getMyPatients?DoctorEmail=${decryptedToken.Email}`)
       .then((response)=>{
        setPatientArray(response.data.PatientEmail);
       })
       .catch((error)=>{
        console.log(error.message);
       })
     }
  
  }, [])
  

  useState
  
  return (
    <div className={` ${homeSidebarOpen ? "ml-2 md:ml-[300px]" : "ml-2"} h-[122vh] w-auto frame pr-6 pt-3`}>
      			{/* <!-- Page Content --> */}
						
            <div class="row row-grid">
              {patientArray?.map((item, index)=>{
                return <MyPatientCard key={`my-patient-${index}`} patientEmail={item}/>
              })}
              
            </div>

 
			{/* <!-- /Page Content --> */}
   
      </div>
  )
}

export default MyPatients