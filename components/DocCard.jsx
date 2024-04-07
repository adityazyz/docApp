import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 3 types, half, full, booking
// half- to show just card
// full - to show in full profile
// booking - to show on booking
function DocCard({data,type}) {
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

    // all major data coming from parent component 
    // extra useState variable for fields we need from api are reated below
    const [rating, setRating] = useState(-1);
    const [feedbacks, setFeedbacks] = useState([]);
    const [specs, setSpecs] = useState([]);


    const router = useRouter();
    // store all degree from education in an array
    const [degrees, setDegrees] = useState("");

    const [isFav, setIsFav] = useState(false);
    const [patientEmail, setPatientEmail] = useState();

    useEffect(() => {
      // setting degrees
      let degree = data.Education.map((item)=>item["Degree"]);
      degree = degree.join(', ');
      setDegrees(degree);    

      axios
      .get("/api/specGet")
      .then((response) => {

        setSpecs(response.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    }, [])

    // for favourite doc
    useEffect(() => {
      if(type === "full"){
       //  just update the last visit
     let token = localStorage.getItem("token");

     if (token) {
       let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
       if(decryptedToken.UserType === "Patient"){
        setPatientEmail(decryptedToken.Email);
        axios.get(`/api/getFavDoctors?PatientEmail=${decryptedToken.Email}`)
       .then((response)=>{
        if(response.data && response.data.DoctorEmail.includes(data.Email)){
          setIsFav(true);
        }
       })
       .catch((error)=>{
        console.log(error.message);
       })
       }
      }
      }
    }, [])
    
    const toggleFavDoctor = () =>{
      if(patientEmail){
        if(isFav === false){
          axios.put("/api/addFavDoctors",{PatientEmail : patientEmail, email : data.Email})
          .then((response)=>{
            if(response.data.success === true){
              setIsFav(true);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });

        }else{
          axios.put("/api/removeFavDoctors",{PatientEmail : patientEmail, email : data.Email})
          .then((response)=>{
            if(response.data.success === true){
              setIsFav(false);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
        }
      }else{
        toast.error("Login as patient to set this doctor as Favourite.", emitterConfig);
      }
    }
    
  return (
    <>
    {<div className="card">
      <div className="card-body">
        <div className="doctor-widget">
          <div className="doc-info-left">
            <div className="doctor-img">
              <a href="doctor-profile.html">
                <img
                  // src="assets/img/doctors/doctor-thumb-03.jpg"
                  src={`${data.ProfilePicture ? data.ProfilePicture : "/dummy.jpeg"}`}
                  className={`img-fluid ${type === "booking" ? "h-28 w-24 ml-8" : "h-[78%] w-full"}`}
                  alt="User Image"
                />
              </a> 
            </div>
            <div className="doc-info-cont">
            <a href="doctor-profile.html">
              <h4 className={`doc-name  ${type === "booking" ? "mt-2" : null}`}>
                Dr. {`${data.FirstName} ${data.LastName}`}
              </h4>
              </a>
              {/* // degrees  */}
              {degrees != "" && type!="booking" && <p className="doc-speciality">
                {degrees}
              </p>}
              
              {/* // speciality  */}
              {data.Service.Specializations.length > 0 && type != "booking" && <div className="flex my-2 justify-center">
                {specs.map((item,index)=>{
                  if(data.Service.Specializations.includes(item["name"]) && index < 5){
                    return <div className="flex flex-row justify-center items-center mr-3" key={`spezz-${index}`}>
                    <img 
                    src={item.image}
                    className="h-5 w-4"
                    alt="Speciality"
                  />
                 <span className="ml-1 text-[13px] text-cyan-500"> {item.name}</span>
                    </div>
                  }
                })}
                
              </div>}
              

              {/* ratinggg  */}
              {
                rating != -1 && <div className="rating">
                <i className={`fas fa-star ${rating>0 ? "filled" : null}`}></i>
                <i className={`fas fa-star ${rating>1 ? "filled" : null}`}></i>
                <i className={`fas fa-star ${rating>2 ? "filled" : null}`}></i>
                <i className={`fas fa-star ${rating>3 ? "filled" : null}`}></i>
                <i className={`fas fa-star ${rating>4 ? "filled" : null}`}></i>
                <span className="d-inline-block average-rating mx-2">({feedbacks.length})</span>
              </div>
              }

              {/* address  */}
              <div className="clinic-details ">
                <span className="doc-location">
                  <i className="fas fa-map-marker-alt mb-2"></i> {data.Address.State}, {data.Address.Country}
                </span>

              {/* clinic images  */}
                {data.ClinicInfo.ClinicImages.length > 0 && type != "booking" && <ul className="clinic-gallery mt-2">
                  {data.ClinicInfo.ClinicImages.map((item,index)=>{
                  
                  return <li key={`${index}-clinic-img`}>
                    <a
                      href={item}
                      data-fancybox="gallery"
                      target="_blank"
                    >
                      <img
                      className="h-10 w-5"
                        src={item}
                        alt="clinic-image"
                        
                      />
                    </a>
                  </li>})}
                  
                  
                </ul>}
                
              </div>

              {/* // services offered  */}
              {data.Service.Services.length > 0 && type != "booking" && <div className="clinic-services">
                {data.Service.Services.map((item,index)=><span key={`${index}-serv`}>{item}</span>
                )}
              </div>}
              
            </div>
          </div>
          {type != "booking" && <div className="doc-info-right">
            <div className="clini-infos">
              <ul>
                {rating != -1 && <li>
                  <i className="far fa-thumbs-up"></i> {(rating/5)*100} %
                </li>}

                {feedbacks.length > 0 && <li>
                  <i className="far fa-comment"></i> 35 Feedback
                </li>}

                {
                  data.Address.City && <li>
                  <i className="fas fa-map-marker-alt"></i> {data.Address.City}, {data.Address.Country}
                </li>
                }

               {type != "booking" && <li>
                  <i className="far fa-money-bill-alt"></i> ${data.Pricing}{" "}
                  <i
                    className="fas fa-info-circle mx-2"
                    data-toggle="tooltip"
                    title="Price per minute"
                  ></i>
                </li>}
              </ul>
            </div> 
            <div className="clinic-booking"> 
            {type === "full" && <div className="doctor-action ">

              {/* // action buttons  */} 
              <button 
              onClick={toggleFavDoctor}
              className={`btn  mx-1
              ${isFav===true? "bg-blue-400 text-white hover:bg-red-600 hover:text-white" : "border border-1 "}
              hover:bg-blue-300 hover:text-white`}>
                <i className="far fa-bookmark"></i>
              </button>
              <button className="btn btn-white msg-btn mx-1">
                <i className="far fa-comment-alt"></i>
              </button>
              <button className="btn btn-white call-btn mx-1" data-toggle="modal" data-target="#voice_call">
                <i className="fas fa-phone"></i>
              </button>
              <button className="btn btn-white call-btn mx-1" data-toggle="modal" data-target="#video_call">
                <i className="fas fa-video"></i>
              </button>
            </div>
            }
              {type === "half" && <button className="w-[100%]  border-2 hover:border-white border-gray-300 mb-[15px] py-3 rounded-[5px] hover:bg-[#20c0f3] hover:text-white" onClick={
                ()=>{
                  router.push(
                    { pathname: "/doctor-profile", query: { data: JSON.stringify(data) } },
                    "/doctor-profile"
                  )
                }
              } href="/"> 
                View Profile
              </button>}
              <button className="w-[100%]   mb-[15px] py-3 rounded-[5px] bg-[#20c0f3] text-white hover:bg-cyan-600" href="booking.html"
										onClick={()=>{
											router.push(
												{ pathname: "/booking", query: { doctorEmail: data.Email } },
												"/booking"
											  )
										}}
										>Book Appointment</button>
            </div>
          </div>}
        </div>
      </div>
    </div>}
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
    </>
  );
}

export default DocCard;