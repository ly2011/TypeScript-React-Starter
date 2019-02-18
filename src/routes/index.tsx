import React from 'react'
import { Route, Switch } from 'react-router'

import Layout from '../layouts/default'

import Topics from '../containers/Topics'
import Login from '../containers/Login'

export const childRoutes = [{ path: '/', component: Topics, exact: true }]

const routes: any = (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/" component={Layout} />
  </Switch>
)

export default routes
