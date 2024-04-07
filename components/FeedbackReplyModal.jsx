import React, { useRef, useEffect, useState } from "react";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function FeedbackReplyModal({ reviewId, replyTo, ReplierId, closeFunction, handleChangeMade }) {
  useLockBodyScroll();
  const divRef = useRef(null);

  const [recommend, setRecommend] = useState();
  const [reply, setReply] = useState("");
  const [replyCharacterCount, setReplyCharacterCount] = useState(200);

  const addReply = () => {
    if (reply.length === 0) {
      toast.error("Write reply.");
    } else {
      if(reply.length < 5){
        toast.error("Reply must be atleast 5 characters long.");
      }else{
        if(recommend != undefined){
          axios.put("/api/addDocReviewReply", {
            reviewId,
            newItem : {
              Recommend : recommend,
              Reply : reply,
              ReplierId 
            }
          })
          .then((response)=>{
          if(response.data.success === true){
            toast.success("Reply added successfully.")
            closeFunction();
            handleChangeMade();
          };
          })
          .catch((error)=>{
          console.log(error.message);
          
          });
        }else{
          toast.error("Set recommendation.")
        }
      }
    }
  };

  // Ensure modal is centered on mount and on scroll
  useEffect(() => {
    const handleScroll = () => {
      const modal = divRef.current;
      if (modal) {
        const top = Math.max((window.innerHeight - modal.offsetHeight) / 2, 0);
        modal.style.top = `${top + window.scrollY}px`;
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={divRef}
      className="h-full w-full fixed top-0 left-0 z-30 bg-black bg-opacity-30"
      id="appt_details"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reply to {replyTo}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={closeFunction}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label className="mb-2">Your reply</label>
                <textarea
                  id="review_desc"
                  maxlength={200}
                  value={reply}
                  className="form-control"
                  onChange={(e) => {
                    setReply(e.target.value);
                    setReplyCharacterCount(200 - e.target.value.length);
                  }}
                ></textarea>
                <div className="d-flex justify-content-between mt-2 ">
                  <small
                    className={` ${
                      replyCharacterCount === 0 ? "text-red-500" : "text-muted"
                    }`}
                  >
                    <span id={`chars`}>{replyCharacterCount}</span> characters
                    remaining
                  </small>
                </div>
              </div>
               {/* // recommend question section  */}
               <p className={` flex justify-start items-center mb-3`}>
                      <span className="text-gray-500">Do you recommend this doctor? </span>
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

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    addReply();
                  }}
                >
                  Add Reply
                </button>
              </div>
            </form>
          </div>
        </div>
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
  );
}

export default FeedbackReplyModal;
