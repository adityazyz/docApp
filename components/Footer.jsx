import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeWebsiteColor,
  changeWebsiteName,
  changeWebsiteLogo,
  changeWebsiteFavicon,
} from "../slices/websiteSlice";
import { useEffect } from "react";
import axios from "axios";
import Favicon from "./Favicon";

function Footer() {

  const dispatch = useDispatch()
  const websiteColorDark = useSelector((state) => state.website.websiteColorDark);
  const themeBgDark = {
    backgroundColor: websiteColorDark,
  };

  useEffect(() => {
    axios
      .get("/api/getSiteSetting")
      .then((response) => {
        let dbData = response.data.data;
        dispatch(
          changeWebsiteColor({
            dark: dbData.websiteColorDark,
            light: dbData.websiteColorLight,
          })
        );
        dispatch(changeWebsiteName(dbData.websiteName));
        dispatch(changeWebsiteLogo(dbData.websiteLogo));
        dispatch(changeWebsiteFavicon(dbData.websiteFavicon));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
    <Favicon/>
      {/* <!-- Footer --> */}
      <footer className={`footer `} style={themeBgDark}>
        {/* <!-- Footer Top --> */}
        <div className="footer-top">
          <div className="container-fluid">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="col-lg-3 col-md-6 mb-5 lg:mb-0">
                {/* <!-- Footer Widget --> */}
                <div className="footer-widget footer-about">
                  <div className="footer-logo">
                    <img src="/assets/img/footer-logo.png" alt="logo" />
                  </div>
                  <div className="footer-about-content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                    <div className="social-icon mt-4">
                      <ul>
                        <li>
                          <a href="#" target="_blank">
                            <i className="fab fa-facebook-f"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank">
                            <i className="fab fa-twitter"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank">
                            <i className="fab fa-dribbble"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <!-- /Footer Widget --> */}
              </div>

              <div className="col-lg-3 col-md-6">
                {/* <!-- Footer Widget pttt--> */}
                {/* <div className="footer-widget footer-menu">
                  <h2 className="footer-title">For Patients</h2>
                  <ul>
                    <li>
                      <a href="search.html">Search for Doctors</a>
                    </li>
                    <li>
                      <a href="login.html">Login</a>
                    </li>
                    <li>
                      <a href="register.html">Register</a>
                    </li>
                    <li>
                      <a href="booking.html">Booking</a>
                    </li>
                    <li>
                      <a href="patient-dashboard.html">Patient Dashboard</a>
                    </li>
                  </ul>
                </div> */}
                {/* <!-- /Footer Widget --> */}
              </div>

              <div className="col-lg-3 col-md-6">
                {/* <!-- Footer Widget doccc --> */}
                {/* <div className="footer-widget footer-menu">
                  <h2 className="footer-title">For Doctors</h2>
                  <ul >
                    <li>
                      <a href="appointments.html">Appointments</a>
                    </li>
                    <li>
                      <a href="chat.html">Chat</a>
                    </li>
                    <li>
                      <a href="login.html">Login</a>
                    </li>
                    <li>
                      <a href="doctor-register.html">Register</a>
                    </li>
                    <li>
                      <a href="doctor-dashboard.html">Doctor Dashboard</a>
                    </li>
                  </ul>
                </div> */}
                {/* <!-- /Footer Widget --> */}
              </div>

              <div className="col-lg-3 col-md-6">
                {/* <!-- Footer Widget --> */}
                <div className="footer-widget footer-contact">
                  <h2 className="footer-title">Contact Us</h2>
                  <div className="footer-contact-info">
                    <div className="footer-address my-3">
                      <span>
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                      <p>
                        {" "}
                        3556 Beech Street, San Francisco,
                        <br /> California, CA 94108{" "}
                      </p>
                    </div>
                    <p>
                      <i className="fas fa-phone-alt"></i>
                      +1 315 369 5943
                    </p>
                    <p className="my-3">
                      <i className="fas fa-envelope"></i>
                      doccure@example.com
                    </p>
                  </div>
                </div>
                {/* <!-- /Footer Widget --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Footer Top --> */}

        {/* <!-- Footer Bottom --> */}
        <div className="footer-bottom">
          <div className="container-fluid">
            {/* <!-- Copyright --> */}
            <div className="copyright">
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="copyright-text">
                    <p className="mb-0">
                      &copy; 2020 Doccure. All rights reserved.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  {/* <!-- Copyright Menu --> */}
                  <div className="copyright-menu">
                    <ul className="policy-menu">
                      <li>
                        <a href="term-condition.html">Terms and Conditions</a>
                      </li>
                      <li>
                        <a href="privacy-policy.html">Policy</a>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- /Copyright Menu --> */}
                </div>
              </div>
            </div>
            {/* <!-- /Copyright --> */}
          </div>
        </div>
        {/* <!-- /Footer Bottom --> */}
      </footer>
      {/* <!-- /Footer --> */}
    </>
  );
}

export default Footer;
