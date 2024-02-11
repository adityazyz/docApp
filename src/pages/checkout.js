import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function checkout() {
  const gateways = ["Paypal", "Stripe", "Paytm"];
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

  const router = useRouter();
  const [data, setData] = useState();

  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);
  const [patientDetailsObj, setPatientDetailsObj] = useState({});
  

  const [selectedGateway, setSelectedGateway] = useState();
  const [tncRead, setTncRead] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");

  // Function to handle changes in radio button selection
  const handleOptionChange = (event) => {
    setSelectedGateway(event.target.value);
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

  const checkLoginStatus = (type) => {
	let token = localStorage.getItem("token");
    if (token) {
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
	  if(decryptedToken.UserType === "Patient"){
		setIsPatientLoggedIn(true);
		axios.get(`/api/getPatients?email=${decryptedToken.Email}`)
		.then((response)=>{
			//set initial input fields 
			setFirstName(response.data.FirstName);
			setLastName(response.data.LastName);
			setEmail(response.data.Email);
			setPhone(response.data.Mobile.Number);

			// setting patient details obj
			const ptObj = {
				PatientEmail : response.data.Email,
				PatientProfilePicture : response.data.ProfilePicture,
				PatientName : `${response.data.FirstName} ${response.data.LastName}`,
				PatientId : response.data.PatientId
			}
			setPatientDetailsObj(ptObj);

		})
		.catch((error)=>{
			console.log(error.message);
		})
		return true;
	  }else{
		if(type != "Initial"){toast("You are loggedin as a Doctor.", emitterConfig);}
		return false;
	  }
    }else{
		if(type != "Initial"){toast("Login to continue.");}
		return false;
	}
  }

 
  useEffect(() => {
    // getting doctor data
    if (!router.query.data) {
      const localData = localStorage.getItem("data");

      if (localData) {
        setData(JSON.parse(localData));
      } else {
        router.back();
      }
    } else {
      localStorage.setItem("data", router.query.data);
      setData(JSON.parse(router.query.data));
    }

    // getting patient data on load // or asking to login/signup
    checkLoginStatus("Initial");

  }, []);

  const makePayment = () => {
	let initialObj = {...data};
	// remove unwanted keys
	delete initialObj.City 
	delete initialObj.Country
	// add wanted keys
	initialObj.ModeOfPayment = selectedGateway;
	initialObj.TransactionId = Math.floor(Math.random() * 10000000000000).toString();//random
	initialObj.Purpose = purpose;
    // convert date string to obj
	initialObj.FollowUpDate = new Date(initialObj.FollowUpDate);


	toast("Payment in progress.")
	// combine two obj into one
	const finalObj = {...patientDetailsObj, ...initialObj}

	// go ahead and book an appointment, once the payment is confirmed
	setTimeout(() => {
		axios.put("/api/bookAppointment",finalObj)
	.then((response)=>{
		if(response.data.success === true){
			toast.success("Appointment Booked!")
		}; 
	})
	.catch((error)=>{
		console.log(error.message);
	})
	}, 4000);

  };

  return (
    <>
      {/* <!--  Page Content --> */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-8">
              <div className="card">
                <div className="card-body">
                  {/* <!--  Checkout Form --> */}
                  <form action="https://dreamguys.co.in/demo/doccure/template/booking-success.html">
                    {/* <!--  Personal Information --> */}
                    <div className="info-widget">
                      <h4 className="card-title">Personal Information</h4>
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label className="mb-3">First Name</label>
                            <input className="form-control" type="text" value={firstName}
							onChange={(e)=>{setFirstName(e.target.value)}}
							/>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label className="mb-3">Last Name</label>
                            <input className="form-control" type="text" value={lastName}
							onChange={(e)=>{setLastName(e.target.value)}}
							/>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label className="mb-3">Email</label>
                            <input className="form-control" type="email" value={email}
							onChange={(e)=>{setEmail(e.target.value)}}
							/>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label className="mb-3">Phone</label>
                            <input className="form-control" type="text"  value={phone}
							onChange={(e)=>{setPhone(e.target.value)}}
							/>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group card-label">
                            <label className="mb-3">Purpose</label>
                            <input className="form-control" type="text" value={purpose} 
							onChange={(e)=>{setPurpose(e.target.value)}}
							/>
                            <p className="mt-1 text-sm text-gray-500">
                              Write exact illness or reason for appointment{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      {isPatientLoggedIn === false && <div className="exist-customer">
                        Existing Customer? <a href="#">Click here to login</a>
                      </div>}
                    </div>
                    {/* <!--  /Personal Information --> */}

                    <div className="payment-widget">
                      <h4 className="card-title">
                        Select Your Payment Gateway
                      </h4>

                      {/* <!--  Credit Card Payment --> */}
                      {/* <div className="payment-list">
												<label className="payment-radio credit-card-option">
													<input type="radio" name="radio" checked/>
													<span className="checkmark"></span>
													Credit card
												</label>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group card-label">
															<label className='mb-3' for="card_name">Name on Card</label>
															<input className="form-control" id="card_name" type="text"/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group card-label">
															<label className='mb-3' for="card_number">Card Number</label>
															<input className="form-control" id="card_number"  type="text"/>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-group card-label">
															<label className='mb-3' for="expiry_month">Expiry Month</label>
															<input maxLength={2} className="form-control" id="expiry_month" placeholder="MM" type="text"/>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-group card-label">
															<label className='mb-3' for="expiry_year">Expiry Year</label>
															<input maxLength={4} className="form-control" id="expiry_year" placeholder="YY" type="text"/>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-group card-label">
															<label className='mb-3' for="cvv">CVV</label>
															<input maxLength={3} className="form-control" id="cvv" type="text"/>
														</div>
													</div>
												</div>
											</div> */}
                      {/* <!--  /Credit Card Payment --> */}

                      {/* <!--  Paypal Payment --> */}
                      <div className="payment-list py-2">
                        {gateways &&
                          gateways.map((gateway, index) => {
                            return (
                              <label
                                key={`${gateway}-${index}`}
                                className="payment-radio paypal-option my-3"
                              >
                                <input
                                  type="radio"
                                  name="radio"
                                  value={gateway}
                                  onChange={handleOptionChange}
                                />
                                <span className="checkmark"></span>
                                {gateway}
                              </label>
                            );
                          })}
                      </div>
                      {/* <!--  /Paypal Payment --> */}

                      {/* <!--  Terms Accept --> */}
                      <div className="terms-accept pt-2">
                        <div className="custom-checkbox">
                          <input
                            type="checkbox"
                            checked={tncRead}
                            onClick={() => {
                              setTncRead(!tncRead);
                            }}
                          />
                          <label className="ml-2">
                            I have read and accept{" "}
                            <a href="">Terms &amp; Conditions</a>
                          </label>
                        </div>
                      </div>
                      {/* <!--  /Terms Accept --> */}

                      {/* <!--  Submit Section --> */}
                      <div className="submit-section mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn"
						  onClick={(e)=>{
							e.preventDefault();

							if(checkLoginStatus() === true){
								if(firstName.length === 0 || lastName.length === 0 || email.length === 0 || phone.length === 0 || purpose.length === 0){
									toast.error("Please fill all the fields.", emitterConfig);
								}else{
									if(firstName.length < 3 || lastName.length < 3 || email.length < 3 || phone.length < 3 || purpose.length < 3){
										toast.error("Each field should have atleast 3 charaacters.")
									}else{
										if(selectedGateway){
											if(tncRead === true){ 
												makePayment();
											}else{
												toast.error("Confirm you have read T&Cs.", emitterConfig);
											}
										}else{
											toast.error("Select a payment gateway.",emitterConfig)
										}
									}
								}
							}
						  }}
                        >
                          Confirm and Pay
                        </button>
                      </div>
                      {/* <!--  /Submit Section --> */}
                    </div>
                  </form>
                  {/* <!--  /Checkout Form --> */}
                </div>
              </div>
            </div>

            <div className="col-md-5 col-lg-4 theiaStickySidebar">
              {/* <!--  Booking Summary --> */}
              <div className="card booking-card">
                <div className="card-header">
                  <h4 className="card-title">Booking Summary</h4>
                </div>
                <div className="card-body">
                  {/* <!--  Booking Doctor Info --> */}
                  <div className="booking-doc-info">
                    <a href="doctor-profile.html" className="booking-doc-img">
                      <img
                        src={data? data.DoctorProfilePicture : "/dummy.jpeg"}
                        alt="User Image"
                      />
                    </a>
                    <div className="booking-info">
                      <h4>
                        <a href="doctor-profile.html"> {data?.DoctorName}</a>
                      </h4>

                      {data?.City && (
                        <div className="clinic-details">
                          <p className="doc-location">
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {data?.City}, {data?.Country}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <!--  Booking Doctor Info --> */}

                  <div className="booking-summary mt-4">
                    <div className="booking-item-wrap">
                      <ul className="booking-date">
                        {/* {data && console.log( data.FollowUpDate)} */}
                        <li>
                          Date <span>{formatDate(data?.FollowUpDate)}</span>
                        </li>
                        <li>
                          Time{" "}
                          <span className="text-transform: uppercase">
                            {data?.Time.Start}
                          </span>
                        </li>
                      </ul>
                      <ul className="booking-fee">
                        <li>
                          Consulting Fee <span>${data?.ConsultingFee}</span>
                        </li>
                        <li>
                          Booking Fee <span>${data?.BookingFee}</span>
                        </li>
                        {/* <li>Video Call <span>$50</span></li> */}
                      </ul>
                      <div className="booking-total">
                        <ul className="booking-total-list">
                          <li>
                            <span>Total</span>
                            <span className="total-cost">
                              ${data?.TotalFee}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--  /Booking Summary --> */}
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
      {/* {/* <!--  /Page Content --> */}
    </>
  );
}

export default checkout;
