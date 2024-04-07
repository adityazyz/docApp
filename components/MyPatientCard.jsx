import axios from 'axios';
import React, { useEffect, useState } from 'react'

const calculateAge = (dateOfBirth) => {
    // Get the current date
    const currentDate = new Date();

    // Extract the year, month, and day from the current date and the date of birth
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const currentDay = currentDate.getDate();

    const birthYear = dateOfBirth.getFullYear();
    const birthMonth = dateOfBirth.getMonth() + 1; // Months are zero-based, so add 1
    const birthDay = dateOfBirth.getDate();

    // Calculate the age
    let age = currentYear - birthYear;

    // Adjust the age if the current date is before the birth date in the current year
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }

    return age;
}

function MyPatientCard({patientEmail}) {

    const [ptData, setPtData] = useState();

    useEffect(() => {
      axios.get(`/api/getPatients?email=${patientEmail}`)
      .then((response)=>{
        setPtData(response.data);
      })
      .catch((error)=>{
        console.log(error.data);
      })

    }, [])
    
  return (
    <div  class="col-md-6 col-lg-4 col-xl-3">
                {ptData && <div class="card widget-profile pat-widget-profile">
                  <div class="card-body">
                    <div class="pro-widget-content">
                      <div class="profile-info-widget">
                        <a href="patient-profile.html" class="booking-doc-img">
                          <img src={ptData.ProfilePicture != "" ? ptData.ProfilePicture  : "/dummy.jpeg" } alt="User Image"/>
                        </a>
                        <div class="profile-det-info">
                          <h3><a href="patient-profile.html">{ptData.FirstName} {ptData.LastName}</a></h3>
                          
                          <div class="patient-details mt-1">
                            <h5><b>Patient ID :</b> <span className='uppercase'> #PT-{ptData.Email.split("@")[0]}</span></h5>
                            <h5 class="mb-0"><i class="fas fa-map-marker-alt"></i> {ptData.City}{ptData.Country ? ", " : null}{ptData.Country}</h5>
                          </div>
                        </div>
                      </div>
                    </div> 
                    <div class="patient-info">
                      <ul>
                        <li>Phone <span>{ptData.Mobile.Number}</span></li>
                        <li>Age <span>{calculateAge(new Date(ptData.DateOfBirth))} Years {ptData.Gender === "" ? null : ", "} {ptData.Gender}</span></li>
                        <li>Blood Group <span>{ptData.BloodGroup === "" ? "Not known" : ptData.BloodGroup}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>}
              </div>
  )
}

export default MyPatientCard