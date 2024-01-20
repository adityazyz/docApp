import DocSidebar from "../components/DocSidebar";
import PtSidebar from "../components/PtSidebar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useRouter } from "next/router";


const Struct = ({PageContent}) => {

    const router = useRouter();

  const [isSticky, setIsSticky] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const handleScroll = () => {
    const sidebar = document.getElementById("sidebar");
    const home = document.getElementById("home");

    if (sidebar && home) {
      const sidebarRect = sidebar.getBoundingClientRect();
      const homeRect = home.getBoundingClientRect();

      if (window.scrollY >= homeRect.top - 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      if (
        homeRect.bottom >= sidebarRect.bottom &&
        homeRect.bottom <= sidebarRect.bottom + 20
      ) {
        setShowFooter(true); // Show footer when height matches
      } else {
        setShowFooter(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getHeight =()=>{
    if(router.pathname.includes("/doctor/ProfileSettings")){
        return "530vh"
    }
  }
  const HEIGHT = getHeight();

  return (
    <div className="flex flex-col h-[200vh]">
      <div className="flex gap-10">
        <div
          id="sidebar"
          className={`w-[350px] p-4 ${isSticky ? "sticky top-[-15px]" : ""}`}
          style={{
            height: "130vh",
            backgroundColor: "#000", // Add your desired color here
          }}
        >
          {/* // sidebar content  */}
          <PtSidebar />
        </div>

        <div
          id="home"
          className={`w-[1200px] mr-5 mt-4 bg-yellow-300`}
          style={{
            height: HEIGHT,

          }}
        >
          {/* Home component content */}
          {PageContent}
        </div>
      </div>

      <div
        className={`transition-opacity duration-500 ${
          showFooter ? "opacity-100" : "opacity-0"
        }`}
      >
        
          <Footer/>
        
      </div>
    </div>
  );
};

export default Struct;
