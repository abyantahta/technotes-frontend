import {Outlet} from 'react-router-dom'

import React from 'react'

const Layout = () => {
  return (
  <div className="bg-primaryLight w-full h-lvh px-48 py-24">
      <Outlet/>
  </div>
)
}

export default Layout