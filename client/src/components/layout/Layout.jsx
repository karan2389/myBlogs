import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import "./layout.css"

const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>

    </div>
  )
}

export default Layout
