import React, { useState, useEffect } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPencilFill } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";

const PtDatatable = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editEmail, setEditEmail] = useState();
  const [deleteEmail, setDeleteEmail] = useState();
const router = useRouter();
  const { data } = props;
  const websiteColorDark = useSelector(
    (state) => state.website.websiteColorDark
  );
  const activeButton = {
    color: websiteColorDark,
  };
  const pageStyle = {
    backgroundColor: websiteColorDark,
    color: "white",
  };

  // modify here , make array of fields
  const eg = data[0] != null ? Object.keys(data[0]) : null; // assuming all obj have same keys
  const fields = eg.slice(1);

  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // You can adjust this as needed

  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const convertDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    let inFormat = dateObj.toLocaleDateString("en", options);
    let arr = inFormat.split(",");
    let date = `${arr[0]}${arr[1]}`;
    // also removed space from index 0 from time
    let timeSplit = arr[2].split(" ");
    let time = `${timeSplit[1]} ${timeSplit[2]}`;

    return `${date}, ${time}`;
  };

  const sortedData = data.slice().sort((a, b) => {
    if (sortKey) {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === "string" && typeof valueB === "string") {
        const comparison = valueA.localeCompare(valueB);
        return sortOrder === "asc" ? comparison : -comparison;
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    }
    return 0;
  });

  // which field to search , is specified here !!!
  const filteredData = sortedData;

  //   const capitalizeFirstLetter = (word) => {
  //     return word.charAt(0).toUpperCase() + word.slice(1);
  //   };

  // dropdown toogle
  const toggleDropdown = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };
  

  // Pagination logic
  const firstEntryIndex =
    entriesPerPage * (currentPage - 1) > filteredData.length
      ? 0
      : entriesPerPage * (currentPage - 1);
  const lastEntryIndex =
    firstEntryIndex + entriesPerPage > filteredData.length
      ? filteredData.length
      : firstEntryIndex + entriesPerPage;
  const currentEntries = filteredData.slice(firstEntryIndex, lastEntryIndex);


  const deletePtProfile = ()=>{
    
    axios.delete(`/api/deletePt?email=${deleteEmail}`)
    .then((response)=>{
      if(response.data.success === true){
        props.refetchData();
        setDeleteEmail(null);
        setShowDeleteModal(false);
      }
    })
    .catch((error)=>{
      console.log(error.message);
      setDeleteEmail(null);
      setShowDeleteModal(false);
    })
  }

  useEffect(() => {
    editEmail &&
      router.push(
        { pathname: "/admin/edit/patient-profile", query: { email: editEmail } },
        "/admin/edit/patient-profile"
      );
  }, [editEmail]);

  useEffect(() => {
    deleteEmail && setShowDeleteModal(true);
  }, [deleteEmail]);

  return (
    <div className="w-full p-6 overflow-scroll bg-white">
      {/* // search-bar and no.of entries  */}
      <div className="w-full flex justify-between px-3 pb-3">
        {/* // select no of entries  */}
        <div className="w-[20%] flex items-center">
          <span className="mr-1">Show</span>
          <div className="border flex items-center relative h-9 ">
            {/* // when drop down open  */}
            {isOpen && (
              <div className="absolute top-0 bg-white border rounded shadow w-12">
                {/* Dropdown content */}
                <p
                  className="my-[4px] px-2 hover:bg-gray-100"
                  onClick={() => {
                    setEntriesPerPage(10);
                  }}
                >
                  10
                </p>
                <p
                  className="my-[4px] px-2 hover:bg-gray-100"
                  onClick={() => {
                    setEntriesPerPage(25);
                  }}
                >
                  25
                </p>
                <p
                  className="my-[4px] px-2 hover:bg-gray-100"
                  onClick={() => {
                    setEntriesPerPage(50);
                  }}
                >
                  50
                </p>
                <p
                  className="my-[4px] px-2 hover:bg-gray-100"
                  onClick={() => {
                    setEntriesPerPage(100);
                  }}
                >
                  100
                </p>
              </div>
            )}

            {/* // for display of entriesPerPage  */}
            {<div className=" rounded w-7 px-2 ">{entriesPerPage}</div>}

            <button
              onClick={toggleDropdown}
              onBlur={() => {
                setTimeout(() => {
                  toggleDropdown();
                }, 100);
              }}
            >
              <div className="ml-1">
                <FaSort className="h-3 w-3 mx-1" />
              </div>
            </button>
          </div>
          <span className="ml-1">entries</span>
        </div>
        <button
          style={pageStyle}
          className="px-3 h-9 py-1 rounded-sm"
          onClick={() => {
            router.push("/admin/add/patient-profile");
          }}
        >
          Add
        </button>
      </div>

      {/* // table ------  */}
      <div className="overflow-scroll">
        {/* /// ==== table begins here ==== */}
        <table className="w-full   bg-white">
          {/* // heading ---- */}
          <thead>
            <tr className="border-b bg-gray-100">
              {/* // modify here, make sure all fields are used  */}
              {fields != null &&
                fields.map((field) => {
                  return (
                    <th
                      key={`${field}heading`}
                      className={`p-3 ${
                        field === "AccountStatus" ? "float-right" : "text-left"
                      } bg-gray-100 rounded-sm`}
                    >
                      {/* // apply conditions here for sortingg  */}
                      {field === "ProfilePicture" ||
                      field === "Email" ? null : (
                        <div className="flex items-cente text-[16px] text-gray-700">
                          {/* // field name  */}
                          {field === "BloodGroup"
                            ? "Blood Group"
                            : field === "LastVisit"
                            ? "Last Visit"
                            : field}

                          {/* {(field === "Name")? <div><img className="h-3 w-3" src='/dummy.jpeg' alt="" />`${field[0]} ${field[1]}`</div>:null}  */}
                          <button
                            className="ml-2 focus:outline-none"
                            // sort based on
                            onClick={() => {
                              handleSort(field);
                            }}
                          >
                            {/* // modify here, for when sortKey != field  */}
                            {sortKey === field ? (
                              sortOrder === "asc" ? (
                                <FaSortUp className="text-gray-500" />
                              ) : (
                                <FaSortDown className="text-gray-500" />
                              )
                            ) : (
                              <FaSort className="text-gray-300" />
                            )}
                          </button>
                        </div>
                      )}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {/* // the filtered body data------  */}
            {currentEntries.map((item, index) => (
              <tr
                // hover:bg-gray-100
                key={`${Date.now()}item${Math.random() * 10000}`}
                className={` ${
                  currentEntries.length - 1 === index ? null : "border-b"
                } `}
              >
                {/* // modify here , take value for each field  */}
                {fields.map((field) => {
                  return (
                    <>
                      {field === "ProfilePicture" ||
                      field === "Email" ? null : (
                        <td
                          key={`${field}item${Math.random() * 10000}`}
                          className={`px-3  py-2 ${
                            field === "LastVisit"
                              ? "text-[13px]"
                              : "text-[15px]"
                          }  ${field === "Paid" ? "float-right" : "text-left"} 
                          
                          `}
                        >
                          {field === "Name" ? (
                            <div className="flex items-center justify-center">
                              <img
                                className="h-8 w-8 rounded-full mr-3"
                                src={
                                  item["ProfilePicture"].length > 0
                                    ? item["ProfilePicture"]
                                    : "/dummy.jpeg"
                                }
                                alt="patient-pfp"
                              />
                              <div
                                style={{ display: "inline", width: "128px" }}
                                className=" hover:underline overflow-hidden"
                                
                              >
                                {item[field]}
                              </div>
                            </div>
                          ) : field === "LastVisit" ? (
                            <div className="w-36">
                              {convertDateTime(item[field])}
                            </div>
                          ) : (
                            <div
                              className={`${field === "Age" ? " w-20" : ""}`}
                            >
                              {item[field]}
                            </div>
                          )}

                          {/* {item[field]} */}
                        </td>
                      )}
                    </>
                  );
                  
                })}
                <td>
                  <div className="flex mx-2">
                    <button
                      className="btn btn-sm bg-success-light mx-1 flex items-center justify-center "
                      onClick={() => {
                        // send to edit page
                        setEditEmail(item["Email"]);
                      }}
                    >
                      <BsPencilFill className="h-3 w-3 inline mr-1" />
                      Edit
                    </button>
                    <button
                      className="btn btn-sm bg-danger-light mx-1 flex items-center justify-center "
                      onClick={() => {
                        setDeleteEmail(item["Email"]);
                      }}
                    >
                      <RiDeleteBin6Line className="h-3 w-3 inline mr-1 " />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* // if no match found----  */}
      {filteredData.length === 0 ? (
        <div className=" m-3">No match found</div>
      ) : null}

      {/* Pagination controls */}
      {filteredData.length > 0 ? (
        <div className="mt-4 flex justify-between ">
          {/* // current entries  track*/}
          <div className="text-[16px]">
            Showing {firstEntryIndex + 1} to {lastEntryIndex} of{" "}
            {filteredData.length} entries.
          </div>

          {/* {// buttons} */}
          <div className="flex">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "text-gray-500 bg-gray-200 pointer-events-none"
                  : "bg-white cursor-pointer"
              } px-2 h-10 py-1 bg-gray-200 rounded  border`}
              style={currentPage === 1 ? null : activeButton}
            >
              Previous
            </button>
            <div
              style={pageStyle}
              className=" h-10 w-10 flex justify-center items-center  rounded-sm"
            >
              {currentPage}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={lastEntryIndex >= filteredData.length}
              className={`${
                lastEntryIndex >= filteredData.length
                  ? "text-gray-500 bg-gray-200 pointer-events-none"
                  : "bg-white cursor-pointer"
              } px-2 h-10 py-1 rounded  border `}
              style={
                lastEntryIndex >= filteredData.length ? null : activeButton
              }
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
      {/* // pagination controls  */}

      {/* {delete modalll} */}
      {showDeleteModal === true && (
        <div
          className="fixed top-0 left-0 bg-black h-[100vh] w-[100vw] bg-opacity-40 z-50"
          id="delete_modal"
          aria-hidden="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-content p-2">
                  <h4 className="modal-title mb-2">Delete</h4>
                  <p className="mb-4">Are you sure want to delete account?</p>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn bg-gray-500 hover:bg-gray-600 text-white  "
                      onClick={() => {
                        setShowDeleteModal(false);
                        setDeleteEmail(null);
                      }}
                    >
                      Cancel{" "}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ml-8"
                      onClick={() => {
                        deletePtProfile();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {delete modalll} */}
    </div>
  );
};

export default PtDatatable;
