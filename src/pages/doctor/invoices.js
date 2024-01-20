import React from 'react'
import { useSelector } from 'react-redux'

function Invoices() {
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen)
  
  return (
    <div className={` ${homeSidebarOpen ? "ml-2 md:ml-[300px]" : "ml-2"} h-[122vh] w-auto frame`}>Invoices</div>
  )
}

export default Invoices