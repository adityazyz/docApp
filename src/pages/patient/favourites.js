import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FavDocCard from '../../../components/FavDocCard';
import Jwt from "jsonwebtoken";
import axios from 'axios';

function Favourites() {
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen);

  const [docEmails, setDocEmails] = useState();
  const [patientEmail, setPatientEmail] = useState();

  const fetchFavDoctors = (email) =>{
    axios.get(`/api/getFavDoctors?PatientEmail=${email}`)
    .then((response)=>{
     setDocEmails(response.data.DoctorEmail)
    })
    .catch((error)=>{
     console.log(error.message); 
    })
   }
  

  const removeFavourite = ( doctorEmail) =>{

    axios.put("/api/removeFavDoctors",{PatientEmail : patientEmail, email : doctorEmail})
          .then((response)=>{
            if(response.data.success === true){
              fetchFavDoctors(patientEmail)
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
  }
  
  const changeDocEmailArray = (DocEmail) =>{
    setDocEmails(docEmails.filter(item => item !== DocEmail));
  }

  useEffect(() => {
    // fetch favDoc list
         let token = localStorage.getItem("token");
    
         if (token) {
           let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
           setPatientEmail(decryptedToken.Email);
    
           // fething fav doc data
           fetchFavDoctors(decryptedToken.Email);
    
         }
    
      }, []) 
    
return (
    <div className={`${homeSidebarOpen ? "ml-2 md:pl-[273px]" : "ml-2"} container-fluid  mt-2 frame h-[100vh]`}>
					
							<div class="row row-grid ">
								{docEmails && docEmails.map((item, index)=>{
                  return <FavDocCard key={`fav-doc-${index}`} email = {item} removeFavourite={removeFavourite} 
                  changeDocEmailArray = {changeDocEmailArray}
                  />

                  })}
						</div>
					 
    </div>
  )
}

export default Favourites