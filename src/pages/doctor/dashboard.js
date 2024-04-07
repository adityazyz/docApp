import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import Jwt from "jsonwebtoken";
import axios from "axios";
import ShowAppointmentDetailsModal from "../../../components/ShowAppointmentDetailsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (date) => {
  
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

const compareDates = (date1, date2 = new Date()) => {
  // Extract date components from date1
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  // Extract date components from date2
  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  // Compare dates
  if (year1 === year2 && month1 === month2 && day1 === day2) {
    return 0; // Dates are equal
  } else if (
    year1 < year2 ||
    (year1 === year2 && month1 < month2) ||
    (year1 === year2 && month1 === month2 && day1 < day2)
  ) {
    return -1; // date1 is before date2
  } else {
    return 1; // date1 is after date2
  }
};

function Dashboard() {

  const homeSidebarOpen = useSelector((state) => state.sidebar.homeSidebarOpen);

  const [upcomingArray, setUpcomingArray] = useState();
  const [todayArray, setTodayArray] = useState();

  const [currentTab, setCurrentTab] = useState("Upcoming"); // Upcoming | Today


  const [showAppointmentDetails, setshowAppointmentDetails] = useState(false);
  const [currentAppointmentDetails, setCurrentAppointmentDetails] = useState();

  const [changeMade, setChangeMade] = useState(false);

  const viewAppointment =(e,details)=>{
    e.preventDefault();
    setCurrentAppointmentDetails(details);
    setTimeout(() => { 
      setshowAppointmentDetails(true)
    }, 200);
  }


  const switchTab = (e) => {
    e.preventDefault();
    if (currentTab === "Upcoming") {
      setCurrentTab("Today");
    } else {
      setCurrentTab("Upcoming");
    }
  };

  const changeAppointmentStatus = (e, _id,  status, doctorEmail, patientEmail) =>{
	// confirm | cancelled

	e.preventDefault()

	axios.put("/api/changeAppointmentStatus", {
		_id : _id,
		Status : status
	})
	.then((response)=>{
		setChangeMade(!changeMade);
		if(response.data.success === true){
			toast(`Appointment ${status}. `)
		}
	})
	.catch((error)=>{
		console.log(error.message);
	})

	// add patient to MyPatients
	axios.put("/api/addMyPatients", {
		DoctorEmail : doctorEmail,
		email : patientEmail
	})
	.catch((error)=>{
		console.log(error.message);
	})

  }

  useEffect(() => {
    //  just update the last visit
    let token = localStorage.getItem("token");
    if (token) {
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

      axios
        .get(`/api/getDocAppointment?email=${decryptedToken.Email}`)
        .then((response) => {
          let upcomingArr = [];
          let todayArr = [];
          response.data.map((item) => {
            const result = compareDates(new Date(item.FollowUpDate));
            if (result === 1) {
              // after today
              upcomingArr.push(item);
            } else if (result === 0) {
              // today as well as after today
              upcomingArr.push(item);
              todayArr.push(item);
			  
            }
          });

          // items added to any of the array, update the main arrays
          if (upcomingArr.length > 0) {
            setUpcomingArray(upcomingArr);
          }
          if (todayArr.length > 0) {
            setTodayArray(todayArr);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      router.push("/login");
    }
  }, [changeMade]);

  return (
    <div
      className={` ${
        homeSidebarOpen ? "ml-6 md:ml-[300px]" : "ml-6"
      } h-[122vh] w-auto frame`}
    >
      {/* <!-- Page Content --> */}
      <div className="row">
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card dash-card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 col-lg-4">
                    <div className="dash-widget dct-border-rht flex flex-col md:flex-row">
                      <div className="circle-bar circle-bar1">
                        <div className="circle-graph1 w-28" data-percent="75">
                          <img
                            src="/img1.png"
                            className="img-fluid "
                            alt="patient"
                          />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6>Total Patient</h6>
                        <h3>1500</h3>
                        <p className="text-muted">Till Today</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-4">
                    <div className="dash-widget dct-border-rht flex flex-col md:flex-row">
                      <div className="circle-bar circle-bar2">
                        <div className="circle-graph2 w-28" data-percent="65">
                          <img
                            src="/img2.png"
                            className="img-fluid"
                            alt="Patient"
                          />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6>Today Patient</h6>
                        <h3>160</h3>
                        <p className="text-muted">06, Nov 2019</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-4">
                    <div className="dash-widget flex flex-col md:flex-row">
                      <div className="circle-bar circle-bar3 ">
                        <div className="circle-graph3 w-28" data-percent="50">
                          <img
                            src="/img3.png"
                            className="img-fluid"
                            alt="Patient"
                          />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6>Appoinments</h6>
                        <h3>85</h3>
                        <p className="text-muted">06, Apr 2019</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h4 className="mb-4">Patient Appoinment</h4>
            <div className="appointment-tab">
              {/* <!-- Appointment Tab --> */}
              <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      currentTab === "Upcoming" ? "active" : null
                    }`}
                    href=""
                    onClick={(e) => {
                      switchTab(e);
                    }}
                    data-toggle="tab"
                  >
                    Upcoming
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link mx-2 ${
                      currentTab === "Today" ? "active" : null
                    }`}
                    href=""
                    onClick={(e) => {
                      switchTab(e);
                    }}
                    data-toggle="tab"
                  >
                    Today
                  </a>
                </li>
              </ul>
              {/* <!-- /Appointment Tab --> */}

              <div className="tab-content">
                {/* <!-- Upcoming Appointment Tab --> */}
                  <div
                    className={`tab-pane ${currentTab === "Upcoming" ? "show active" : null}`}
                    id="upcoming-appointments"
                  >
                    {upcomingArray && <div className="card card-table mb-0">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover table-center mb-0">
                            <thead>
                              <tr>
                                <th>Patient Name</th>
                                <th>Appt Date</th>
                                <th>Purpose</th>
                                <th>Type</th>
                                <th className="text-center">Paid Amount</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {upcomingArray.map((item, index)=>{
								return <tr key={`upc-app-${index}`}>
                                <td>
                                  <h2 className="table-avatar">
                                    <a
                                      href="patient-profile.html"
                                      className="avatar avatar-sm mr-2"
                                    >
                                      <img
                                        className="avatar-img rounded-circle"
                                        src={item.PatientProfilePicture === " " ? "/dummy.jpeg" : item.PatientProfilePicture}
                                        alt="User Image"
                                      />
                                    </a>
                                    <a
                                      href="patient-profile.html"
                                      className="ml-2"
                                    >
                                      {item.PatientName} <span className="uppercase">#PT-{item.PatientEmail.split("@")[0]}</span>
                                    </a>
                                  </h2>
                                </td>
                                <td>
                                  {formatDate(new Date(item.FollowUpDate))}{" "}
                                  <span className="d-block text-info uppercase">
                                    {item.Time.Start}
                                  </span>
                                </td>
                                <td>{item.Purpose}</td>

                                <td>New Patient</td>

                                <td className="text-center">${item.TotalFee}</td>
                                <td className="text-right">
                                  <div className="table-action">
                                    <a
                                      href=""
									  onClick={(e)=>{
										viewAppointment(e,item)
									  }}
                                      className="btn mx-2 btn-sm bg-info-light"
                                    >
                                      <i className="far fa-eye"></i> View
                                    </a>

                                  { item.Status === "pending" && <>
								   <a
									onClick={(e)=>{
										changeAppointmentStatus(e,item._id, "confirm", item.DoctorEmail, item.PatientEmail)
									}}
                                      href=""
                                      className="btn mx-2 btn-sm bg-success-light"
                                    >
                                      <i className="fas fa-check"></i> Accept
                                    </a>
                                    <a
									onClick={(e)=>{
										changeAppointmentStatus(e,item._id, "cancelled", item.DoctorEmail, item.PatientEmail)
									}}
                                      href=""
                                      className="btn mx-2 btn-sm bg-danger-light"
                                    >
                                      <i className="fas fa-times"></i> Cancel
                                    </a>
								   </>}
                                  </div>
                                </td>
                              </tr>
							  })}
                        
                            </tbody> 
                          </table>
                        </div>
                      </div>
                    </div>}
					{upcomingArray === undefined && <div className="py-6 px-3 pl-8 bg-white">
						<span className="ml-6">No Upcoming Appointments.</span>
						</div>}
                  </div>
                
                {/* <!-- /Upcoming Appointment Tab --> */}

                {/* <!-- Today Appointment Tab --> */}

                  <div className={`tab-pane ${currentTab === "Today" ? "show active" : null}`} id="today-appointments">
                    {todayArray && <div className="card card-table mb-0">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover table-center mb-0">
                            <thead>
                              <tr>
                                <th>Patient Name</th>
                                <th>Appt Date</th>
                                <th>Purpose</th>
                                <th>Type</th>
                                <th className="text-center">Paid Amount</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
							{todayArray.map((item, index)=>{
								return <tr key={`upc-app-${index}`}>
                                <td>
                                  <h2 className="table-avatar">
                                    <a
                                      href="patient-profile.html"
                                      className="avatar avatar-sm mr-2"
                                    >
                                      <img
                                        className="avatar-img rounded-circle"
                                        src={item.PatientProfilePicture === " " ? "/dummy.jpeg" : item.PatientProfilePicture}
                                        alt="User Image"
                                      />
                                    </a>
                                    <a
                                      href="patient-profile.html"
                                      className="ml-2"
                                    >
                                      {item.PatientName} <span className="uppercase">#PT-{item.PatientEmail.split("@")[0]}</span>
                                    </a>
                                  </h2>
                                </td>
                                <td>
                                  {formatDate(new Date(item.FollowUpDate))}{" "}
                                  <span className="d-block text-info uppercase">
                                    {item.Time.Start}
                                  </span>
                                </td>
                                <td>{item.Purpose}</td>

                                <td>New Patient</td>

                                <td className="text-center">${item.TotalFee}</td>
                                <td className="text-right">
                                  <div className="table-action">
                                    <a
                                      href=""
									  onClick={(e)=>{
										viewAppointment(e,item)
									  }}
                                      className="btn mx-2 btn-sm bg-info-light"
                                    >
                                      <i className="far fa-eye"></i> View
                                    </a>

									{ item.Status === "pending" && <>
								   <a
									onClick={(e)=>{
										changeAppointmentStatus(e,item._id, "confirm", item.DoctorEmail, item.PatientEmail);
									}}
                                      href=""
                                      className="btn mx-2 btn-sm bg-success-light"
                                    >
                                      <i className="fas fa-check"></i> Accept
                                    </a>
                                    <a
									onClick={(e)=>{
										changeAppointmentStatus(e,item._id, "cancelled", item.DoctorEmail, item.PatientEmail);
									}}
                                      href=""
                                      className="btn mx-2 btn-sm bg-danger-light"
                                    >
                                      <i className="fas fa-times"></i> Cancel
                                    </a>
								   </>}
                                  </div>
                                </td>
                              </tr>
							  })}
							</tbody>
                          </table>
                        </div>
                      </div>
                    </div>}
					{todayArray === undefined && <div className="py-6 px-3 pl-8 bg-white">
						<span className="ml-6">No Appointments for Today.</span>
						</div>}
                  </div>
             
                {/* <!-- /Today Appointment Tab --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {/* <!-- /Page Content --> */}

	  {/* <!-- Appointment Details Modal --> */}
		{showAppointmentDetails === true && currentAppointmentDetails && <ShowAppointmentDetailsModal  details={currentAppointmentDetails} closeFunction={()=>{setshowAppointmentDetails(false)}}/>}
		{/* <!-- /Appointment Details Modal --> */}

		<ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  );
}

export default Dashboard;
