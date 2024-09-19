import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../../components/sidebar/Sidebar"

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}

export default Dashboard