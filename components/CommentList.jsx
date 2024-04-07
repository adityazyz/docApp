import React, { useEffect, useState } from "react";
import FeedbackReplyModal from "./FeedbackReplyModal";
import axios from "axios";

const getDateDifference = (dateObj) => {
  // Get today's date
  const today = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = today - dateObj;

  // Convert milliseconds to days
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  if (differenceInDays >= 365) {
    return (
      Math.floor(differenceInDays / 365) +
      ` ${Math.floor(differenceInDays / 365) === 1 ? "year ago" : "years ago"}`
    );
  } else if (differenceInDays >= 30) {
    return (
      Math.floor(differenceInDays / 30) +
      ` ${Math.floor(differenceInDays / 30) === 1 ? "month ago" : "months ago"}`
    );
  } else if (differenceInDays >= 7) {
    return (
      Math.floor(differenceInDays / 7) +
      ` ${Math.floor(differenceInDays / 7) === 1 ? "week ago" : "weeks ago"}`
    );
  } else if (differenceInDays > 0) {
    return (
      differenceInDays + ` ${differenceInDays === 1 ? "day ago" : "days ago"}`
    );
  } else {
    return "today";
  }
};

// const docId = "6537bc82bf08dc0f7c449173";
// const ptId = "65369f62bf08dc0f7c448e54";

