import React from "react";

function bookingSuccess() {
  return (
    <>
      {/* <!-- Page Content --> */}
      <div className="content success-page-cont">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              {/* <!-- Success Card --> */}
              <div className="card success-card">
                <div className="card-body">
                  <div className="success-cont">
                    <i className="fas fa-check"></i>
                    <h3 className="font-bold mb-3">
                      Appointment booked Successfully!
                    </h3>
                    <p className="mb-1">
                      Appointment booked with <strong>Dr. Darren Elder</strong>
                      <br /> on <strong>12 Nov 2019, 5:00PM to 6:00PM</strong>
                    </p>
                    <div className="flex flex-col justify-center items-center">
                      <a
                        href="invoice-view"
                        className="btn btn-primary view-inv-btn mt-5"
                      >
                        View Invoice
                      </a>
                      <a href="invoice-view" className="btn text-white bg-cyan-600 view-inv-btn mt-3">
                        Open Dashboard
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Success Card --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}
    </>
  );
}

export default bookingSuccess;
