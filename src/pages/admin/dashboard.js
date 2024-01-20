import React from 'react'
import AdminDashboard from '../../../components/AdminDashboard'
import { useSelector } from 'react-redux'

function adminDashboard() {
  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen)
  
  return (
    <div className={`${adminSidebarOpen === true ? "ml-[10px] md:ml-[262px]" : "ml-[10px]" }`}>
        <AdminDashboard/>
    </div>
  )
}

export default adminDashboard