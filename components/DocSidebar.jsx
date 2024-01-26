import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { changeUserType } from "../slices/userType";


function DocSidebar() {
  const dispatch = useDispatch(); 

  const emitterConfig = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  
  const [data, setData] = useState();
  const [load, setLoad] = useState();

  const currentUserType = useSelector((state) => state.userType.value);
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen)

  const docPFP = useSelector((state) => state.docPFP.ProfilePicture);
  const router = useRouter();

  const logout = () => {
    toast("Logging out...", emitterConfig);

    // first decrypt the token
    let token = localStorage.getItem("token");
    let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

    // UPDATING LAST VISIT --
    const updateData = {
      Email: decryptedToken.Email,
      LastVisit: new Date(Date.now()),
    };

    axios.put(`/api/updateDoctors`, updateData).catch((error) => {
      console.log(error.message);
    });

    setTimeout(() => {
      localStorage.removeItem("token");
      dispatch(changeUserType(null));
      router.push("/");
    }, 1000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      // decode it and use values
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
      let email = decryptedToken.Email;

      axios
        .get(`/api/getDoctors?email=${email}`)
        .then((response) => {
          setData(response.data);
          setLoad(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return (
    <>
    {load && data && currentUserType && (currentUserType === "Doctor" &&  homeSidebarOpen === true) && <div className={`z-20 ${(router.pathname === "/" || router.pathname.includes("edit-slots") || router.pathname.includes("add-slots")) ? "mt-[83px]" : "mt-[160px] md:mt-[165px]"} absolute left-0 `}>
      {(
        <div className="profile-sidebar ">
          <div className="widget-profile pro-widget-content">
            <div className="profile-info-widget">
              <Link href="#" className="booking-doc-img">
                <img
                  src={`${docPFP.length > 0 ? docPFP : "/dummy.jpeg"}`}
                  alt="User Image"
                />
              </Link>
              <div className="profile-det-info">
                <h3>
                  Dr. {data.FirstName} {data.LastName}
                </h3>

                <div className="patient-details">
                  <h5 className="mb-0">
                    BDS, MDS - Oral & Maxillofacial Surgery
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-widget">
            <nav className="dashboard-menu">
              <ul>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("dashboard") ? "active" : null
                  }`}
                >
                  <Link href="/doctor/dashboard">
                    <i className="fas fa-columns"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("appointments") ? "active" : null
                  }`}
                >
                  <Link href="/doctor/appointments">
                    <i className="fas fa-calendar-check"></i>
                    <span>Appointments</span>
                  </Link>
                </li>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("my-patients") ? "active" : null
                  }`}
                >
                  <Link href="/doctor/my-patients">
                    <i className="fas fa-user-injured"></i>
                    <span>My Patients</span>
                  </Link>
                </li>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("schedule-timings")
                      ? "active"
                      : null
                  }`}
                >
                  <Link href="/doctor/schedule-timings">
                    <i className="fas fa-hourglass-start"></i>
                    <span>Schedule Timings</span>
                  </Link>
                </li>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("invoices") ? "active" : null
                  }`}
                >
                  <Link href="/doctor/invoices">
                    <i className="fas fa-file-invoice"></i>
                    <span>Invoices</span>
                  </Link>
                </li>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("reviews") ? "active" : null
                  }`}
                >
                  <Link href="/doctor/reviews">
                    <i className="fas fa-star"></i>
                    <span>Reviews</span>
                  </Link>
                </li>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("message") ? "active" : null
                  }`}
                >
                  <Link href="/doctor/message">
                    <i className="fas fa-comments"></i>
                    <span>Message</span>
                    <small className="unread-msg">23</small>
                  </Link>
                </li>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("profile-settings")
                      ? "active"
                      : null
                  }`}
                >
                  <Link href="/doctor/profile-settings">
                    <i className="fas fa-user-cog"></i>
                    <span>Profile Settings</span>
                  </Link>
                </li>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("social-media") ? "active" : null
                  }`}
                >
                  <Link href="/doctor/social-media">
                    <i className="fas fa-share-alt"></i>
                    <span>Social Media</span>
                  </Link>
                </li>
                <li
                  className={` ml-4 ${
                    router.pathname.includes("change-password") ? "active" : null
                  }`}
                >
                  <Link href="/doctor/change-password">
                    <i className="fas fa-lock"></i>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li>
                  <Link href="" className=" ml-4 " onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* <!-- /Page Content --> */}
      <div>
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
    </div>}
    </>
  );
}

export default DocSidebar;
