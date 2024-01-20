import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function HomePath() {

  const router = useRouter();

  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    
    if(router.pathname.includes("dashboard")){
      setCurrentPath("Dashboard");
    }else if(router.pathname.includes("appointments")){
      setCurrentPath("Appointments");
    }else if(router.pathname.includes("my-patients")){
      setCurrentPath("My Patients");
    }else if(router.pathname.includes("schedule-timings")){
      setCurrentPath("Schedule Timings");
    }else if(router.pathname.includes("invoices")){
      setCurrentPath("Invoices");
    }else if(router.pathname.includes("reviews")){
      setCurrentPath("Reviews");
    }else if(router.pathname.includes("message")){
      setCurrentPath("Message");
    }else if(router.pathname.includes("profile-settings")){
      setCurrentPath("Profile Settings");
    }else if(router.pathname.includes("social-media")){
      setCurrentPath("Social Media");
    }else if(router.pathname.includes("change-password")){
      setCurrentPath("Change Password");
    }
    else if(router.pathname.includes("favourites")){
      setCurrentPath("Favourites");
    }

  }, [router.pathname])
  
  return (
<>
<div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {currentPath}
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">{currentPath}</h2>
            </div>
          </div>
        </div>
      </div>
</>
  )
}

export default HomePath