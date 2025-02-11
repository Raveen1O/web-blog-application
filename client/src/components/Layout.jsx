import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from "./Header.jsx"

const Layout = () => {
  return (
    <div>
        <Header></Header>
        <main className="container mt-5 d-flex justify-content-center">
            <Outlet></Outlet>
        </main>
    </div>
  )
}

export default Layout
