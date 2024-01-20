import React from 'react'
import { useSelector } from 'react-redux'

function Reviews() {
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen)
  return (
    <div className={` ${homeSidebarOpen ? "ml-2 md:ml-[300px]" : "ml-2"} h-[122vh] w-auto frame`}>Reviews</div>
  )
}

export default Reviews