import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DocCard from "../../components/DocCard";

function booking() {
  const disabledSlots = [
    {
      time: {
        Start: "10:00 am",
        End: "10:30 am",
      },
      day: new Date(),
    },
    {
      time: {
        Start: "12:30 pm",
        End: "1:00 pm",
      },
      day: new Date(),
    },
  ];

  const [data, setData] = useState();
  const [days, setDays] = useState([]);
  const [currentDays, setCurrentDays] = useState([]);
  const [weekNumber, setWeekNumber] = useState(0);
  const [slots, setSlots] = useState();
  const [selectedSlot, setSelectedSlot] = useState();

  const router = useRouter();

  const reRenderSlots = () => {
    if (weekNumber != 0) {
      let array = days.slice(0, 7); // keep it 0-7 by default

      if (weekNumber === 1) {
        array = days.slice(0, 7);
      } else if (weekNumber === 2) {
        array = days.slice(7, 14);
      } else if (weekNumber === 3) {
        array = days.slice(14, 21);
      } else if (weekNumber === 4) {
        array = days.slice(21, 28);
      }

      setCurrentDays(array);
    }
  };

  // func to get all the req details out of
  const getDateInfo = (dateObject, need) => {
    if (need === "day") {
      const dayOfWeekIndex = dateObject.getDay();
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return daysOfWeek[dayOfWeekIndex];
    } else if (need === "date") {
      return dateObject.getDate();
    } else if (need === "month") {
      const monthIndex = dateObject.getMonth();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[monthIndex];
    } else if (need === "year") {
      return dateObject.getFullYear();
    } else {
      return "";
    }
  };

  const getFullDate = (dateObject) => {
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return `${day}-${month}-${year}`;
  }; 

  const fetchScheduleDetails = (myData) =>{
    // fetch schedule day details of the doctor
    axios
    .get(`/api/getTimings?email=${myData.Email}`)
    .then((response) => {
      setSlots(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  useEffect(() => {
    if(!router.query.data){
      const localData = localStorage.getItem("data");
      if(localData){
        const myData = JSON.parse(localData);
        setData(myData);
        fetchScheduleDetails(myData);

      }else{
        router.back();
      }
    }else{
      localStorage.setItem("data",router.query.data);
      const myData = JSON.parse(router.query.data);
        setData(myData);
        fetchScheduleDetails(myData);
  }


    // setting days array
    const currentDate = new Date();
    const next28Days = [];
    for (let i = 0; i < 28; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      next28Days.push(nextDate);
    }
    setDays(next28Days);
    setWeekNumber(1);

    // fetch all appointments related to that doc, and filter for appointments with date objects equal or greater than him...and check for accepted appointment schedules
  }, []);

  useEffect(() => {
    reRenderSlots();
  }, [weekNumber]);

  return (
    <>
      {/* <!-- Page Content --> */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {data && <DocCard data={data} type={"booking"} />}
              <div className="row">
                <div className="col-12 col-sm-4 col-md-6">
                  <h4 className="mb-1">11 November 2019</h4>
                  <p className="text-muted mb-2">Monday</p>
                </div>
                {/* <div className="col-12 col-sm-8 col-md-6 text-sm-right">
									<div className="bookingrange btn btn-white btn-sm mb-3">
										<i className="far fa-calendar-alt mr-2"></i>
										<span></span>
										<i className="fas fa-chevron-down ml-2"></i>
									</div>
								</div> */}
              </div>
              {/* <!-- Schedule Widget --> */}
              <div className="card booking-schedule schedule-widget">
                {/* <!-- Schedule Header --> */}
                <div className="schedule-header">
                  <div className="row">
                    <div className="col-md-12">
                      {/* <!-- Day Slot --> */}
                      <div className="day-slot">
                        <ul>
                          <li className="left-arrow">
                            <button
                              onClick={() => {
                                if (weekNumber > 1) {
                                  setWeekNumber(weekNumber - 1);
                                }
                              }}
                            >
                              <i className="fa fa-chevron-left hover:text-green-600"></i>
                            </button>
                          </li>
                          {currentDays.length > 0 &&
                            currentDays.map((item, index) => {
                              return (
                                <li key={`${index}-day`}>
                                  <span>
                                    {getDateInfo(item, "day").slice(0, 3)}
                                  </span>
                                  <span className="slot-date">
                                    {getDateInfo(item, "date")}{" "}
                                    {getDateInfo(item, "month").slice(0, 3)}{" "}
                                    <small className="slot-year">
                                      {getDateInfo(item, "year")}
                                    </small>
                                  </span>
                                </li>
                              );
                            })}

                          <li className="right-arrow">
                            <button
                              onClick={() => {
                                if (weekNumber < 4) {
                                  setWeekNumber(weekNumber + 1);
                                }
                              }}
                            >
                              <i className="fa fa-chevron-right hover:text-green-600"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- /Day Slot --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- /Schedule Header --> */}

                {/* <!-- Schedule Content --> */}
                <div className="schedule-cont">
                  <div className="row">
                    <div className="col-md-12">
                      {/* <!-- Time Slot --> */}
                      <div className="time-slot">
                        <ul className="clearfix">
                          {currentDays &&
                            slots &&
                            currentDays.map((item, index) => {
                              if (slots[getDateInfo(item, "day")].length > 0) {
                                return (
                                  <li key={`myslot-${index}`}>
                                    {slots[getDateInfo(item, "day")].map(
                                      (data, i) => {
                                        // selected on a
                                        return (
                                          <a
                                            key={`${index}-${i}`}
                                            className={`timing
                                ${
                                  disabledSlots.some(
                                    (ditem) =>
                                      getFullDate(ditem["day"]) ===
                                      getFullDate(item)
                                  ) &&
                                  disabledSlots.some(
                                    (ditem) =>
                                      ditem["time"]["Start"] === data["Start"]
                                  )
                                    ? "bg-white border-0 border-none pointer-events-none"
                                    : null
                                }
                                  
                                ${
                                  selectedSlot &&
                                  selectedSlot["time"]["Start"] ===
                                    data["Start"] &&
                                  getDateInfo(selectedSlot["day"], "day") ===
                                    getDateInfo(item, "day")
                                    ? "selected"
                                    : null
                                }`}
                                            href="#"
                                            onClick={
                                              // comparinf day(name) and starting time of slot for selected
                                              () => {
                                                // if not a disabled slot
                                                if (
                                                  disabledSlots.some(
                                                    (ditem) =>
                                                      getFullDate(
                                                        ditem["day"]
                                                      ) === getFullDate(item)
                                                  ) &&
                                                  disabledSlots.some(
                                                    (ditem) =>
                                                      ditem["time"]["Start"] ===
                                                      data["Start"]
                                                  )
                                                ) {
                                                } else {
                                                  if (
                                                    selectedSlot &&
                                                    selectedSlot["day"] ===
                                                      item &&
                                                    selectedSlot["time"][
                                                      "Start"
                                                    ] === data["Start"]
                                                  ) {
                                                    setSelectedSlot(null);
                                                  } else {
                                                    setSelectedSlot({
                                                      time: {
                                                        Start: data["Start"],
                                                        End: data["End"],
                                                      },
                                                      day: item,
                                                    });
                                                  }
                                                }
                                              }
                                            }
                                          >
                                            <span>
                                              {data["Start"].split(" ")[0]}
                                            </span>{" "}
                                            <span>
                                              {data["Start"].split(" ")[1]}
                                            </span>
                                          </a>
                                        );
                                      }
                                    )}
                                  </li>
                                );
                              } else {
                                return <li>&nbsp;</li>;
                              }
                            })}
                        </ul>
                      </div>
                      {/* <!-- /Time Slot --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- /Schedule Content --> */}
              </div>
              {/* <!-- /Schedule Widget --> */}

              {/* <!-- Submit Section --> */}
              <div className="submit-section proceed-btn text-right">
                <a 
                  href=""
                  className="btn btn-primary submit-btn"
                  onClick={(e) => {
                    e.preventDefault();

                    selectedSlot ? router.push(
                      {
                        pathname: "/checkout",
                        query: {
                          data: JSON.stringify({
                            Country : data.Address.Country,
                            City : data.Address.City,

                            DoctorName: `Dr. ${data.FirstName} ${data.LastName}`,
                            DoctorProfilePicture: data.ProfilePicture,
                            DoctorEmail: data.Email,
                            DoctorSpecializations: data.Service.Specializations,
                            FollowUpDate: selectedSlot.day,
                            Time: selectedSlot.time,
                            ConsultingFee : data.Pricing,
                            BookingFee : 0.1 * data.Pricing , // 1% of consulting
                            TotalFee : data.Pricing + (0.1 * data.Pricing)
                          }),
                        },
                      },
                      "/checkout"
                    ) : null
                  }}
                >
                  Proceed to Pay
                </a>
              </div>
              {/* <!-- /Submit Section --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}
    </>
  );
}

export default booking;
