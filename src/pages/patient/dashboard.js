import React from 'react'
import { useSelector } from 'react-redux'


function Dashboard() {
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen);
  return (
    <div className={`${homeSidebarOpen ? "ml-2 md:ml-[300px]" : "ml-2"} container-fluid mt-2 frame h-[100vh] `}>
      patient Dashboard
    </div>
  )
}
 
export default Dashboard