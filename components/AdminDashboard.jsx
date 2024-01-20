import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import axios from "axios";
import SimpleTable from '../components/SimpleTable'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts";

import { FaUserDoctor } from "react-icons/fa6";
import { BsPersonFill, BsCash } from "react-icons/bs";
import { RiBookletLine } from "react-icons/ri";
import { useRouter } from "next/router";


// tables data 
let fields1 = ["Doctor Name", "Speciality", "Earned", "Reviews"];
  let fields2 = ["Patient Name", "Phone", "Last Visit", "Paid"];
  let fields3 = ["Doctor Name", "Speciality","Patient Name", "Appointment Time", "Status", "Amount"];

  let data1 = [
    {image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      name : "Dr Sam Rami",
      spec : "yolo spec",
      earned : "$5000",
      Reviews : 3,
    },
    {image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      name : "Dr Sam Rami",
      spec : "yolo spec",
      earned : "$5000",
      Reviews : 4,
    },
    {
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      name : "Dr Sam Rami",
      spec : "yolo spec",
      earned : "$5000",
      Reviews : 5,
    },
    {
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      name : "Dr Sam Rami",
      spec : "yolo spec",
      earned : "$5000",
      Reviews : 5,
    }
  ];
  let data2 = [
    {
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      name : "Patient Roger",
      phone : "496937403",
      lastVisit : "14 June 2019",
      paid : "$4007",
    },
    {
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      name : "Patient Roger",
      phone : "496937403",
      lastVisit : "14 June 2019",
      paid : "$4007",
    },
    {
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      name : "Patient Roger",
      phone : "496937403",
      lastVisit : "14 June 2019",
      paid : "$4007",
    },
    {
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      name : "Patient Roger",
      phone : "496937403",
      lastVisit : "14 June 2019",
      paid : "$4007",
    },
  ];

  let data3 = [
    {
      Docname : "Dr Sam Rami",
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      spec : "yolo spec",
      Ptname : "Patient Roger",
      time : "11 May 2023, Friday",
      AppointmentStatus : 0,
      Amount : "$239m"
    },
    {
      Docname : "Dr Sam Rami",
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      spec : "yolo spec",
      Ptname : "Patient Roger",
      time : "11 May 2023, Friday",
      AppointmentStatus : 1,
      Amount : "$239m"
    },
    {
      Docname : "Dr Sam Rami",
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      
      spec : "yolo spec",
      Ptname : "Patient Roger",
      time : "11 May 2023, Friday",
      AppointmentStatus : 1,
      Amount : "$239m"
    },
    {
      Docname : "Dr Sam Rami",
      image1 : "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
      
      spec : "yolo spec",
      Ptname : "Patient Roger",
      time : "11 May 2023, Friday",
      AppointmentStatus : 1,
      Amount : "$239m"
    }
  ]

