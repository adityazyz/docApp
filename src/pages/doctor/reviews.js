import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CommentList from '../../../components/CommentList'
import Jwt from "jsonwebtoken";

function Reviews() {

  
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen)
  const [currentDoctorId, setcurrentDoctorId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
    
        setcurrentDoctorId(decryptedToken.UserId);
    
      
    }
  }, [])
  

  return (
    <div className={` ${homeSidebarOpen ? "ml-2 md:ml-[300px]" : "ml-2"} h-[122vh] w-auto frame pr-6 pt-3`}>
      <div class="doc-review review-listing">
							
              {/* <!-- Review Listing --> */}
              <ul class="comments-list">
              
              {currentDoctorId && <CommentList type = {"Main"}  doctorId={currentDoctorId} currentUserId={currentDoctorId} />}
                {/* //type */}
                
                
              </ul>
              {/* <!-- /Comment List --> */}
              
            </div>
      </div>
  )
}

export default Reviews