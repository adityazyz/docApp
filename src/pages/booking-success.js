import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[monthIndex]} ${year}`;
};

function bookingSuccess() {
  const router = useRouter();

  const [data, setData] = useState(); 

  useEffect(() => {
    // if no data available, send to dashboard instead
    
    if (!router.query.data) {
      router.push("/patient/dashboard")
    }else{
      setData(JSON.parse(router.query.data))
    }

  }, [])
  

  return (
    <>
      {/* <!-- Page Content --> */}
      <div className="content success-page-cont">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              {/* <!-- Success Card --> */}
              <div className="card success-card">
                <div className="card-body">
                  <div className="success-cont">
                    <i className="fas fa-check"></i>
                    <h3 className="font-bold mb-3"> 
                      Appointment booked Successfully!
                    </h3>
                    <p className="mb-1">
                      Appointment booked with <strong>{data?.DoctorName}</strong>
                      <br /> on <strong>{formatDate(data?.FollowUpDate)}, {data?.StartTime} to {data?.EndTime}</strong>
                    </p>
                    <div className="flex flex-col justify-center items-center">
                      <button
                        
                        onClick={()=>{
                          router.push(
                            { pathname: "/invoice-view", query: {InvoiceId : data?.InvoiceId, Type : "New"} },
                            "//invoice-view"
                          )
                          router.push("/invoice-view")
                        }}
                        className="btn btn-primary view-inv-btn mt-5"
                      >
                        View Invoice 
                      </button>
                      <button 
                      onClick={()=>{
                        router.push("/patient/dashboard");
                      }}
                      className="btn text-white bg-cyan-600 view-inv-btn mt-3">
                        Open Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Success Card --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}
    </>
  );
}

export default bookingSuccess;
