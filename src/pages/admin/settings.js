import React from 'react'
import WebsiteSettings from '../../../components/WebsiteSettings'
import { useSelector } from 'react-redux'

function Settings() {
  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen)
  return (<>
  
    <WebsiteSettings/>
  </>
  )
}

export default Settings