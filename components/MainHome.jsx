import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MainHome = () => {
  const homeSidebarOpen = useSelector((state) => state.sidebar.homeSidebarOpen);
  const [fieldValue, setFieldValue] = useState("");
  const router = useRouter();

  const [options, setOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const performSearch = () =>{
    if (fieldValue.length > 0) {
      router.push(
        {
          pathname: "/search-doctors",
          query: { keyword: fieldValue },
        },
        "/search-doctors"
      ); 
    }
  }

  const handleOptionClick = (option) => {
    setFieldValue(option)
    setShowDropdown(false);
    // if option clicked, directly search using it
    router.push(
      {
        pathname: "/search-doctors",
        query: { keyword: option },
      },
      "/search-doctors"
    );
    
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch()
    }
  };

  useEffect(() => {
    axios
      .get("/api/specGet")
      .then((response) => {
        function extractFieldValues(arr, fieldName) {
          return arr.map((obj) => obj[fieldName]);
        }
        setOptions(extractFieldValues(response.data.data, "name"));
      })
      .catch((error) => {
        console.log(error.message);
      });

  }, [])
  

  return (
    <>
      <div className={`${homeSidebarOpen ? "ml-2 md:ml-[300px]" : "ml-2"}`}>
        <section className="flex flex-col bg-[#f8f8f8] items-center mt-[82px] h-[90vh]">
          <div className="flex flex-col items-start md:items-center mt-[50px] px-4">
            <p className="text-black font-bold text-3xl md:text-[38px] ">
              Search Doctor, Make an Appointment
            </p>
            <p className="font-semibold text-[#5a5d5c] text-[18px]">
              Discover the best doctors, clinic & hospital the city nearest to
              you.
            </p>
          </div>

          <div className="flex gap-4 mt-[30px] ">
            {/* <div className="relative flex flex-col  ">
              <div className="flex flex-col justify-center">
                <span className="absolute mx-2">
                  <svg
                    width={20}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2c-4.4 0-8 3.6-8 8 0 5.4 7 11.5 7.3 11.8.2.1.5.2.7.2.2 0 .5-.1.7-.2.3-.3 7.3-6.4 7.3-11.8 0-4.4-3.6-8-8-8zm0 17.7c-2.1-2-6-6.3-6-9.7 0-3.3 2.7-6 6-6s6 2.7 6 6-3.9 7.7-6 9.7zM12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                      fill="#0D0D0D"
                    />
                  </svg>
                </span>
                <input
                  className="focus:outline-none w-[260px] py-2 px-8 rounded-lg border border-[#9B9D9B] "
                  type="text"
                  placeholder="Search Location"
                />
              </div>
              <p className="text-[14px] text-[#9B9D9B] ">
                Based on your Loaction
              </p>
            </div> */}

            <div className="flex flex-col ">
              <div className="flex flex-col justify-center">
                <span className="absolute mx-2 ">
                  <svg
                    width="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
                      fill="#0D0D0D"
                    />
                  </svg>
                </span>
                <div className="relative inline-block">
                  <input
                    className="focus:outline-none w-[70vw] sm:w-[400px] py-2 px-8 rounded-lg border border-[#9B9D9B] "
                    type="text"
                    value={fieldValue}
                    onChange={(e) => {
                      setFieldValue(e.target.value); 
                      setShowDropdown(true);

                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="Search doctors"

                    onFocus={()=>{
                      if(showDropdown != true)
                      {
                        setShowDropdown(true)
                      }}
                    }
                    onBlur={()=>{
                      if(showDropdown != false)
                      {
                        setTimeout(() => {
                          setShowDropdown(false)
                        }, 100);
                      }}
                    }
                  />

                  {showDropdown && (
                    <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg">
                      <ul className="py-1">
                        {options.map((option, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[14px] text-[#5a5d5c] ">
                Search based on speciality Ex : Dentist, Cardiologists etc
              </p>
            </div>

            <div>
              <button
                className="bg-green-600 p-2 rounded-md "
                onClick={performSearch}
              >
                <svg
                  width="25px"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" />
                </svg>
              </button>
            </div>
          </div>

          <img className=" w-[1100px]" src={"search-bg.png"} alt="" />
        </section>
      </div>
    </>
  );
};

export default MainHome;
