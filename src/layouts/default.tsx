import React from 'react'
import { Route } from 'react-router-dom'

import { childRoutes } from '@/routes'

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import BackTop from '@/components/BackTop'

class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <NavBar />
        {childRoutes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        ))}
        <Footer />
        <BackTop />
      </div>
    )
  }
}

export default Layout
