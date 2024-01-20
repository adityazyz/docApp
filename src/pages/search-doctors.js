import React, { useState } from "react";
import DocCard from "../../components/DocCard";
import Image from "next/image";
import axios from "axios";

function searchDoctors() {
  const [searchSpec, setSearchSpec] = useState("");
  const [data, setData] = useState();
 
  const getDoc = (e) => {
    e.preventDefault();

    // func to filter the data according to search field
    const filterArrayBySpec = (arr, filterValue) => {
      return arr.filter((obj) =>
        obj["Service"]["Specializations"].includes(filterValue)
      ); 
    };

    if (searchSpec.length > 0) {
      axios
        .get("/api/getAllDoctors")
        .then((response) => {
          setData(response.data)
          // let finalData = filterArrayBySpec(response.data, searchSpec);

        })
        .catch((error) => {
          console.log(error.message);
        });
    }else{
        setData();
    }
  };

  // afunction
  const handleKeyDown = (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Trigger the button click
      document.getElementById("submitButton").click();
    }
  }

  return (
    <div className=" flex justify-start items-center flex-col ">
      {/* // search bar  */}
      
      <div className="flex flex-col sm:flex-row mt-2 ">
              <div>
              <div className="flex flex-col  justify-center">
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
                <input
                  className="focus:outline-none w-[70vw] sm:w-[400px] py-2 px-8 rounded-lg border border-[#9B9D9B] "
                  type="text"
                  placeholder="Search doctors"
                  value={searchSpec}
                  onChange={(e) => {
                    setSearchSpec(e.target.value);
      
                  }}
                  onKeyDown={handleKeyDown}

                />
              </div>
              <p className="text-[14px] text-[#5a5d5c] ml-3 mb-3">
                Search based on speciality, Ex : Dental 
              </p>
              </div>
              <button
          type="submit"
          id="submitButton"
          className="btn btn-primary search-btn h-10 ml-3"
          onClick={getDoc}
        >
          {/* <i className="fas fa-search"></i>  */}
           <span>Search</span>
        </button>
            </div>

      {/* // show results here  */}
      <div className=" container fluid">
        {!data && (
          <div className="h-[60vh] flex flex-col items-center justify-between">
            <h2 className=" font-semibold text-sm text-gray-600"></h2>
            <img className="" src={"/search-bg.png"} alt="" />
          </div>
        )}

        {
            data && data.map((item,index)=>{
                return <DocCard data = {item} key={`docCard${index}`} />
            })
            
        }

      </div>
    </div>
  );
}

export default searchDoctors;
