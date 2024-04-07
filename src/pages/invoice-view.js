// 2 query parameters -> InvoiceId and Type (if type new-> show go to dashboard, if type null - show close)

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import Jwt from "jsonwebtoken";
import { IoMdDownload } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useReactToPrint } from "react-to-print";

//pass extra parameter in url...called new...to add condition for button

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}

function invoiceView() {
  const divRef = useRef(null);

  const [data, setData] = useState();
  const [subtotal, setSubtotal] = useState();

  const [newInvoice, setNewInvoice] = useState();

  const router = useRouter();

  const handleDownloadPDF = () => {
    html2canvas(divRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = canvas.height * (imgWidth / canvas.width) * 1.1; // Increase by 10%
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("content.pdf");
    });
  };

  // print function based on react-to-print
  const handlePrint = useReactToPrint({
    content: () => divRef.current,
  });

  useEffect(() => {
    if (router.query.InvoiceId) {
      axios
        .get(`/api/getInvoice?InvoiceId=${router.query.InvoiceId}`)
        .then((response) => {
          setData(response.data);
          let amount = 0;
          response.data.GeneralDetails.map((item) => {
            amount += item["Amount"];
            setSubtotal(amount);
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      let token = localStorage.getItem("token");
      if (token) {
        let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
        if (decryptedToken.UserType === "Doctor") {
			router.back();
        } else {
          router.push("/patient/dashboard");
        }
      } else {
        router.push("/");
      }
    }

    if (router.query.Type) {
      setNewInvoice(true);
    }
  }, []);

  return (
    <>
      {/* <!-- Page Content --> */}
      <div className="content">
        <div ref={divRef} className="container-fluid">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="invoice-content">
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="invoice-logo">
                        <img src="assets/img/logo.png" alt="logo" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <p className="invoice-details">
                        {/* <strong>Order:</strong> {data?._id} <br/> */}
                        <strong>Issued:</strong>{" "}
                        {formatDate(new Date(data?.IssueDate))}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <!-- Invoice Item --> */}
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="invoice-info">
                        <strong className="customer-text">Invoice From</strong>
                        <p className="invoice-details invoice-details-two">
                          {data?.DoctorName} <br />
                          {data?.DoctorAddress.Address}
                          {data?.DoctorAddress.City === " " ? null : ","}{" "}
                          {data?.DoctorAddress.City}
                          {data?.DoctorAddress.State === " " ? null : ","}
                          <br />
                          {data?.DoctorAddress.State}
                          {data?.DoctorAddress.Country === " "
                            ? null
                            : ","}{" "}
                          {data?.DoctorAddress.Country} <br />
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="invoice-info invoice-info2">
                        <strong className="customer-text">Invoice To</strong>
                        <p className="invoice-details">
                          {data?.PatientName} <br />
                          {data?.PatientAddress.Address}{" "}
                          {data?.PatientAddress.City === " " ? null : ","}{" "}
                          {data?.PatientAddress.City}
                          {data?.PatientAddress.State === " " ? null : ","}
                          <br />
                          {data?.PatientAddress.State}{" "}
                          {data?.PatientAddress.Country === " " ? null : ","}{" "}
                          {data?.PatientAddress.Country} <br />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Invoice Item --> */}

                {/* <!-- Invoice Item --> */}
                <div className="invoice-item">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="invoice-info">
                        <strong className="customer-text">
                          Payment Method
                        </strong>
                        <p className="invoice-details invoice-details-two">
                          {data &&
                            Object.keys(data?.PaymentDetails).map(
                              (key, index) => {
                                return (
                                  <div key={`pd-${index}`}>
                                    {data?.PaymentDetails[key]}
                                  </div>
                                );
                              }
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Invoice Item --> */}

                {/* <!-- Invoice Item --> */}
                <div className="invoice-item invoice-table-wrap">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <table className="invoice-table table table-bordered">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th className="text-center">Quantity</th>
                              <th className="text-center">VAT</th>
                              <th className="text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data &&
                              data?.GeneralDetails.map((item, index) => {
                                return (
                                  <tr key={`gd-${index}`}>
                                    <td>{item["Service"]}</td>
                                    <td className="text-center">1</td>
                                    <td className="text-center">$0</td>
                                    <td className="text-right">
                                      ${item["Amount"]}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-md-6 col-xl-4 ml-auto">
                      <div className="table-responsive">
                        <table className="invoice-table-two table">
                          <tbody>
                            {data && data.Discount === 0 ? null : (
                              <tr>
                                <th>Subtotal:</th>
                                <td>
                                  <span>${subtotal}</span>
                                </td>
                              </tr>
                            )}
                            {data && data.Discount != 0 && (
                              <tr>
                                <th>Discount:</th>
                                <td>
                                  <span>-{data.Discount}%</span>
                                </td>
                              </tr>
                            )}
                            <tr>
                              <th>Total Amount:</th>
                              {data && data.Discount === 0 ? (
                                <td>
                                  <span>${subtotal}</span>
                                </td>
                              ) : (
                                <td>
                                  <span>
                                    $
                                    {subtotal -
                                      (data?.Discount / 1000) * subtotal}
                                  </span>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Invoice Item --> */}

                {/* <!-- Invoice Information --> */}
                <div className="other-info">
                  <h4>Other information</h4>
                  <p className="text-muted mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus sed dictum ligula, cursus blandit risus. Maecenas
                    eget metus non tellus dignissim aliquam ut a ex. Maecenas
                    sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae
                    lorem interdum, eu scelerisque tellus fermentum. Curabitur
                    sit amet lacinia lorem. Nullam finibus pellentesque libero.
                  </p>
                </div>
                {/* <!-- /Invoice Information --> */}
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid flex justify-center py-4">
          {newInvoice ? (
            <button
              className="bg-gray-700 text-white py-2 px-3 rounded-lg mx-2 sm:mx-8"
              onClick={() => {
                let token = localStorage.getItem("token");
                if (token) {
                  let decryptedToken = Jwt.decode(
                    token,
                    process.env.JWT_SECRET
                  );
                  if (decryptedToken.UserType === "Doctor") {
                    router.push("/doctor/dashboard");
                  } else {
                    router.push("/patient/dashboard");
                  }
                } else {
                  router.push("/");
                }
              }}
            >
              Go to Dashboard{" "}
            </button>
          ) : (
            <button
              className="bg-red-500 text-white py-2 px-3 rounded-lg mx-2 sm:mx-8"
              onClick={() => {
                router.back();
              }}
            >
              <RxCross2 className="text-white inline mb-1 mr-1" />
              Close{" "}
            </button>
          )}

          <button
            onClick={handleDownloadPDF}
            className="bg-green-500 text-white py-2 px-3 rounded-lg mx-2 sm:mx-8"
          >
            Download <IoMdDownload className="text-white inline" />
          </button>

          <button
            onClick={handlePrint}
            className="btn btn-sm bg-primary-light px-4 ml-2"
          >
            {" "}
            <i className="fas fa-print"></i> Print
          </button>
        </div>
      </div>
      {/* {/* <!-- /Page Content --> */}
    </>
  );
}

export default invoiceView;
