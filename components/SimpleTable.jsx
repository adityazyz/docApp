import React from "react";
import Image from "next/image";
import ApStSwitch from "./DocSwitch";

function SimpleTable(props) {
  let { title, fields, data, extraSpacing } = props;
  
  return (
    <div>
      <div className="flex flex-col">
        <div className="">
          <div className="inline-block min-w-full py-2 ">
            <div
              className={`w-full bg-white border-t-2 rounded-t-lg py-3 px-3 text-left text-lg border-1 border-gray-200 relative`}
            >
              {" "}
              <span className="sticky left-5">{title}</span>
            </div>

            <table className={`table-auto w-full `}>
              {/* // table header  */}
              <thead className="border-b border-zinc-300 bg-gray-100 text-left font-medium">
                <tr>
                  {fields.map((item) => {
                    return (
                      <th scope="col" className=" px-6 py-4">
                        <span className="text-sm font-semibold text-gray-700">
                          {item}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* // table body  */}
              <tbody className="bg-white">
                {data.map((item) => {
                  return (
                    <tr className="border-b hover:bg-gray-50 border-zinc-300 text-left">
                      {
                        // 3 special case for status and reviews and for name {print image and name}

                        Object.keys(item).map((i) => {
                          return (
                            <>
                              {/* // for reviews  [i !== "Reviews"] */}
                              {i === "Reviews" ? (
                                <td
                                  className={`  px-4 ${
                                    extraSpacing ? "py-4" : "py-3"
                                  }`}
                                >
                                  <span className="flex items-center">
                                    <svg
                                      fill={
                                        item[i] >= 1 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      stroke={
                                        item[i] >= 1 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      className="w-3 h-3"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                      fill={
                                        item[i] >= 2 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      stroke={
                                        item[i] >= 2 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      className="w-3 h-3"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                      fill={
                                        item[i] >= 3 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      stroke={
                                        item[i] >= 3 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      className="w-3 h-3 "
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                      fill={
                                        item[i] >= 4 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      stroke={
                                        item[i] >= 4 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      className="w-3 h-3 "
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                      fill={
                                        item[i] == 5 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      stroke={
                                        item[i] == 5 ? "#FFCB00" : "#B9B4C7"
                                      }
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      className="w-3 h-3 "
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                  </span>
                                </td>
                              ) : null}

                              {/* // for switch  [i !== "AppointmentStatus"] */}
                              {i === "AppointmentStatus" ? (
                                <td
                                  className={`  px-x ${
                                    extraSpacing ? "py-4" : "py-3"
                                  }`}
                                >
                                  {/* item[i] */}
                                  <ApStSwitch />
                                </td>
                              ) : null}

                              {/* // for name [image1 and name ] */}
                              {i.includes("name") ? (
                                <td
                                  className={` px-4 ${
                                    extraSpacing ? "py-4" : "py-3"
                                  }`}
                                >
                                  <span className="flex items-center">
                                    <Image
                                      className="h-10 w-10 rounded-full"
                                      height={100}
                                      width={100}
                                      src={item["image1"]}
                                      alt="profile-image"
                                    />
                                    <div
                                      className="text-sm ml-2 w-32"
                                      style={{ fontWeight: 400 }}
                                    >
                                      {item[i]}
                                    </div>
                                  </span>{" "}
                                </td>
                              ) : null}

                              {i.includes("lastVisit") ? (
                                <td
                                  className={`  px-4 ${
                                    extraSpacing ? "py-4" : "py-3"
                                  }`}
                                >
                                  {" "}
                                  <div
                                    className="text-sm w-24"
                                    style={{ fontWeight: 400 }}
                                  >
                                    {item[i]}
                                  </div>
                                </td>
                              ) : null}

                              {i.includes("time") ? (
                                <td
                                  className={`  px-4 ${
                                    extraSpacing ? "py-4" : "py-3"
                                  }`}
                                >
                                  {" "}
                                  <div
                                    className="text-sm w-32"
                                    style={{ fontWeight: 400 }}
                                  >
                                    {item[i]}
                                  </div>
                                </td>
                              ) : null}

                              {/* // else ----  */}
                              {/* // don't print name and image url */}
                              {i !== "Reviews" &&
                              i !== "AppointmentStatus" &&
                              !i.includes("name") &&
                              !i.includes("time") &&
                              !i.includes("image") &&
                              !i.includes("lastVisit") ? (
                                <td
                                  className={`  px-4 ${
                                    extraSpacing ? "py-4" : "py-3"
                                  }`}
                                >
                                  {" "}
                                  <div
                                    className="text-sm "
                                    style={{ fontWeight: 400 }}
                                  >
                                    {item[i]}
                                  </div>
                                </td>
                              ) : null}
                            </>
                          );
                        })
                      }
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleTable;
