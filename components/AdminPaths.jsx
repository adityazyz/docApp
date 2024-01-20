import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
 
function AdminPaths() {

  const router = useRouter();
  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  const page = capitalizeFirstLetter(router.pathname.split("/")[2]
  )
  // const [currentPath, setCurrentPath] = useState(router.pathname)

  return (
    // 
      <div className={`h-[18vh] bg-[#F7F8F9] ${adminSidebarOpen === true ? "ml-[10px] md:ml-[262px]": " ml-[10px]"}    flex items-center`} >
      <div className="ml-6">
        <h1 className=" mb-2">{page}</h1>
        <h2 className="text-sm  text-black">
          {"Dashboard"} &nbsp;  {"/"} &nbsp; 
          <span className=" font-normal text-gray-500">{page}</span>
        </h2>
      </div>
    </div>
  );
}

export default AdminPaths;
