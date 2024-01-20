import React, { useState, useRef } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

const DataTable = (props) => {
  const {searchField, data} = props;
  const websiteColorDark = useSelector((state)=> state.website.websiteColorDark);
  const activeButton = {
    color : websiteColorDark
  }
  const pageStyle = {
    backgroundColor : websiteColorDark,
    color : "white" 
  }

  // modify here , make array of fields
  const fields = Object.keys(data[0]); // assuming all obj have same keys


  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
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
  const firstEntryIndex = ((entriesPerPage * (currentPage -1)) > filteredData.length ) ? 0 :(entriesPerPage * (currentPage -1)) ;
  const lastEntryIndex = ((firstEntryIndex + entriesPerPage) > filteredData.length )? filteredData.length : firstEntryIndex + entriesPerPage;
  const currentEntries = filteredData.slice(firstEntryIndex, lastEntryIndex);

  return (
    <div className="w-full p-6 overflow-scroll bg-white">
      {/* // search-bar and no.of entries  */}
      <div className="w-full flex justify-between px-3 pb-3">
        {/* // select no of entries  */}
        <div className="w-[20%] flex items-center">
          Show
          <div className="border flex items-center relative h-9 ">

            {/* // when drop down open  */}
            {isOpen && (
              <div className="absolute top-0 bg-white border rounded shadow w-12">
                {/* Dropdown content */}
                <p className="my-[4px] px-2 hover:bg-gray-100" onClick={()=>{setEntriesPerPage(10)}}>10</p>
                <p className="my-[4px] px-2 hover:bg-gray-100" onClick={()=>{setEntriesPerPage(25)}}>25</p>
                <p className="my-[4px] px-2 hover:bg-gray-100" onClick={()=>{setEntriesPerPage(50)}}>50</p>
                <p className="my-[4px] px-2 hover:bg-gray-100" onClick={()=>{setEntriesPerPage(100)}}>100</p>
              </div>
            )}

            {/* // for display of entriesPerPage  */}
            {
             <div className=" rounded w-7 px-2 ">
                {entriesPerPage}
             </div>
            }

            <button
              onClick={toggleDropdown}
              onBlur={() => {
                setTimeout(() => {
                  toggleDropdown();
                }, 100);
              }}
            >
              <div className="ml-1"><FaSort className="h-3 w-3 mx-1" /></div>
            </button>
          </div>
          entries
        </div>
        {/* // search bar */}
        <div className=" flex h-10 w-[25%]  rounded-sm bg-gray-100">
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

      {/* /// ==== table begins here ==== */}
      <table className="min-w-full   bg-white">
        {/* // heading ---- */}
        <thead>
          <tr className="border-b">
            {/* // modify here, make sure all fields are used  */}
            {fields.map((field) => {
              return (
                <th
                  key={`${field}heading`}
                  className="p-3 text-left bg-gray-100 rounded-sm"
                >
                  <div className="flex items-cente text-[16px] text-gray-700">
                    {capitalizeFirstLetter(field)}
                    <button
                      className="ml-2 focus:outline-none"
                      onClick={() => handleSort(field)}
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
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* // the filtered body data------  */}
          {currentEntries.map((item, index) => (
            <tr
            key={`${Date.now()}item${Math.random()*10000}`}
              className={`hover:bg-gray-100 ${
                currentEntries.length - 1 === index ? null : "border-b"
              }`}
            >
              {/* // modify here , take value for each field  */}
              {fields.map((field) => {
                return (
                  <td key={`${field}item${Math.random()*10000}`} className="px-4 py-3 text-[17px] ">
                    {item[field]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* // if no match found----  */}
      {filteredData.length === 0 ? (
            <div className=" m-3">
              No match found
            </div>
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
              className={`${currentPage === 1 ? "text-gray-500 bg-gray-200 pointer-events-none" : "bg-white cursor-pointer" } px-2 h-10 py-1 bg-gray-200 rounded  border`}
              style={currentPage === 1 ? null : activeButton}
            >
              Previous
            </button>
            <div style={pageStyle} className=" h-10 w-10 flex justify-center items-center  rounded-sm">
              {currentPage}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={lastEntryIndex >= filteredData.length}
              className={`${lastEntryIndex >= filteredData.length ? "text-gray-500 bg-gray-200 pointer-events-none" : "bg-white cursor-pointer"} px-2 h-10 py-1 rounded  border `}
              style={lastEntryIndex >= filteredData.length ? null : activeButton}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
      {/* // pagination controls  */}
    </div>
  );
};

export default DataTable;
