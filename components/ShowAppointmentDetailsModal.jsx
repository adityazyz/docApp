import React, { useRef, useEffect } from "react";
import { useReactToPrint } from 'react-to-print';
import { useLockBodyScroll } from "@uidotdev/usehooks";

function ShowAppointmentDetailsModal({ details, closeFunction, childDivRef }) {
  useLockBodyScroll();
  const divRef = useRef(null);

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

  // print function based on react-to-print
  const handlePrint = useReactToPrint({
    content: () => divRef.current
  });

  const formatDate = (date) => {
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

  return (
    <div
      ref={divRef}
      className="h-full w-full fixed top-0 left-0 z-30 bg-black bg-opacity-30"
      id="appt_details"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Appointment Details</h5>
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
            <ul className="info-details">
              <li>
                <div className="details-header">
                  <div className="row">
                    <div className="col-md-6">
                      <span className="title uppercase">#APT-{details._id.slice(0,6)}</span>
                      <span className="text ">
                        {formatDate(new Date(details["FollowUpDate"]))}{" "}
                        {
                          <span className="uppercase">
                            {details["Time"]["Start"]}
                          </span>
                        }
                      </span>
                    </div>
                    <div className="col-md-6">
                      <div className="text-right">
                        {details["Status"] === "pending" ? (
                          <span className="badge badge-pill bg-warning-light">
                            Pending
                          </span>
                        ) : details["Status"] === "confirm" ? (
                          <span className="badge badge-pill bg-success-light">
                            Confirm
                          </span>
                        ) : (
                          <span className="badge badge-pill bg-danger-light">
                            Cancelled
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span className="title">Status:</span>
                <span className="text uppercase">{details.Status}</span>
              </li>
              <li>
                <span className="title">Confirm Date:</span>
                <span className="text">
                  {formatDate(new Date(details["BookingDate"]))}
                </span>
              </li>
              <li>
                <span className="title">Paid Amount</span>
                <span className="text">${details["TotalFee"]}</span>
              </li>
              <li className="w-full flex justify-end">
                <a
                  href=""
                  onClick={(e)=>{
                    e.preventDefault();
                    handlePrint()
                  }}
                  className="btn btn-sm bg-primary-light"
                >
                  <i className="fas fa-print"></i> Print
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAppointmentDetailsModal;
