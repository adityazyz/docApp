import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DocCard from "./DocCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Jwt from "jsonwebtoken";
import CommentList from "./CommentList";

function DoctorProfile({ data }) {
  const router = useRouter();

  const [currentUserId, setCurrentUserId] = useState();

  const [rating, setRating] = useState(4);
  const [feedbacks, setFeedbacks] = useState([]);

  const [recommend, setRecommend] = useState();
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [review, setReview] = useState("");
  const [reviewTandC, setReviewTandC] = useState(false);

  const [titleCharacterCount, setTitleCharacterCount] = useState(100);
  const [reviewCharacterCount, setReviewCharacterCount] = useState(200);

  const [activeTab, setActiveTab] = useState(1); // 1,2,3 and 4

  const [timings, setTimings] = useState();

  const [currentDayDetails, setCurrentDayDetails] = useState();

  const [reviewAdded, setReviewAdded] = useState(false);

  const handleReviewAdded = ()=>{
    setReviewAdded(!reviewAdded);
  }

  const addReview = () => {
    if (reviewRating != 0) {
      if (reviewTitle) {
        if (reviewTitle.length >= 5) {
          if (review) {
            if (review.length >= 5) {
              if (reviewTandC === true) {
                if(recommend != undefined){
                  if (currentUserId) {
                    axios
                      .post(`/api/addDocReviews`, {
                        DoctorId: data._id,
                        Rating: reviewRating,
                        Title: reviewTitle,
                        Review: review,
                        ReviewerId: currentUserId,
                        Recommend : recommend,
                        RecommendingId: [],
                        NonRecommendingId: [],
                        Replies: [],
                      })
                      .then((response) => {
                        if (response.data.success === true) {
                          toast.success("Review posted successfully.");
                          setReviewRating(0);
                          setReviewTitle("");
                          setReview("");
                          setReviewTandC(false);
                          setRecommend();
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth", // Optional: Smooth scrolling animation
                          });

                          // reload reviews
                          handleReviewAdded()
                        }
                      })
                      .catch((error) => {
                        console.log(error.message);
                      });
                  } else {
                    toast.error("Login to post the review.");
                  }
                }else{
                  toast.error("Select recommendation ");
                }
              } else {
                toast.error("Accept terms and conditions.");
              }
            } else {
              toast.error("Review must be atleast 5 characters long.");
            }
          } else {
            toast.error("Write review.");
          }
        } else {
          toast.error("Review title must be atleast 5 characters long.");
        }
      } else {
        toast.error("Write review title.");
      }
    } else {
      toast.error("Set the rating first.");
    }
  };

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

  const differenceInYears = (date1, date2) => {
    // Get the years from the Date objects
    var year1 = date1.getFullYear();
    var year2 = date2.getFullYear();

    // Calculate the difference in years
    var diffYears = Math.abs(year2 - year1);

    // Adjust for months and days
    if (date2 < date1) {
      if (
        date2.getMonth() > date1.getMonth() ||
        (date2.getMonth() === date1.getMonth() &&
          date2.getDate() >= date1.getDate())
      ) {
        diffYears--;
      }
    } else {
      if (
        date2.getMonth() < date1.getMonth() ||
        (date2.getMonth() === date1.getMonth() &&
          date2.getDate() < date1.getDate())
      ) {
        diffYears--;
      }
    }

    return diffYears;
  };

  const getTodaysSlot = (obj) => {
    const getDayName = (date) => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayIndex = date.getDay();
      const dayName = days[dayIndex];
      return dayName;
    };

    const currentDay = getDayName(new Date());

    let first = "";
    let last = "";

    Object.keys(obj).map((key) => {
      if (key === currentDay) {
        if (obj[key].length > 0) {
          first = accessFirstSlot(obj[key]);
          last = accessLastSlot(obj[key]);
        }
      }
    });

    setCurrentDayDetails({
      day: formatDate(new Date()),
      first,
      last,
    });
  };

  const accessFirstSlot = (array) => {
    return array[0]["Start"];
  };

  const accessLastSlot = (array) => {
    return array[array.length - 1]["End"];
  };

  useEffect(() => {
    axios
      .get(`/api/getTimings?email=${data.Email}`)
      .then((response) => {
        setTimings(response.data);
        getTodaysSlot(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    // getting current user id
    const token = localStorage.getItem("token");
    if (token) {
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
      setCurrentUserId(decryptedToken.UserId);
    }
  }, []);

  return (
    <div className="content">
      <div className="container">
        {/* <!-- Doctor Widget --> */}
        <DocCard data={data} type={"full"} />
        {/* <!-- /Doctor Widget --> */}

        {/* <!-- Doctor Details Tab --> */}
        <div className="card">
          <div className="card-body pt-0">
            {/* <!-- Tab Menu --> */}
            <nav className="user-tabs mb-4">
              <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 1 ? "active" : null}`}
                    href=""
                    data-toggle="tab"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(1);
                    }}
                  >
                    Overview
                  </a>
                </li>
                {/* <li className="nav-item">
										<a className={`nav-link ${activeTab === 2 ? "active" : null}`} href="" data-toggle="tab"
										onClick={(e)=>{
											e.preventDefault();
											setActiveTab(2);
										}}
										>Locations</a>
									</li> */}
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 3 ? "active" : null}`}
                    href=""
                    data-toggle="tab"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(3);
                    }}
                  >
                    Reviews
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 4 ? "active" : null}`}
                    href=""
                    data-toggle="tab"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(4);
                    }}
                  >
                    Business Hours
                  </a>
                </li>
              </ul>
            </nav>
            {/* <!-- /Tab Menu --> */}

            {/* <!-- Tab Content --> */}
            <div className="tab-content pt-0">
              {/* <!-- Overview Content --> */}
              <div
                role="tabpanel"
                id="doc_overview"
                className={`tab-pane fade show ${
                  activeTab === 1 ? "active" : null
                }`}
              >
                <div className="row">
                  <div className="col-md-12 col-lg-9">
                    {/* <!-- About Details --> */}
                    {data.Biography.length > 0 && (
                      <div className="widget about-widget">
                        <h4 className="widget-title">About Me</h4>
                        <p>{data.Biography}</p>
                      </div>
                    )}
                    {/* <!-- /About Details --> */}

                    {/* <!-- Education Details --> */}
                    {data.Education[0].College.length > 0 && (
                      <div className="widget education-widget">
                        <h4 className="widget-title">Education</h4>
                        <div className="experience-box">
                          <ul className="experience-list">
                            {data.Education.map((item, index) => {
                              return (
                                <li key={`edi-${index}`}>
                                  <div className="experience-user">
                                    <div className="before-circle"></div>
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <div className="name">
                                        {item["College"]}
                                      </div>
                                      <div>{item["Degree"]}</div>
                                      <span className="time">
                                        {item["YearOfCompletion"]}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                    {/* <!-- /Education Details --> */}

                    {/* <!-- Experience Details --> */}
                    {data.Experience[0].Place.length > 0 && (
                      <div className="widget experience-widget">
                        <h4 className="widget-title">Work & Experience</h4>
                        <div className="experience-box">
                          <ul className="experience-list">
                            {data.Experience.map((item, index) => {
                              return (
                                <li key={`experience-${index}`}>
                                  <div className="experience-user">
                                    <div className="before-circle"></div>
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <a href="#/" className="name">
                                        {item["Place"]}
                                      </a>
                                      <span className="time">
                                        {new Date(item["From"]).getFullYear()} -{" "}
                                        {new Date(item["Till"]).getFullYear()} (
                                        {differenceInYears(
                                          new Date(item["From"]),
                                          new Date(item["Till"])
                                        )}{" "}
                                        years)
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                    {/* <!-- /Experience Details --> */}

                    {/* <!-- Awards Details --> */}
                    {data.Award[0].AwardName.length > 0 && (
                      <div className="widget awards-widget">
                        <h4 className="widget-title">Awards</h4>
                        <div className="experience-box">
                          <ul className="experience-list">
                            {data.Award.map((item, index) => {
                              return (
                                <li key={`award-${index}`}>
                                  <div className="experience-user">
                                    <div className="before-circle"></div>
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p className="exp-year">
                                        Year {item["AwardYear"]}
                                      </p>
                                      <h4 className="exp-title">
                                        {item["AwardName"]}
                                      </h4>
                                      <p>{item["AwardBy"]}</p>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                    {/* <!-- /Awards Details --> */}

                    {/* <!-- Specializations List --> */}
                    {data.Service.Specializations.length > 0 && (
                      <div className="service-list ">
                        <h4 className="pt-3">Specializations</h4>
                        <ul className="clearfix py-2">
                          {data.Service.Specializations.map((item, index) => {
                            return <li key={`spez-doc-${index}`}>{item}</li>;
                          })}
                        </ul>
                      </div>
                    )}

                    {/* <!-- /Specializations List --> */}

                    {/* <!-- Services List --> */}
                    {data.Service.Services.length > 0 && (
                      <div className="service-list">
                        <h4>Services</h4>
                        <ul className="clearfix py-2">
                          {data.Service.Services.map((item, index) => {
                            return <li key={`serv-doc-${index}`}>{item}</li>;
                          })}
                        </ul>
                      </div>
                    )}

                    {/* <!-- /Services List --> */}
                  </div>
                </div>
              </div>
              {/* <!-- /Overview Content --> */}

              {/* <!-- Locations Content --> */}
              <div
                role="tabpanel"
                id="doc_locations"
                className={`tab-pane fade show ${
                  activeTab === 2 ? "active" : null
                }`}
              >
                {/* <!-- Location List --> */}
                <div className="location-list">
                  <div className="row">
                    {/* <!-- Clinic Content --> */}
                    <div className="col-md-6">
                      <div className="clinic-content">
                        <h4 className="clinic-name">
                          <a href="#">Smile Cute Dental Care Center</a>
                        </h4>
                        <p className="doc-speciality">
                          MDS - Periodontology and Oral Implantology, BDS
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (4)
                          </span>
                        </div>
                        <div className="clinic-details mb-0">
                          <h5 className="clinic-direction">
                            {" "}
                            <i className="fas fa-map-marker-alt"></i> 2286
                            Sundown Lane, Austin, Texas 78749, USA <br />
                            <a href="javascript:void(0);">Get Directions</a>
                          </h5>
                          <ul>
                            <li>
                              <a
                                href="assets/img/features/feature-01.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-01.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-02.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-02.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-03.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-03.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-04.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-04.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Clinic Content --> */}

                    {/* <!-- Clinic Timing --> */}
                    <div className="col-md-4">
                      <div className="clinic-timing">
                        <div>
                          <p className="timings-days">
                            <span> Mon - Sat </span>
                          </p>
                          <p className="timings-times">
                            <span>10:00 AM - 2:00 PM</span>
                            <span>4:00 PM - 9:00 PM</span>
                          </p>
                        </div>
                        <div>
                          <p className="timings-days">
                            <span>Sun</span>
                          </p>
                          <p className="timings-times">
                            <span>10:00 AM - 2:00 PM</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Clinic Timing --> */}

                    <div className="col-md-2">
                      <div className="consult-price">$250</div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Location List --> */}

                {/* <!-- Location List --> */}
                <div className="location-list">
                  <div className="row">
                    {/* <!-- Clinic Content --> */}
                    <div className="col-md-6">
                      <div className="clinic-content">
                        <h4 className="clinic-name">
                          <a href="#">The Family Dentistry Clinic</a>
                        </h4>
                        <p className="doc-speciality">
                          MDS - Periodontology and Oral Implantology, BDS
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (4)
                          </span>
                        </div>
                        <div className="clinic-details mb-0">
                          <p className="clinic-direction">
                            {" "}
                            <i className="fas fa-map-marker-alt"></i> 2883
                            University Street, Seattle, Texas Washington, 98155{" "}
                            <br />
                            <a href="javascript:void(0);">Get Directions</a>
                          </p>
                          <ul>
                            <li>
                              <a
                                href="assets/img/features/feature-01.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-01.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-02.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-02.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-03.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-03.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-04.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-04.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Clinic Content --> */}

                    {/* <!-- Clinic Timing --> */}
                    <div className="col-md-4">
                      <div className="clinic-timing">
                        <div>
                          <p className="timings-days">
                            <span> Tue - Fri </span>
                          </p>
                          <p className="timings-times">
                            <span>11:00 AM - 1:00 PM</span>
                            <span>6:00 PM - 11:00 PM</span>
                          </p>
                        </div>
                        <div>
                          <p className="timings-days">
                            <span>Sat - Sun</span>
                          </p>
                          <p className="timings-times">
                            <span>8:00 AM - 10:00 AM</span>
                            <span>3:00 PM - 7:00 PM</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Clinic Timing --> */}

                    <div className="col-md-2">
                      <div className="consult-price">$350</div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Location List --> */}
              </div>
              {/* <!-- /Locations Content --> */}

              {/* <!-- Reviews Content --> */}
              <div
                role="tabpanel"
                id="doc_reviews"
                className={`tab-pane fade show ${
                  activeTab === 3 ? "active" : null
                }`}
              >
                {/* <!-- Review Listing --> */}
                <div className="widget review-listing">
                  <ul className="comments-list">
                    {/* <!-- Comment List --> */}
                    <CommentList type = {"Profile"} reviewAdded = {reviewAdded} doctorId={data._id} currentUserId={currentUserId} />
                    {/* <!-- /Comment List --> */}
                  </ul>
                </div>
                {/* <!-- /Review Listing --> */}

                {/* <!-- Write Review --> */}
                <div className="write-review">
                  <h4>
                    Write a review for{" "}
                    <strong>
                      Dr. {data?.FirstName} {data?.LastName}
                    </strong>
                  </h4>

                  {/* <!-- Write Review Form --> */}
                  <form>
                    <div className="form-group">
                      <label>Review</label>
                      <div className="star-rating ">
                        <input
                          id="star-5"
                          type="radio"
                          name="rating"
                          value={5}
                          onClick={(e) => {
                            setReviewRating(e.target.value);
                          }}
                        />
                        <label for="star-5" title="5 stars">
                          <i
                            className={`${
                              reviewRating === 5 ? "active" : null
                            } fa fa-star`}
                          ></i>
                        </label>
                        <input
                          id="star-4"
                          type="radio"
                          name="rating"
                          value={4}
                          onClick={(e) => {
                            setReviewRating(e.target.value);
                          }}
                        />
                        <label for="star-4" title="4 stars">
                          <i
                            className={`${
                              reviewRating >= 4 ? "active" : null
                            } fa fa-star`}
                          ></i>
                        </label>
                        <input
                          id="star-3"
                          type="radio"
                          name="rating"
                          value={3}
                          onClick={(e) => {
                            setReviewRating(e.target.value);
                          }}
                        />
                        <label for="star-3" title="3 stars">
                          <i
                            className={`${
                              reviewRating >= 3 ? "active" : null
                            } fa fa-star`}
                          ></i>
                        </label>
                        <input
                          id="star-2"
                          type="radio"
                          name="rating"
                          value={2}
                          onClick={(e) => {
                            setReviewRating(e.target.value);
                          }}
                        />
                        <label for="star-2" title="2 stars">
                          <i
                            className={`${
                              reviewRating >= 2 ? "active" : null
                            } fa fa-star`}
                          ></i>
                        </label>
                        <input
                          id="star-1"
                          type="radio"
                          name="rating"
                          value={1}
                          onClick={(e) => {
                            setReviewRating(e.target.value);
                          }}
                        />
                        <label for="star-1" title="1 star">
                          <i
                            className={`${
                              reviewRating >= 1 ? "active" : null
                            } fa fa-star`}
                          ></i>
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="mb-2">Title of your review</label>
                      <input
                        className="form-control"
                        type="text"
                        value={reviewTitle}
                        maxLength={100}
                        onChange={(e) => {
                          setReviewTitle(e.target.value);
                          // also update the number of character count on display
                          setTitleCharacterCount(100 - e.target.value.length);
                        }}
                        placeholder="If you could say it in one sentence, what would you say?"
                      />
                      <div className="d-flex justify-content-between mt-2 ">
                        <small
                          className={` ${
                            titleCharacterCount === 0
                              ? "text-red-500"
                              : "text-muted"
                          }`}
                        >
                          <span id={`chars`}>{titleCharacterCount}</span>{" "}
                          characters remaining
                        </small>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="mb-2">Your review</label>
                      <textarea
                        id="review_desc"
                        maxlength={200}
                        value={review}
                        className="form-control"
                        onChange={(e) => {
                          setReview(e.target.value);
                          setReviewCharacterCount(200 - e.target.value.length);
                        }}
                      ></textarea>
                      <div className="d-flex justify-content-between mt-2 ">
                        <small
                          className={` ${
                            reviewCharacterCount === 0
                              ? "text-red-500"
                              : "text-muted"
                          }`}
                        >
                          <span id={`chars`}>{reviewCharacterCount}</span>{" "}
                          characters remaining
                        </small>
                      </div>
                    </div>

                    {/* // recommend question section  */}
                    <p className={`recommend-btn mb-4`}>
                      <span>Do you recommend this doctor? </span>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setRecommend(true);
                        }}
                        className={`like-btn mx-2 rounded-[5px] border border-1 border-gray-300 py-[5px] px-2  hover:bg-[#28A745] hover:text-white  hover:border-transparent ${recommend === true ? "bg-[#28A745] text-white" : null}`}
                      >
                        <i className={`far fa-thumbs-up `}></i> Yes
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setRecommend(false)
                        }}
                        className={`dislike-btn mx-1 rounded-[5px] border border-1 border-gray-300 py-[5px] px-2 hover:bg-red-600 hover:text-white  ${recommend === false ? "bg-red-600 text-white" : null}`}
                      >
                        <i className="far fa-thumbs-down"></i> No
                      </a>
                    </p>

                    <hr />
                    <div className="form-group">
                      <div className="terms-accept">
                        <div className="custom-checkbox mt-2">
                          <input
                            type="checkbox"
                            className="mr-[5px]"
                            id="terms_accept"
                            value={reviewTandC}
                            onChange={(e) => {
                              setReviewTandC(e.target.checked);
                            }}
                          />
                          <label for="terms_accept">
                            I have read and accept{" "}
                            <a href="">Terms &amp; Conditions</a>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          addReview();
                        }}
                      >
                        Add Review
                      </button>
                    </div>
                  </form>
                  {/* <!-- /Write Review Form --> */}
                </div>
                {/* <!-- /Write Review --> */}
              </div>
              {/* <!-- /Reviews Content --> */}

              {/* <!-- Business Hours Content --> */}
              <div
                role="tabpanel"
                id="doc_business_hours"
                className={`tab-pane fade show ${
                  activeTab === 4 ? "active" : null
                }`}
              >
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    {/* <!-- Business Hours Widget --> */}
                    {timings && (
                      <div className="widget business-widget">
                        <div className="widget-content">
                          <div className="listing-hours">
                            {/* // TODAY ----- */}
                            <div className="listing-day current">
                              <div className="day">
                                Today <span>{currentDayDetails?.day}</span>
                              </div>
                              {currentDayDetails &&
                                (currentDayDetails.first.length > 0 ? (
                                  <div className="time-items">
                                    <span className="open-status">
                                      <span className="badge bg-success-light">
                                        Open Now
                                      </span>
                                    </span>
                                    <span className="time">
                                      {currentDayDetails.first} -{" "}
                                      {currentDayDetails.last}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="time">
                                    <span className="badge bg-danger-light">
                                      Closed
                                    </span>
                                  </span>
                                ))}
                            </div>

                            {/* // Weekdayss -----  */}
                            <div className="listing-day">
                              <div className="day">Monday</div>
                              <div className="time-items">
                                {timings["Monday"].length > 0 ? (
                                  <span className="time uppercase">
                                    {accessFirstSlot(timings["Monday"])} -{" "}
                                    {accessLastSlot(timings["Monday"])}
                                  </span>
                                ) : (
                                  <span className="time">
                                    <span className="badge bg-danger-light">
                                      Closed
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="listing-day">
                              <div className="day">Tuesday</div>
                              <div className="time-items">
                                {timings["Tuesday"].length > 0 ? (
                                  <span className="time uppercase">
                                    {accessFirstSlot(timings["Tuesday"])} -{" "}
                                    {accessLastSlot(timings["Tuesday"])}
                                  </span>
                                ) : (
                                  <span className="time">
                                    <span className="badge bg-danger-light">
                                      Closed
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="listing-day">
                              <div className="day">Wednesday</div>
                              <div className="time-items">
                                {timings["Wednesday"].length > 0 ? (
                                  <span className="time uppercase">
                                    {accessFirstSlot(timings["Wednesday"])} -{" "}
                                    {accessLastSlot(timings["Wednesday"])}
                                  </span>
                                ) : (
                                  <span className="time">
                                    <span className="badge bg-danger-light">
                                      Closed
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="listing-day">
                              <div className="day">Thursday</div>
                              <div className="time-items">
                                {timings["Thursday"].length > 0 ? (
                                  <span className="time uppercase">
                                    {accessFirstSlot(timings["Thursday"])} -{" "}
                                    {accessLastSlot(timings["Thursday"])}
                                  </span>
                                ) : (
                                  <span className="time">
                                    <span className="badge bg-danger-light">
                                      Closed
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="listing-day">
                              <div className="day">Friday</div>
                              <div className="time-items">
                                {timings["Friday"].length > 0 ? (
                                  <span className="time uppercase">
                                    {accessFirstSlot(timings["Friday"])} -{" "}
                                    {accessLastSlot(timings["Friday"])}
                                  </span>
                                ) : (
                                  <span className="time">
                                    <span className="badge bg-danger-light">
                                      Closed
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="listing-day">
                              <div className="day">Saturday</div>
                              <div className="time-items">
                                {timings["Saturday"].length > 0 ? (
                                  <span className="time uppercase">
                                    {accessFirstSlot(timings["Saturday"])} -{" "}
                                    {accessLastSlot(timings["Saturday"])}
                                  </span>
                                ) : (
                                  <span className="time">
                                    <span className="badge bg-danger-light">
                                      Closed
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="listing-day closed">
                              <div className="day">Sunday</div>
                              <div className="time-items">
                                {timings["Sunday"].length > 0 ? (
                                  <span className="time uppercase">
                                    {accessFirstSlot(timings["Sunday"])} -{" "}
                                    {accessLastSlot(timings["Sunday"])}
                                  </span>
                                ) : (
                                  <span className="time">
                                    <span className="badge bg-danger-light">
                                      Closed
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* <!-- /Business Hours Widget --> */}
                  </div>
                </div>
              </div>
              {/* <!-- /Business Hours Content --> */}
            </div>
          </div>
        </div>
        {/* {/* <!-- /Doctor Details Tab --> */}
      </div>
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
    /* <!-- /Page Content --> */
  );
}

export default DoctorProfile;
