import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Jwt from "jsonwebtoken";
import { useRouter } from 'next/router';

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

function Invoices() { 
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen)

  const router = useRouter();

  const [data, setData] = useState();

  useEffect(() => {
    //  just update the last visit
    let token = localStorage.getItem("token");
    if (token) {
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

      axios
        .get(`/api/getDocAppointment?email=${decryptedToken.Email}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      router.push("/login");
    }

  }, []);
  
  return (
    <div className={` ${homeSidebarOpen ? "ml-2 md:ml-[300px]" : "ml-2"} h-[122vh] w-auto frame pr-6 pt-3`}>
      			{/* <!-- Page Content --> */}
            <div className="card card-table ">
								<div className="card-body">
								
									{/* <!-- Invoice Table --> */}
									<div className="table-responsive">
										<table className="table table-hover table-center mb-0">
											<thead>
												<tr>
													<th>Invoice No</th>
													<th>Patient</th>
													<th>Amount</th>
													<th>Paid On</th>
													<th></th>
												</tr>
											</thead> 
											<tbody>
												{data?.map((item, index)=>{
													return <tr key={`doc-inv-${index}`}>
													<td className='uppercase'>
														<a href="invoice-view.html">#INV-{item.InvoiceId.slice(0,5)}</a>
													</td>
													<td>
														<h2 className="table-avatar">
															<a href="patient-profile.html" className="avatar avatar-sm mr-2">
																<img className="avatar-img rounded-circle" 
																src={item.PatientProfilePicture === " " ? "/dummy.jpeg" : item.PatientProfilePicture} 
																alt="User Image"/>
															</a>
															<a href="" className='ml-3'>{item.PatientName} <span className='uppercase'>#PT-{item.PatientEmail.split("@")[0]}</span></a>
														</h2>
													</td>
													<td>${item.TotalFee}</td>
													<td>{formatDate(new Date(item.BookingDate))}</td>
													<td className="text-right">
														<div className="table-action">
															<a href=""
															onClick={(e)=>{
																e.preventDefault();
																router.push(`/invoice-view?InvoiceId=${item.InvoiceId}`, "/invoice-view");
															}}
															className="btn btn-sm bg-info-light">
																<i className="far fa-eye"></i> View
															</a>

														</div>
													</td>
												</tr>
												
												})}
											</tbody> 
										</table>
									</div>
									{/* <!-- /Invoice Table --> */}
									
								</div>
							</div>	
			{/* {/* <!-- /Page Content --> */} 
      </div>
  )
}

export default Invoices