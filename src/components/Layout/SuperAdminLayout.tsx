import React from 'react'
import { Outlet } from 'react-router-dom'

export default function SuperAdminLayout() {
  return (
    <>
        <div> Layout Header </div>
        <Outlet/>
    </>
  )
}
