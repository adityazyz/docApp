import React, { useEffect, useState } from "react";

function DocCard({data}) {
    // all major data coming from parent component 
    // extra useState variable for fields we need from api are reated below
    const [rating, setRating] = useState(0);
    const [feedbacks, setFeedbacks] = useState(0);

    // store all degree from education in an array
    const [degrees, setDegrees] = useState("");
    useEffect(() => {
      // setting degrees
      let degree = data.Education.map((item)=>item["Degree"]);
      degree = degree.join(', ');
      setDegrees(degree);
    

      
    }, [])
    
  return (
    <>
    {<div className="card">
      <div className="card-body">
        <div className="doctor-widget">
          <div className="doc-info-left">
            <div className="doctor-img">
              <a href="doctor-profile.html">
                <img
                  src="assets/img/doctors/doctor-thumb-03.jpg"
                  className="img-fluid"
                  alt="User Image"
                />
              </a>
            </div>
            <div className="doc-info-cont">
            <a href="doctor-profile.html">
              <h4 className="doc-name">
                Dr. {`${data.FirstName} ${data.LastName}`}
              </h4>
              </a>
              <p className="doc-speciality">
                {degrees}
              </p>
              <div className="doc-department">
                <img
                  src="assets/img/specialities/specialities-04.png"
                  className="img-fluid"
                  alt="Speciality"
                />
                Cardiology
              </div>
              <div className="rating">
                <i className="fas fa-star filled"></i>
                <i className="fas fa-star filled"></i>
                <i className="fas fa-star filled"></i>
                <i className="fas fa-star filled"></i>
                <i className="fas fa-star"></i>
                <span className="d-inline-block average-rating mx-2">(27)</span>
              </div>
              <div className="clinic-details">
                <span className="doc-location">
                  <i className="fas fa-map-marker-alt mb-2"></i> Georgia, USA
                </span>
                <ul className="clinic-gallery">
                  <li>
                    <a
                      href="assets/img/features/feature-01.jpg"
                      data-fancybox="gallery"
                    >
                      <img
                        src="assets/img/features/feature-01.jpg"
                        alt="Feature"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="assets/img/features/feature-02.jpg"
                      data-fancybox="gallery"
                    >
                      <img
                        src="assets/img/features/feature-02.jpg"
                        alt="Feature"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="assets/img/features/feature-03.jpg"
                      data-fancybox="gallery"
                    >
                      <img
                        src="assets/img/features/feature-03.jpg"
                        alt="Feature"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="assets/img/features/feature-04.jpg"
                      data-fancybox="gallery"
                    >
                      <img
                        src="assets/img/features/feature-04.jpg"
                        alt="Feature"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="clinic-services">
                <span>Dental Fillings</span>
                <span> Whitening</span>
              </div>
            </div>
          </div>
          <div className="doc-info-right">
            <div className="clini-infos">
              <ul>
                <li>
                  <i className="far fa-thumbs-up"></i> 99%
                </li>
                <li>
                  <i className="far fa-comment"></i> 35 Feedback
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i> New York, USA
                </li>
                <li>
                  <i className="far fa-money-bill-alt"></i> $100 - $400{" "}
                  <i
                    className="fas fa-info-circle mx-2"
                    data-toggle="tooltip"
                    title="Lorem Ipsum"
                  ></i>
                </li>
              </ul>
            </div>
            <div className="clinic-booking">
              <a className="view-pro-btn" href="doctor-profile.html">
                View Profile
              </a>
              <a className="apt-btn" href="booking.html">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
}

export default DocCard;