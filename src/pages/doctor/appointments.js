import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Jwt from "jsonwebtoken";
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

function Appointments() {
  const homeSidebarOpen = useSelector((state) => state.sidebar.homeSidebarOpen);

  const [data, setData] = useState();
  const [changeMade, setChangeMade] = useState(false);

  const [showAppointmentDetails, setshowAppointmentDetails] = useState(false);
  const [currentAppointmentDetails, setCurrentAppointmentDetails] = useState();

  const viewAppointment = (e, details) => {
    e.preventDefault();
    setCurrentAppointmentDetails(details);
    setTimeout(() => {
      setshowAppointmentDetails(true);
    }, 200);
  };

  const changeAppointmentStatus = (
    e,
    _id,
    status,
    doctorEmail,
    patientEmail
  ) => {
    // confirm | cancelled

    e.preventDefault();

    axios
      .put("/api/changeAppointmentStatus", {
        _id: _id,
        Status: status,
      })
      .then((response) => {
        setChangeMade(!changeMade);
        if (response.data.success === true) {
          toast(`Appointment ${status}. `);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    // add patient to MyPatients
    axios
      .put("/api/addMyPatients", {
        DoctorEmail: doctorEmail,
        email: patientEmail,
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    //  just update the last visit
    let token = localStorage.getItem("token");
    if (token) {
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

      axios
        .get(`/api/getDocAppointment?email=${decryptedToken.Email}`)
        .then((response) => {
          setData(response.data);
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
        homeSidebarOpen ? "ml-2 md:ml-[300px]" : "ml-5"
      } h-[122vh] w-auto frame`}
    >
      {/* <!-- Page Content --> */}

      <div className="appointments pr-6 pt-4">
        {/* <!-- Appointment List --> */}
        {data?.map((item, index) => {
          return (
            <div key={`doc-side-app-${index}`} className="appointment-list">
              <div className="profile-info-widget">
                <div className="flex  w-full sm:w-fit  justify-center  booking-doc-img">
                  <img
                    src={
                      item.PatientProfilePicture === " "
                        ? "/dummy/jpeg"
                        : item.PatientProfilePicture
                    }
                    alt="User Image"
                  />
                </div>
                <div className="profile-det-info">
                  <h3 className="mb-3">
                    <a href="">{item.PatientName}</a>
                  </h3>
                  <div className="patient-details">
                    <h5>
                      <i className="far fa-clock"></i>
                      {formatDate(new Date(item.FollowUpDate))},{" "}
                      <span className="uppercase">{item.Time.Start}</span>
                    </h5>
                    <h5>
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {item.PatientAddress.City}, {item.PatientAddress.State}
                    </h5>
                    <h5>
                      <i className="fas fa-envelope"></i> {item.PatientEmail}
                    </h5>
                    <h5 className="mb-0">
                      <i className="fas fa-phone"></i> {item.PatientMobile}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="appointment-action flex items-center justify-center w-full lg:w-auto pt-2">
                <a
                  href=""
                  onClick={(e) => {
                    viewAppointment(e, item);
                  }}
                  className="btn btn-sm bg-info-light"
                  data-toggle="modal"
                  data-target="#appt_details"
                >
                  <i className="far fa-eye"></i> View
                </a>
                {item.Status === "pending" && (
                  <>
                    <a
                      onClick={(e) => {
                        changeAppointmentStatus(
                          e,
                          item._id,
                          "confirm",
                          item.DoctorEmail,
                          item.PatientEmail
                        );
                      }}
                      href=""
                      className="btn mx-2 btn-sm bg-success-light"
                    >
                      <i className="fas fa-check"></i> Accept
                    </a>
                    <a
                      onClick={(e) => {
                        changeAppointmentStatus(
                          e,
                          item._id,
                          "cancelled",
                          item.DoctorEmail,
                          item.PatientEmail
                        );
                      }}
                      href=""
                      className="btn mx-2 btn-sm bg-danger-light"
                    >
                      <i className="fas fa-times"></i> Cancel
                    </a>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {/* <!-- /Appointment List --> */}

        {/* <!-- Appointment Details Modal --> */}
        {showAppointmentDetails === true && currentAppointmentDetails && (
          <ShowAppointmentDetailsModal
            details={currentAppointmentDetails}
            closeFunction={() => {
              setshowAppointmentDetails(false);
            }}
          />
        )}
        {/* <!-- /Appointment Details Modal --> */}
      </div>

      {/* {/* <!-- /Page Content --> */}

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

export default Appointments;
