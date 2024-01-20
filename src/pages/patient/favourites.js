import React from 'react'
import { useSelector } from 'react-redux'

function Favourites() {

  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen);
  return (
    <div className={`${homeSidebarOpen ? "ml-2 md:ml-[273px]" : "ml-2"} container-fluid  mt-2 frame h-[100vh]`}>
      patient Favourites
    </div>
  )
}

export default Favourites