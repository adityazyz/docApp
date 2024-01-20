import axios from 'axios';
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
    changeWebsiteColor,
    changeWebsiteName,
    changeWebsiteLogo,
    changeWebsiteFavicon,
  } from "../slices/websiteSlice";
import {BiHomeAlt} from "react-icons/bi"
import {RiBookletLine, RiUserSettingsFill} from "react-icons/ri"
import {BsPersonFill,BsFillBarChartFill} from "react-icons/bs"
import {MdOutlineStarRate, MdCategory} from "react-icons/md"
import {IoMdSettings} from "react-icons/io"
import {BiSolidReport} from "react-icons/bi"
import { FaUserDoctor } from "react-icons/fa6"


const AdminSidebar = () => {

    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        axios
          .get("/api/getSiteSetting")
          .then((response) => {
            let dbData = response.data.data;
            dispatch(
              changeWebsiteColor({
                dark: dbData.websiteColorDark,
                light: dbData.websiteColorLight,
              })
            );
            dispatch(changeWebsiteName(dbData.websiteName));
            dispatch(changeWebsiteLogo(dbData.websiteLogo));
            dispatch(changeWebsiteFavicon(dbData.websiteFavicon));
          })
          .catch((error) => {
            console.log(error.message);
          });
      }, []);

    const sidebarItems = ["Dashboard", "Appointments", "Specialities", "Doctors", "Patients","Reviews", "Transactions", "Reports", "Profile", "Settings" ]

    const iconsClass = 'ml-3 mr-[10px] h-6 w-6 text-white'

    const sideBarIcons = {
        "Dashboard" : <BiHomeAlt className = {iconsClass}/>,
        "Appointments" : <RiBookletLine className = {iconsClass}/>,
        "Specialities" : <MdCategory className = {iconsClass}/>,
        "Doctors" : <FaUserDoctor className = {iconsClass}/>,
        "Patients" : <BsPersonFill className = {iconsClass}/>,
        "Reviews" : <MdOutlineStarRate className = {iconsClass}/>,
        "Transactions" : <BsFillBarChartFill className = {iconsClass}/> ,
        "Reports" :<BiSolidReport className = {iconsClass}/>,
        "Profile" : <RiUserSettingsFill className = {iconsClass}/>,
        "Settings" : <IoMdSettings className = {iconsClass}/>,
    
      }

      const websiteColorDark = useSelector((state) => state.website.websiteColorDark);
      const adminSidebarOpen = useSelector((state) => state.sidebar.adminSidebarOpen);
      
      const themeBgDark = {
        backgroundColor: websiteColorDark,
      };

    return (
        <>
           { adminSidebarOpen === true && <div className='z-40 w-[100vw] bg-black flex flex-row sticky '>
                <div className={` w-[250px] fixed px-3 py-4  h-screen pt-3  overflow-y-scroll  flex flex-col z-50 `}
                style={themeBgDark}
                >
                    {
                        sidebarItems.map((item, index) => {
                            // margin of 20 under last element of sidebar 
                            return (<Link href={`/admin/${item.toLowerCase()}`} key={`${index}xx`}>
                                <div className={`px-3 my-[2px] rounded-[6px] ${router.pathname.includes(item.toLowerCase())? "bg-gray-50 bg-opacity-[24%]" : "hover:bg-white hover:bg-opacity-[10%]"} flex`} >
                                {/* // for icon  */}
                                <div className='pt-[8px]'>
                                {sideBarIcons[item]}
                                </div>
                                {/* // for name  */}
                                <div className='pt-[4px]'>
                                <p className={`text-white text-[17px]  py-1  mb-2 ml-2 `} key={index + 1}> {item}</p>
                                </div>
                                
                            </div>
                            </Link>
                            )
                        })
                    }
                </div>
                {/* // items on the side  */}
                {/* {<div className='h-[91vh] w-[100%] absolute left-[250px] pt-[14vh] bg-black'>
                    // actual space available 
                   <div className='bg-white w-full h-full'>
                        
                   </div>
                </div>} */}
            </div>}
        </>
    )
}

export default AdminSidebar
