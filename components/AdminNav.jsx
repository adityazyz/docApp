import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeAdminPFP } from "../slices/adminPFPSlice";
import { closeAdminSidebar, openAdminSidebar } from "../slices/sidebarSlice";
import Favicon from "../components/Favicon";
import Jwt from "jsonwebtoken";
import axios from "axios";
import Link from "next/link"; 
import { useRouter } from "next/router"; 

function AdminNav() {
  const dispatch = useDispatch();
  const router = useRouter();

  let profilePic = useSelector((state)=>state.adminPFP.ProfilePicture)

  const [adminName, setAdminName] = useState();

  const adminSidebarOpen = useSelector((state) => state.sidebar.adminSidebarOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      // decrypt jwt token
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
      setAdminName(decryptedToken.Name);

      const adminEmail = decryptedToken.Email

      // getting profile picture
      axios.get(`/api/getAdmin?email=${adminEmail}`)
      .then((response) => {
        let data = response.data[0];
        //  update in redux store
        dispatch(changeAdminPFP(data.ProfilePicture));
      })
      .catch((error)=>{console.log({error})});
    } else {
      router.push("/");
    }
  }, []);

  const websiteLogo = useSelector((state) => state.website.websiteLogo);
  const websiteFavicon = useSelector((state) => state.website.websiteFavicon);

  const [activeItem, setActiveItem] = useState(3);

  const handleItemClick = (itemNumber) => {
    setActiveItem(itemNumber);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <> 
      {/* // setting favicon */}
      <Favicon />

      <div className="sticky top-0 z-30 bg-[#F7F8F9]">
        <div className="sticky h-[58px]  flex items-center w-[100%] shadow-md border-b-[1px] border-b-bg-zinc-300 ">
          {/* logo */}
          {/* logo for mobile ////////////////////////////////////////////////////// */}
          <div className=" ml-[35vw] sm:hidden ">
            <a href="/admin/dashboard">
              <img
                src={websiteFavicon}
                alt=""
                className="mt-1 mx-14 h-[40px] "
              />
            </a>
          </div>

          {/*logo for desktop */}
          <div className="py-2 hidden sm:flex ml-[15vw] sm:ml-[27vw] md:ml-0 items-center">
            <a href="/admin/dashboard">
              <img src={websiteLogo} alt="" className="mt-1 mx-14 h-[40px] " />
            </a>
          </div>

          {/* // sidebar toggel and searchbar / */}
          <div className="flex  w-[40vw]  md:pb-4">
            {/* sidebar btn */}
            <button
              className="text-2xl text-zinc-600 absolute left-[3vw] top-[9px]  md:relative    "
              onClick={()=>{
                if(adminSidebarOpen === true){
                  dispatch(closeAdminSidebar())
                }else{
                  dispatch(openAdminSidebar())
                }
              }}
            >
              <i className="fa-solid fa-bars">

              </i>
            </button>

            {/* search bar */}
            <div className="hidden md:flex  ml-20 justify-between  items-center md:mt-5  h-[65%]   w-[250px] placeholder-black placeholder:text-sm border-[1px] border-zinc-300 shadow-sm rounded-3xl px-4  py-2 ">
              <input
                className=" outline-none w-[85% bg-[#F8F9FA]"
                type="text"
                placeholder="Search Here"
              />
              <i className="fa-solid fa-magnifying-glass "></i>
            </div>
          </div>

          {/* profile n notification */}

          <div className="flex justify-center items-center cursor-pointer ">
            <button className="absolute right-[50px] md:right-[80px] py-[14px] px-4 mt-0 hover:bg-zinc-300 ">
              <span className=" hidden md:block absolute ml-5 rounded-xl h-[15px] w-[15px]  bg-blue-800 text-[10px] text-white ">
                4
              </span>
              <i className="hidden md:block text-2xl fa-regular fa-bell"></i>
            </button>
          </div>

          {/* profile */}
          <button
            className="absolute  right-[5px] cursor-pointer h-full hover:bg-zinc-300 "
            onClick={toggleDropdown}
            onBlur={() => {
              setTimeout(() => {
                setIsOpen(false);
              }, 100);
            }}
          >
            <div className="flex justify-center items-center mr-3 ml-2 mb-3  ">
              <div className="flex justify-center items-center h-[full]">
                <div className="w-[30px] h-[30px] py-2  ">
                  <img
                    className=" rounded-full w-[30px] h-[30px]"
                    src={
                      profilePic.length === 0
                        ? "/dummy.jpeg"
                        : profilePic
                    }
                    alt="admin-avatar"
                  />
                </div>
                <div>
                  <i className="hidden md:block mt-4 ml-2 text-zinc-700 fa-solid fa-angle-down"></i>
                </div>
              </div>

              {/* dropdown  */}
              <div className="absolute right-[199px] top-[8vh] ">
                {isOpen && (
                  <div className="absolute z-10 w-[200px] bg-white rounded-md shadow-lg">
                    {/* Dropdown Items */}
                    <div className=" px-4 py-3 flex border-b-zinc-200 border-b-[1px]">
                      <div className=" rounded-full ">
                       
                        <img
                          src={
                            profilePic.length === 0
                              ? "/dummy.jpeg"
                              : profilePic
                          }
                          alt="admin-avatar"
                          className="w-[40px] h-[40px]  rounded-full"
                        />
                      </div>
                      <div className="ml-4 flex flex-col">
                        <p className=" text-[15px] ml-2">{adminName}</p>
                        <p className="text-[13px] text-zinc-400  ">
                          Administrator
                        </p>
                      </div>
                    </div>
                    <Link href="/admin/profile">
                      <div className=" text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200 hover:text-black border-b-zinc-200 border-b-[1px]">
                        My Profile
                      </div>
                    </Link>
                    <Link href="/admin/settings">
                      <div className="text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200  hover:text-black border-b-zinc-200 border-b-[1px]">
                        Settings
                      </div>
                    </Link>
                    <Link
                      href="/"
                      onClick={() => {
                        localStorage.removeItem("token");
                      }}
                    >
                      <div className="text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200  hover:text-black border-b-zinc-200 border-b-[1px]">
                        Logout
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>
      </div> 
    </>
  );
}

export default AdminNav;
