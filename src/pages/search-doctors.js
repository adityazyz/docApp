import React, { useEffect, useState } from "react";
import DocCard from "../../components/DocCard";
import axios from "axios";
import { useRouter } from "next/router";

function searchDoctors() {
  const [searchSpec, setSearchSpec] = useState(""); 
  const [data, setData] = useState();
  const router = useRouter();

  const [options, setOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const performSearch = ()=>{
    if (searchSpec.length > 0) {
      axios
        .get(`/api/searchDoctors?spec=${searchSpec}`)
        .then((response) => {
          setData(response.data.result)
        }) 
        .catch((error) => {
          console.log(error.message);
        });
    }else{
        setData();
    }
  }

  const handleOptionClick = (option) => {
    setSearchSpec(option)
    setShowDropdown(false);

    axios
        .get(`/api/searchDoctors?spec=${option}`)
        .then((response) => {
          setData(response.data.result)
        }) 
        .catch((error) => {
          console.log(error.message);
        });

  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch()
      setTimeout(() => {
        if(showDropdown === true){
          setShowDropdown(false);
        }
      }, 100);
    }
  };

 
  const getDoc = (e) => {
    e.preventDefault();

    performSearch();
  };



  useEffect(() => {

    // const filterArrayBySpec = (arr, filterValue) => {
    //   return arr.filter((obj) =>
    //     obj["Service"]["Specializations"].includes(filterValue)
    //   ); 
    // };

    //set spec
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

    if(router.query.keyword){
      setSearchSpec(router.query.keyword);
      axios
      .get(`/api/searchDoctors?spec=${router.query.keyword}`)
      .then((response) => {
        setData(response.data.result)
      })
      .catch((error) => {
        console.log(error.message);
      });
    }

  }, [])
  

  return (
    <div className=" flex justify-start items-center flex-col ">
      {/* // search bar  */}
      
      <div className="flex flex-col sm:flex-row mt-4">
               <div>
               <div className="relative inline-block">
                  <input
                    className="focus:outline-none w-[70vw] sm:w-[400px] py-2 px-8 rounded-lg border border-[#9B9D9B] "
                    type="text"
                    value={searchSpec}
                    onChange={(e) => {
                      setSearchSpec(e.target.value); 
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
                    <div className="absolute mt-1 w-full z-30 bg-white rounded-md shadow-lg">
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

        {/* // when nothing searched  */}
        {!data && (
          <div className="h-[60vh] flex flex-col items-center justify-between">
            <h2 className=" font-semibold text-sm text-gray-600"></h2>
            <img className="" src={"/search-bg.png"} alt="" />
          </div>
        )}
 
          {/* // when seearched and results found  */}
        {
            data && (data.length > 0) &&  data.map((item,index)=>{
                return <DocCard data = {item} key={`docCard${index}`} type={"half"} />
            })
            
        }

        {/* // when searched and result found  */}
        {
            data && (data.length === 0) &&  <div className=" h-[50vh] w-full flex items-center justify-center">
              <p className="text-sm text-slate-400">No Results Found.</p>
                </div>
            
        }

      </div>
    </div>
  );
}

export default searchDoctors;
