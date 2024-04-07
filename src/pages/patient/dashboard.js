import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import axios from "axios";
import ShowAppointmentDetailsModal from "../../../components/ShowAppointmentDetailsModal";

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

function Dashboard() {
  const homeSidebarOpen = useSelector((state) => state.sidebar.homeSidebarOpen);

  const router = useRouter();
  // appointments | presriptions | medicalRecords | billing
  const [currentTab, setCurrentTab] = useState("appointments");
  const [data, setData] = useState();

  const [showAppointmentDetails, setshowAppointmentDetails] = useState(false);
  const [currentAppointmentDetails, setCurrentAppointmentDetails] = useState();

  const viewAppointment =(e,details)=>{
    e.preventDefault();
    setCurrentAppointmentDetails(details);
    setTimeout(() => { 
      setshowAppointmentDetails(true)
    }, 200);
  }



  useEffect(() => {
    //  just update the last visit
    let token = localStorage.getItem("token");
    if (token) {
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

      axios
        .get(`/api/getPtAppointment?email=${decryptedToken.Email}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      router.push("/login");
    }

    // check for already existing tab value
    const prevTab = localStorage.getItem("ptDashboardTab");
    if(prevTab){
      setCurrentTab(prevTab);
    }
  }, []);


  return (
    <div
      className={`${
        homeSidebarOpen ? "ml-2 md:pl-[300px]" : "ml-2"
      } container-fluid mt-2 frame h-[100vh] `}
    >
      {/* <!--  Page Content --> */}
      <div className="row ">
        <div className="col-md-7 col-lg-8 col-xl-9  w-full">
          <div className="card">
            <div className="card-body pt-0">
              {/* <!--  Tab Menu --> */}
              <nav className="user-tabs mb-4">
                <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${currentTab === "appointments" ? "active" : null}`}
                      href=""
                      data-toggle="tab"
                      onClick={(e)=>{
                        e.preventDefault(); 
                        setCurrentTab("appointments");
                        localStorage.setItem("ptDashboardTab",'appointments')
                      }}
                    >
                      Appointments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${currentTab === "prescriptions" ? "active" : null}`}
                      href=""
                      onClick={(e)=>{
                        e.preventDefault();
                        setCurrentTab("prescriptions");
                        localStorage.setItem("ptDashboardTab",'prescriptions')
                      }}
                      data-toggle="tab"
                    >
                      Prescriptions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${currentTab === "medicalRecords" ? "active" : null}`}
                      href=""
                      onClick={(e)=>{
                        e.preventDefault();
                        setCurrentTab("medicalRecords");
                        localStorage.setItem("ptDashboardTab",'medicalRecords')
                      }}
                      data-toggle="tab"
                    >
                      <span className="med-records">Medical Records</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a 
                    className={`nav-link ${currentTab === "billings" ? "active" : null}`}
                    href=""
                    onClick={(e)=>{
                      e.preventDefault();
                      setCurrentTab("billings");
                      localStorage.setItem("ptDashboardTab",'billings')
                    }}
                    data-toggle="tab">
                      Billing
                    </a>
                  </li>
                </ul>
              </nav>
              {/* <!--  /Tab Menu --> */}

              {/* <!--  Tab Content --> */}
              <div className="tab-content pt-0">
                {/* <!--  Appointment Tab --> */}
                <div id="pat_appointments" className={`tab-pane fade show ${currentTab === "appointments" ? "active" : null}`}>
                <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Doctor</th>
                              <th>Appt Date</th>
                              <th>Booking Date</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* // -----  */}
                            {data && data.map((apData, index)=>{
                              return <tr key={`apNo-${index}`}>
                              <td>
                                <h2 className="table-avatar "> 
                                  
                                  <div
                                    onClick={()=>{
                                      router.push(`/doctor-profile?doctorEmail=${apData["DoctorEmail"]}`, `/doctor-profile`)
                                    }}
                                    className="avatar avatar-sm "
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={apData["DoctorProfilePicture"]}
                                      alt="User Image"
                                    />
                                  </div>
                                  <div 
                                  className="ml-2 pt-1"
                                  onClick={()=>{
                                    router.push(`/doctor-profile?doctorEmail=${apData["DoctorEmail"]}`, `/doctor-profile`)
                                  }}
                                  >
                                    {apData["DoctorName"]}{" "}
                                    <span>
                                      {apData["DoctorSpecializations"][0]}
                                    </span>
                                  </div>
                                </h2>
                              </td>
                              <td>
                                {formatDate(
                                  new Date(apData["FollowUpDate"])
                                )}
                                <span className="d-block ml-1 text-info uppercase">
                                  {apData["Time"]["Start"]}
                                </span>
                              </td>
                              <td>
                                {formatDate(new Date(apData["BookingDate"]))}
                              </td>
                              <td>${apData["TotalFee"]}</td>
                              <td>
                                {apData["Status"] === "pending" ? (
                                  <span className="badge badge-pill bg-warning-light">
                                    Pending
                                  </span>
                                ) : apData["Status"] === "confirm" ? (
                                  <span className="badge badge-pill bg-success-light">
                                    Confirm
                                  </span>
                                ) : (
                                  <span className="badge badge-pill bg-danger-light">
                                    Cancelled
                                  </span>
                                )}
                              </td> 
                              <td className="text-right">
                                <div className="table-action ">
                                 
                                  <a
                                    href=""
                                    className="btn btn-sm bg-info-light"
                                    onClick={(e)=>{
                                      viewAppointment(e,apData);
                                    }}
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            })
                              
                            } 
                            {
                              !data && <span className="pl-3">Nothing to show here</span>
                            }

                            {/* // -----  */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--  /Appointment Tab --> */}

                {/* <!--  Prescription Tab --> */}
                <div className={`tab-pane fade show ${currentTab === "prescriptions" ? "active" : null}`} id="pat_prescriptions">
                  <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Date </th>
                              <th>Name</th>
                              <th>Created by </th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>14 Nov 2019</td>
                              <td>Prescription 1</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-01.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Ruby Perrin <span>Dental</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>13 Nov 2019</td>
                              <td>Prescription 2</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-02.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Darren Elder <span>Dental</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>12 Nov 2019</td>
                              <td>Prescription 3</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-03.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Deborah Angel <span>Cardiology</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>11 Nov 2019</td>
                              <td>Prescription 4</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-04.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Sofia Brient <span>Urology</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>10 Nov 2019</td>
                              <td>Prescription 5</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-05.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Marvin Campbell <span>Dental</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>9 Nov 2019</td>
                              <td>Prescription 6</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-06.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Katharine Berthold{" "}
                                    <span>Orthopaedics</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>8 Nov 2019</td>
                              <td>Prescription 7</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-07.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Linda Tobin <span>Neurology</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>7 Nov 2019</td>
                              <td>Prescription 8</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-08.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Paul Richard <span>Dermatology</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>6 Nov 2019</td>
                              <td>Prescription 9</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-09.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. John Gibbs <span>Dental</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>5 Nov 2019</td>
                              <td>Prescription 10</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-10.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Olga Barlow <span>Dental</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--  /Prescription Tab --> */}

                {/* <!--  Medical Records Tab --> */}
                <div id="pat_medical_records" className={`tab-pane fade show ${currentTab === "medicalRecords" ? "active" : null}`}>
                  <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Date </th>
                              <th>Description</th>
                              <th>Attachment</th>
                              <th>Created</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0010</a>
                              </td>
                              <td>14 Nov 2019</td>
                              <td>Dental Filling</td>
                              <td>
                                <a href="#">dental-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-01.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Ruby Perrin <span>Dental</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0009</a>
                              </td>
                              <td>13 Nov 2019</td>
                              <td>Teeth Cleaning</td>
                              <td>
                                <a href="#">dental-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-02.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Darren Elder <span>Dental</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0008</a>
                              </td>
                              <td>12 Nov 2019</td>
                              <td>General Checkup</td>
                              <td>
                                <a href="#">cardio-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-03.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Deborah Angel <span>Cardiology</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0007</a>
                              </td>
                              <td>11 Nov 2019</td>
                              <td>General Test</td>
                              <td>
                                <a href="#">general-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-04.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Sofia Brient <span>Urology</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0006</a>
                              </td>
                              <td>10 Nov 2019</td>
                              <td>Eye Test</td>
                              <td>
                                <a href="#">eye-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-05.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Marvin Campbell{" "}
                                    <span>Ophthalmology</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0005</a>
                              </td>
                              <td>9 Nov 2019</td>
                              <td>Leg Pain</td>
                              <td>
                                <a href="#">ortho-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-06.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Katharine Berthold{" "}
                                    <span>Orthopaedics</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0004</a>
                              </td>
                              <td>8 Nov 2019</td>
                              <td>Head pain</td>
                              <td>
                                <a href="#">neuro-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-07.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Linda Tobin <span>Neurology</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0003</a>
                              </td>
                              <td>7 Nov 2019</td>
                              <td>Skin Alergy</td>
                              <td>
                                <a href="#">alergy-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-08.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Paul Richard <span>Dermatology</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0002</a>
                              </td>
                              <td>6 Nov 2019</td>
                              <td>Dental Removing</td>
                              <td>
                                <a href="#">dental-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-09.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. John Gibbs <span>Dental</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="javascript:void(0);">#MR-0001</a>
                              </td>
                              <td>5 Nov 2019</td>
                              <td>Dental Filling</td>
                              <td>
                                <a href="#">dental-test.pdf</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/doctors/doctor-thumb-10.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="doctor-profile.html">
                                    Dr. Olga Barlow <span>Dental</span>
                                  </a>
                                </h2>
                              </td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="btn btn-sm bg-primary-light"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--  /Medical Records Tab --> */}

                {/* <!--  Billing Tab --> */}
                <div id="pat_billing" className={`tab-pane  show ${currentTab === "billings" ? "active" : null}`}>
                  <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Invoice No</th>
                              <th>Doctor</th>
                              <th>Amount</th>
                              <th>Paid On</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.map((invData, index)=>{
                              return <tr key={`inv-no-${index}`}> 
                              <td className="uppercase">
                                <a href="invoice-view.html">#INV-{invData.InvoiceId.slice(0,6)}</a>
                              </td>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    href="doctor-profile.html"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={invData.DoctorProfilePicture}
                                      alt="User Image"
                                    />
                                  </a>
                                 <div className="ml-3">
                                 <a href="doctor-profile.html">
                                 {invData.DoctorName} <span>{invData.DoctorSpecializations[0]}</span>
                                  </a>
                                 </div>
                                </h2>
                              </td>
                              <td>${invData.TotalFee}</td>
                              <td>{formatDate(new Date(invData.BookingDate))}</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href=""
                                    className="btn btn-sm bg-info-light"
                                    onClick={(e)=>{
                                      e.preventDefault();
                                      router.push(`/invoice-view?InvoiceId=${invData.InvoiceId}`,"/invoice-view")
                                    }}
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>
                                 
                                </div>
                              </td>
                            </tr>
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--  /Billing Tab --> */}


              </div>
              {/* <!--  Tab Content --> */}
            </div>
          </div>
        </div>
      </div> 
      {/* <!-- Appointment Details Modal --> */}
		{showAppointmentDetails === true && currentAppointmentDetails && <ShowAppointmentDetailsModal  details={currentAppointmentDetails} closeFunction={()=>{setshowAppointmentDetails(false)}}/>}
		{/* <!-- /Appointment Details Modal --> */}
      {/* <!--  /Page Content --> */}
    </div>

  );
}

export default Dashboard;
