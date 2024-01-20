import React from 'react'
import { useSelector } from 'react-redux'

function Transactions() {
  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen)
  return (
    <div className={`${adminSidebarOpen === true ? "ml-[10px] md:ml-[262px]" : "ml-[10px]" }`}
    >Transactions</div>
  )
}

export default Transactions