const AdminDashboard = () => {

  const router = useRouter();

  const iconClass = "rounded-full border-2 h-16 w-16 p-3 border-[#1f65a2] ";
  let chartList = [
    {
      title: "Doctors",
      number: 168,
      icon: <FaUserDoctor className={`${iconClass} border-none`} />,
    },
    {
      title: "Patients",
      number: 487,
      icon: <BsPersonFill className={`${iconClass} border-none`} />,
    },
    {
      title: "Appointment",
      number: 485,
      icon: <RiBookletLine className={`${iconClass} border-none`} />,
    },
    {
      title: "Revenue",
      number: 62523,
      icon: <BsCash className={`${iconClass} border-none`} />,
    },
  ];
  chartList.length = 4;
  
  const data = [
    { x: "Jan", y: 120 },
    { x: "Feb", y: 150 },
    { x: "Mar", y: 200 },
    { x: "Apr", y: 180 },
    { x: "May", y: 210 },
    { x: "Jun", y: 160 },
  ];

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "#667eea"); // blue
      gradient.addColorStop(1, "#764ba2"); // purple

      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 60],
              backgroundColor: gradient,
              borderColor: "transparent",
              pointBackgroundColor: "transparent",
              pointBorderColor: "transparent",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          //not working properly
          // maintainAspectRatio: false,
          // responsive: true,
        },
      });
    }
  }, []);

  const displayRevenue = (mynum) => {
    // convert to string
    let num2str = mynum.toString();

    //split all numbers
    let arr = num2str.split("");

    if(arr.length > 3){
      // remove last two letters
    arr.pop();
    arr.pop();
    arr.pop();
    arr.push("k"); // validation
    }

    // converting back to
    let displayString = "";
    arr.map((item, index) => {

        displayString += item;
      
    });
    return "$"+displayString;
  };

  return (
    <>
      {/* <AdminNav /> */}

      {/* main page  */}
      <div className="bg-[#F8F9FA]  py-4 px-3">
        <div className="my-2 mx-3">
          {/* heading  */}
          <div className="md:w-auto  flex flex-col ">
            <p className="text-xl text-zinc-800 font-semibold">Welcome Admin!</p>
            <p className="text-md ml-1 text-zinc-500 font-semibold mt-3 mb-3">
              Dashboard
            </p>
          </div>

          <div>
            {/* four charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4 gap-8 mt-4 ">
              {chartList.map((list, index) => {
                let iconColor = "";
                let iconBorder = "";
                let progressBarColor = "";
                // for icon color
                list.title === "Doctors"
                  ? (iconColor = "text-cyan-400 ")
                  : null;
                list.title === "Patients"
                  ? (iconColor = "text-green-500 ")
                  : null;
                list.title === "Appointment"
                  ? (iconColor = "text-red-500 ")
                  : null;
                list.title === "Revenue"
                  ? (iconColor = "text-yellow-400")
                  : null;
                // for icon border (style and color)
                list.title === "Doctors"
                  ? (iconBorder = " border-cyan-400 ")
                  : null;
                list.title === "Patients"
                  ? (iconBorder = " border-green-500 ")
                  : null;
                list.title === "Appointment"
                  ? (iconBorder = " border-red-500 ")
                  : null;
                list.title === "Revenue"
                  ? (iconBorder = "border-yellow-400")
                  : null;
                  // setting progressbar color
                  list.title === "Doctors"
                  ? (progressBarColor = " bg-cyan-400 ")
                  : null;
                list.title === "Patients"
                  ? (progressBarColor = " bg-green-500 ")
                  : null;
                list.title === "Appointment"
                  ? (progressBarColor = " bg-red-500 ")
                  : null;
                list.title === "Revenue"
                  ? (progressBarColor = "bg-yellow-400")
                  : null;
                return (
                  <div key={`${index}${list.name}`} className="col-span-1 bg-white">
                    <div className=" shadow-sm rounded-lg py-4  md:w-auto">
                      <div className="flex  justify-between ">
                        <div
                          className={`ml-[22px]  border-3 rounded-full ${iconBorder} `}
                        >
                          <span className={`py-1 rounded-full ${iconColor} `}>
                            {list.icon}
                          </span>
                        </div>

                        <div className="  md:ml-auto  mr-[22px] ">
                          <h3 className="text-xl lg:text-[1vw] font-semibold mt-3 mx-2 ">
                            {list.title === "Revenue" ? displayRevenue(list.number) : null}
                            {list.title !== "Revenue" ? list.number : null}
                          </h3>
                        </div>
                      </div>

                      <div className="mt-4 ml-6 flex flex-col ">
                        {/* // name  */}
                        <h6 className="text-sm text-muted font-semibold">
                          {list.title}
                        </h6>
                        {/* // progressbar  */}
                        <div className="relative mt-2">
                          <div className={`absolute rounded-lg z-10 w-[88%] h-[6px] bg-gray-200`}></div>
                          <div className={`absolute rounded-lg z-20 w-[50%] h-[6px] ${progressBarColor}`}></div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
            </div>
            {/* two graphs  */}
            <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-8 ">
              {/* Row 1, Column 1 */}
              <div className="col-span-1 md:w-auto bg-white rounded-lg md:h-auto shadow-lg">
                <div className="w-full border-b-[1px] border-b-zinc-300 font-medium px-7 py-4 text-2xl ">
                  <p>Revenue</p>
                </div>
                <ResponsiveContainer width="95%" height={350}>
                  <LineChart data={data} className="mt-2 py-4 ">
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="y" stroke="#8884d8" />
                    <Line type="bumpX" dataKey="y" stroke="#F8F9FA" />

                    <ReferenceDot x="Mar" y={160} r={5} fill="red" isFront />
                    <ReferenceDot x="Apr" y={150} r={5} fill="red" isFront />
                    <ReferenceDot x="Jan" y={130} r={5} fill="red" isFront />
                    <ReferenceDot x="Feb" y={140} r={5} fill="red" isFront />
                    <ReferenceDot x="Jun" y={210} r={5} fill="red" isFront />
                    <ReferenceDot x="May" y={150} r={5} fill="red" isFront />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Row 1, Column 2 */}
              <div className="col-span-1 md:w-auto md:h-auto rounded-lg bg-white shadow-lg  overflow-hidden ">
                <div className="w-full border-b-[1px] border-b-zinc-300 font-medium px-7 py-4 text-2xl ">
                  <p>Status</p>
                </div>
                <div className="p-4 h-[400px] md:h-auto ">
                  {/* <ResponsiveContainer width="100%" height="100%"> */}
                  <canvas ref={chartRef} />
                  {/* </ResponsiveContainer> */}
                </div>
              </div>
            </div>

  {/* ==================================================================== */}
            {/* doc nd pt tables  */}

            <div className="flex justify-between flex-col md:flex-row w-full my-4">

              {/* DOC TABLE  */}
            <div className="w-[100%] md:w-[50%] overflow-scroll mr-5" 
            onClick={()=>{
              router.push("/admin/doctors")
            }}> 
            <SimpleTable title={"Doctors List"} fields = {fields1} data = {data1} extraSpacing = {false} />

            </div>
              {/* patient table */}
              <div className="w-[100%] md:w-[50%] overflow-scroll "
              onClick={()=>{
                router.push("/admin/patients")
              }}
              > 
            <SimpleTable title={"Patients List"} fields = {fields2} data = {data2} extraSpacing = {false} />

            </div>
              
            
          </div>

          {/* appoitnment list  */}
          <div className="w-auto overflow-auto"> 
            <SimpleTable title={"Appointments List"} fields = {fields3} data = {data3} extraSpacing = {true} widthLarge = {true}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
