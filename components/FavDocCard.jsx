import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function FavDocCard({ email, removeFavourite, changeDocEmailArray }) {
  const router = useRouter();

  // get doctor details
  const [docData, setDocData] = useState();
  const [educationString, setEducationString] = useState();

  useEffect(() => {
    axios
      .get(`/api/getDoctors?email=${email}`)
      .then((response) => {
        setDocData(response.data);

        let str = "";
        // get degree names in string
        response.data.Education.map((item, index) => {
          console.log(item);
          if (index < response.data.Education.length - 1) {
            str += `${item.Degree}, `;
          } else {
            str += item.Degree;
          }
        });
        // get specialization name in string
        response.data.Service.Specializations.map((item, index) => {
          console.log(item);
          if (index === 0) {
            str += ` - ${item}, `;
          } else if (index < response.data.Service.Specializations.length - 1) {
            str += `${item}, `;
          } else {
            str += item;
          }
        });

        console.log(str);
        setEducationString(str);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      {docData && (
        <div className="profile-widget">
          {/* //remove fav bookmark button */}
          <a href="" className="fav-btn"
          onClick={(e)=>{
            e.preventDefault();
            removeFavourite(email);
            changeDocEmailArray(email);
          }}
          >
            <i className="far fa-bookmark "></i>
          </a>
          <div className="doc-img h-32 w-32  mx-auto">
            <a href="doctor-profile.html">
              <img
                className="img-fluid "
                alt="User Image"
                src={docData.ProfilePicture ? docData.ProfilePicture : "/dummy.jpeg"}
              />
            </a>
          </div>
          <div className="pro-content">
            <h3 className="title">
              <a href="doctor-profile.html" className="mr-2">
                Dr. {docData.FirstName} {docData.LastName}
              </a>
              <i className="fas fa-check-circle verified "></i>
            </h3>
            <p className="speciality ">
              {educationString}
              {/* MDS - Periodontology and Oral Implantology, BDS */}
            </p>
            <div className="rating">
              <i className="fas fa-star filled"></i>
              <i className="fas fa-star filled"></i>
              <i className="fas fa-star filled"></i>
              <i className="fas fa-star filled"></i>
              <i className="fas fa-star filled"></i>
              <span className="d-inline-block average-rating">(17)</span>
            </div>
            <ul className="available-info">
              <li>
                <i className="fas fa-map-marker-alt"></i> {docData.Address.City}
                , {docData.Address.Country}
              </li>
              <li>
                <i className="far fa-clock"></i> Available
              </li>
              <li>
                <i className="far fa-money-bill-alt"></i> ${docData.Pricing}{" "}
                <i
                  className="fas fa-info-circle"
                  data-toggle="tooltip"
                  title="Booking Fee"
                ></i>
              </li>
            </ul>
            <div className="row row-sm">
              <div className="col-6">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `/doctor-profile?doctorEmail=${docData.Email}`,
                      "/doctor-profile"
                    );
                  }}
                  className="btn view-btn"
                >
                  View Profile
                </a>
              </div>
              <div className="col-6">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `/booking?doctorEmail=${docData.Email}`,
                      "/booking"
                    );
                  }}
                  className="btn book-btn"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FavDocCard;