function CommentList({ doctorId, reviewAdded, currentUserId, type }) {

  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState();

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState();
  const [replyTo, setReplyTo] = useState();

  const [idData, setIdData] = useState({});

  const [changeMade, setChangeMade] = useState(false);

  const updateIdData = (key, value) => {
    setIdData((prevIdData) => ({ ...prevIdData, [key]: value }));
  };

  const closeReplyModal = () => {
    setShowReplyModal(false);
  };

  const handleChangeMade = () => {
    setChangeMade(!changeMade);
  };

  const extractDetailsFromId = async (id) => {
    if (!(id in idData)) {
      // for patient
      try {
        const patientResponse = await axios.get(`/api/getPatientById?id=${id}`);
        if (patientResponse.data.length !== 0) {
          updateIdData(id, patientResponse.data[0]);
        }
      } catch (error) {
        console.log(error.message);
      }

      // for doctor
      try {
        const doctorResponse = await axios.get(`/api/getDoctorById?id=${id}`);
        if (doctorResponse.data.length !== 0) {
          updateIdData(id, doctorResponse.data[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
   

    // fetch reviews of the doctor
    axios
      .get(`/api/getDoctorReviews?id=${doctorId}`)
      .then((response) => {
        setReviews(response.data);

        let data = response.data;
        data.map((item) => {
          extractDetailsFromId(item.DoctorId);
          extractDetailsFromId(item.ReviewerId);
          if (item.Replies.length > 0) {
            item.Replies.map((reply) => {
              extractDetailsFromId(reply.ReplierId);
            });
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    // gives enogh time to make idData array
    setTimeout(() => {
      setShowReviews(true);
    }, 2000);
    
  }, [changeMade, reviewAdded]);

  return (
    <>
      {reviews && showReviews === true && (
        <div>
          {reviews.map((item, index) => {
            return (
              <li key={`review-${index}`}
              className={`${type === "Main" ? "bg-white p-3 py-4 rounded-sm" : null} `}
              >
                {/* <!-- /Comment --> */}
                <div className="comment">
                  <img
                    className="avatar avatar-sm rounded-circle"
                    alt="User Image"
                    src={
                      idData[item.ReviewerId]["ProfilePicture"] === ""
                        ? "/dummy.jpeg"
                        : idData[item.ReviewerId]["ProfilePicture"]
                    }
                  />
                  <div className="comment-body">
                    <div className="meta-data">
                      <span className="comment-author">
                        {idData[item.ReviewerId]["FirstName"]}{" "}
                        {idData[item.ReviewerId]["LastName"]}
                      </span>
                      <span className="comment-date">
                        Reviewed {getDateDifference(new Date(item.createdAt))}
                      </span>
                      <div className="review-count rating">
                        <i
                          className={`fas fa-star ${
                            item.Rating >= 1 ? "filled" : null
                          }`}
                        ></i>
                        <i
                          className={`fas fa-star ${
                            item.Rating >= 2 ? "filled" : null
                          }`}
                        ></i>
                        <i
                          className={`fas fa-star ${
                            item.Rating >= 3 ? "filled" : null
                          }`}
                        ></i>
                        <i
                          className={`fas fa-star ${
                            item.Rating >= 4 ? "filled" : null
                          }`}
                        ></i>
                        <i
                          className={`fas fa-star ${
                            item.Rating === 5 ? "filled" : null
                          }`}
                        ></i>
                      </div>
                    </div>
                    {item.Recommend === true && (
                      <p className="recommended">
                        <i className="far fa-thumbs-up"></i> I recommend the
                        doctor
                      </p>
                    )}
                    {item.Recommend === false && (
                      <p className="text-red-600">
                        <i className="far fa-thumbs-down"></i> I don't recommend
                        the doctor
                      </p>
                    )}
                    <p className="comment-content">
                      <span className="font-bold text-gray-800">
                        {item.Title}
                      </span>{" "}
                      <br />
                      {item.Review}
                    </p>
                    <div className="comment-reply">
                      <a
                        className="comment-btn"
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentReviewId(item._id);
                          setReplyTo(
                            `${idData[item.ReviewerId]["FirstName"]} ${
                              idData[item.ReviewerId]["LastName"]
                            }`
                          );
                          setShowReplyModal(true);
                        }}
                      >
                        <i className="fas fa-reply"></i> Reply
                      </a>
                    </div>
                  </div>
                </div>

                {item.Replies.length > 0 &&
                  item.Replies.map((reply, index) => {
                    return (
                      <ul
                        key={`reply-${index}`}
                        className="comments-reply mb-4"
                      >
                        {/* <!-- Comment Reply --> */}
                        <li>
                          <div className="comment">
                            <img
                              className="avatar avatar-sm rounded-circle"
                              alt="User Image"
                              src={
                                idData[reply.ReplierId]["ProfilePicture"] === ""
                                  ? "/dummy.jpeg"
                                  : idData[reply.ReplierId]["ProfilePicture"]
                              }
                            />
                            <div className="comment-body">
                              <div className="meta-data">
                                <span className="comment-author">
                                  {idData[reply.ReplierId]["UserType"] ===
                                  "Doctor"
                                    ? "Dr. "
                                    : null}
                                  {idData[reply.ReplierId]["FirstName"]}{" "}
                                  {idData[reply.ReplierId]["LastName"]}
                                </span>
                                <span className="comment-date">
                                  Replied{" "}
                                  {getDateDifference(new Date(reply.createdAt))}
                                </span>
                              </div>
                              {reply.Recommend === true && (
                                <p className="recommended">
                                  <i className="far fa-thumbs-up"></i> I
                                  recommend the doctor
                                </p>
                              )}
                              {reply.Recommend === false && (
                                <p className="text-red-600">
                                  <i className="far fa-thumbs-down"></i> I don't
                                  recommend the doctor
                                </p>
                              )}
                              <p className="comment-content">{reply.Reply}</p>
                              <div className="comment-reply">
                                <a
                                  className="comment-btn"
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentReviewId(item._id);
                                    setReplyTo(
                                      `${
                                        idData[reply.ReplierId]["FirstName"]
                                      } ${idData[reply.ReplierId]["LastName"]}`
                                    );
                                    setShowReplyModal(true);
                                  }}
                                >
                                  <i className="fas fa-reply"></i> Reply
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    );
                  })}
              </li>
            );
          })}

          {/* <!-- Show All --> */}
          {/* <div className="all-feedback text-center">
          <a href="#" className="btn btn-primary btn-sm">
            Show all feedback <strong>(167)</strong>
          </a>
        </div> */}
        </div>
      )}

      {/* <!-- / Reply Modal --> */}
      {showReplyModal === true && (
        <FeedbackReplyModal
          reviewId={currentReviewId}
          replyTo={replyTo}
          ReplierId={currentUserId}
          closeFunction={closeReplyModal}
          handleChangeMade={handleChangeMade}
        />
      )}
    </>
  );
}

export default CommentList;
