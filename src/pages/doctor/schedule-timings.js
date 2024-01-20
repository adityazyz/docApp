import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Jwt from "jsonwebtoken";
import axios from "axios";

function ScheduleTimings() {
  const homeSidebarOpen = useSelector((state) => state.sidebar.homeSidebarOpen);

  const [activeDay, setActiveDay] = useState("Monday");
  const router = useRouter();
  const [currentEmail, setCurrentEmail] = useState("");
  const [data, setData] = useState();
  const [deleteListener, setDeleteListener] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // decode it and use values
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
      // set current email
      setCurrentEmail(decryptedToken.Email);
      // get the scheduled timing data
      axios
        .get(`/api/getTimings?email=${decryptedToken.Email}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [deleteListener]);

  const handleDelete = (index) => {
    let newData = data[activeDay];
    newData.splice(index, 1);
    let myObj = {
      Email: currentEmail,
    };
    myObj[activeDay] = newData;

    console.log(myObj);
  };

  return (
    <div
      className={` ${
        homeSidebarOpen ? "ml-2 md:ml-[300px]" : "ml-2 md:ml-16"
      } h-[122vh] w-auto container fluid pr-5 `}
    >
      <div className="col-md-7 col-lg-8 col-xl-9 w-auto mt-3 ">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Schedule Timings</h4>
                <div className="profile-box">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label>Timing Slot Duration</label>
                        <select className="select form-control">
                          <option>-</option>
                          <option>15 mins</option>
                          <option selected="selected">30 mins</option>
                          <option>45 mins</option>
                          <option>1 Hour</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card schedule-widget mb-0">
                        {/* <!-- Schedule Header --> */}
                        <div className="schedule-header">
                          {/* <!-- Schedule Nav --> */}
                          <div className="schedule-nav">
                            <ul className="nav nav-tabs nav-justified">
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${
                                    activeDay === "Sunday" ? "active" : null
                                  }`}
                                  data-toggle="tab"
                                  onClick={() => {
                                    setActiveDay("Sunday");
                                  }}
                                >
                                  Sunday
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${
                                    activeDay === "Monday" ? "active" : null
                                  }`}
                                  data-toggle="tab"
                                  onClick={() => {
                                    setActiveDay("Monday");
                                  }}
                                >
                                  Monday
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${
                                    activeDay === "Tuesday" ? "active" : null
                                  }`}
                                  data-toggle="tab"
                                  onClick={() => {
                                    setActiveDay("Tuesday");
                                  }}
                                >
                                  Tuesday
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${
                                    activeDay === "Wednesday" ? "active" : null
                                  }`}
                                  data-toggle="tab"
                                  onClick={() => {
                                    setActiveDay("Wednesday");
                                  }}
                                >
                                  Wednesday
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${
                                    activeDay === "Thursday" ? "active" : null
                                  }`}
                                  data-toggle="tab"
                                  onClick={() => {
                                    setActiveDay("Thursday");
                                  }}
                                >
                                  Thursday
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${
                                    activeDay === "Friday" ? "active" : null
                                  }`}
                                  data-toggle="tab"
                                  onClick={() => {
                                    setActiveDay("Friday");
                                  }}
                                >
                                  Friday
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${
                                    activeDay === "Saturday" ? "active" : null
                                  }`}
                                  data-toggle="tab"
                                  onClick={() => {
                                    setActiveDay("Saturday");
                                  }}
                                >
                                  Saturday
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- /Schedule Nav --> */}
                        </div>
                        {/* <!-- /Schedule Header --> */}

                        {/* <!-- Schedule Content --> */}
                        <div className="tab-content schedule-cont">
                          {/* <!-- Slotssss --> */}
                          <div
                            id="slot_monday"
                            className="tab-pane fade show active"
                          >
                            <h4 className="card-title d-flex justify-content-between">
                              <span>Time Slots</span>

                              {data && (
                                <>
                                  {data[activeDay].length > 0 ? (
                                    <a
                                      className="edit-link"
                                      onClick={() => {
                                        router.push("/doctor/edit/edit-slots");
                                      }}
                                    >
                                      <i className="fa fa-edit mr-1"></i>Edit
                                    </a>
                                  ) : (
                                    <a
                                      className="edit-link"
                                      onClick={() => {
                                        router.push("/doctor/add/add-slots");
                                      }}
                                    >
                                      <i className="fa fa-plus-circle"></i> Add
                                      Slot
                                    </a>
                                  )}
                                </>
                              )}
                            </h4>

                            {/* <!-- Slot List --> */}
                            {data && (
                              <div className="doc-times">
                                {data[activeDay].length > 0 ? (
                                  data[activeDay].map((item, index) => {
                                    return (
                                      <div
                                        key={`slot-${activeDay}-${index}`}
                                        className="doc-slot-list"
                                      >
                                        {item["Start"]} - {item["End"]}
                                        <button
                                          className="ml-2"
                                          onClick={() => handleDelete(index)}
                                        >
                                          <i className="fa fa-times text-[#E48684] hover:text-white "></i>
                                        </button>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div className="mt-3 text-gray-500 text-[14px] sm:text-[18px]">
                                    {"Not Available"}
                                  </div>
                                )}
                              </div>
                            )}
                            {!data && <div>Unable to fetch data</div>}

                            {/* <!-- /Slot List --> */}
                          </div>
                          {/* <!-- /Monday Slot --> */}
                        </div>
                        {/* <!-- /Schedule Content --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

	  { showDeleteModal === true && <div
        className="fixed top-0 left-0 bg-black h-[100vh] w-[100vw] bg-opacity-40 z-50"
        id="delete_modal"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-content p-2">
                <h4 className="modal-title mb-2">Delete</h4>
                <p className="mb-4">Are you sure want to delete the slot?</p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="btn bg-gray-500 hover:bg-gray-600 text-white  "
                    onClick={()=>{
                      setShowDeleteModal(false);
                    //   setDeleteEmail(null);
                    }}
                  >
                    Cancel{""}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ml-8"
                    onClick={()=>{
                    //   deleteDocProfile();
                      
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}

    </div>
  );
}

export default ScheduleTimings;
