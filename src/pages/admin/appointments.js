import React from 'react'
import { useSelector } from 'react-redux'

function Appointments() {
  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen)
  return (
    <div className={`${adminSidebarOpen === true ? "ml-[10px] md:ml-[262px]" : "ml-[10px]" }`}>Appointments</div>
  )
}

export default Appointments