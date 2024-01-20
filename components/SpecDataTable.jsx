import React, { useState, useRef } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import { BsSearch, BsPencilFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Image from "next/image";
import SpecAddModal from "./SpecAddModal";
import SpecEditModal from "./SpecEditModal";
import SpecDeleteModal from "./SpecDeleteModal";

const DataTable = (props) => {
  const { searchField, data } = props;
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
  const fields = ["Sno.", "Specialities", "Actions"]; // assuming all obj have same keys

  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // You can adjust this as needed

  const [isOpen, setIsOpen] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeAddModal = ()=>{
    setShowAddModal(false);
  }
  const closeEditModal = ()=>{
    setShowEditModal(false);
  }
  const closeDeleteModal = ()=>{
    setShowDeleteModal(false);
  }

  const [currentModalName, setCurrentModalName] = useState();
  const [currentImage, setCurrentImage] = useState();
  const [currentId, setCurrentId] = useState();

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page when searching
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
  const filteredData = sortedData.filter((item) =>
    item[searchField].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

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

  return (
    <div className="w-full p-6 overflow-scroll bg-white">
      {/* // search-bar and no.of entries  */}
      <div className="w-full flex justify-between px-3 pb-3">
        {/* // select no of entries  */}
        <div className="flex w-auto">

          
        <div className="flex flex-col sm:flex-row">
          {/* // show entries ----- */}
        <div className="w-[50%] flex items-center mb-2">
          <span className="mx-1">Show</span>
          <div className="border flex items-center relative h-9 ">
            {/* // when drop down open  */}
            {isOpen && (
              <div className="absolute top-0 bg-white border rounded shadow w-12 mx-1">
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
          <span className="mx-1">entries</span>
        </div>
        {/* // search bar ---- */}
        <div className=" flex h-10 w-[170px] sm:w-[220px] mx-0 sm:mx-2 rounded-sm bg-gray-100">
          <div className="w-[10%] pl-2 flex justify-center  items-center">
            <BsSearch />
          </div>
          <input
            type="text"
            placeholder="Search"
            className=" p-2 outline-none bg-gray-100  w-[90%] "
            onChange={handleSearch}
          />
        </div>
        </div>

        </div>
        <button style={pageStyle} className="px-3 h-9 py-1 rounded-sm"
         onClick={()=>{
            setShowAddModal(true)
         }}
        >
            Add
        </button>
      </div>

      {/* /// ==== table begins here ==== */}
      <table className=" min-w-full bg-white">
      {/* min-w-min  */}
        {/* // heading ---- */}
        <thead>
          <tr className="border-b ">
            {/* // modify here, make sure all fields are used  */}
            {fields.map((field, index) => {
              return (
                <th
                  key={`${field}heading`}
                  className={`p-3  bg-gray-100 rounded-sm`}
                >
                  <div
                    className={`flex items-center text-[16px] ${
                      index === 2 ? "float-right pr-5" : null
                    } text-gray-700`}
                  >
                    {capitalizeFirstLetter(field)}

                    {/* show sort button only for Specialities fields  */}
                    {field === "Specialities" && (
                      <button
                        className="ml-2 focus:outline-none "
                        onClick={() => handleSort("name")}
                      >
                        {/* // modify here, for when sortKey != field  */}
                        {sortKey === "name" ? (
                          sortOrder === "asc" ? (
                            <FaSortUp className="text-gray-500" />
                          ) : (
                            <FaSortDown className="text-gray-500" />
                          )
                        ) : (
                          <FaSort className="text-gray-300" />
                        )}
                      </button>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* // the filtered body data------  */}
          {currentEntries.map((item, index) => (
            <tr
              key={`${Date.now()}item${Math.random() * 10000}`}
              className={`hover:bg-gray-100 ${
                currentEntries.length - 1 === index ? null : "border-b"
              }`}
            >
              <td className="px-4 py-3 text-[17px] ">{index + 1}</td>

              <td className="px-4 py-3 text-[17px] flex items-center">
                <div>
                    <Image src={item["image"]} height={30} width={30} alt="specialities-image"
                    className="h-11 w-11"
                    ></Image></div>
                <div className="ml-2">{item["name"]}</div>
              </td>

              <td className="px-4 py-3 text-[17px] text-right ">
                <div className=" inline-block w-40 text-right">
                  <button 
                    className="btn btn-sm bg-success-light mx-1"
                    onClick={()=>{
                        setCurrentModalName(item["name"]);
                        setCurrentImage(item["image"])
                        setCurrentId(item._id)
                        setTimeout(() => {
                            setShowEditModal(true);
                        }, 200);
                    }}
                  >
                    <BsPencilFill className="h-3 w-3 inline mb-1"/> Edit
                  </button>
                  <button
                    className="btn btn-sm bg-danger-light mx-1"
                    onClick={()=>{
                        setCurrentModalName(item["name"]);
                        setCurrentImage(item["image"]);
                        setTimeout(() => {
                            setShowDeleteModal(true)
                        }, 200);
                    }}
                  >
                    <RiDeleteBin6Line className="h-3 w-3 inline mb-1 "/> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* // if no match found----  */}
      {filteredData.length === 0 ? (
        <div className=" m-3">Nothing to show.</div>
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

      {/* // spec add modal  */}
      {showAddModal && <SpecAddModal close = {closeAddModal} toggle = {props.toggle}/> }
      {showEditModal && <SpecEditModal id = {currentId}  name={currentModalName} url = {currentImage} close = {closeEditModal} toggle = {props.toggle}/>}
      {showDeleteModal && <SpecDeleteModal name={currentModalName} url = {currentImage} close={closeDeleteModal} toggle = {props.toggle}/>}
      
    </div>
  );
};

export default DataTable;
