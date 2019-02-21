import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import Loading from '../components/Loading'
import Layout from '../layouts/default'

const Topics = Loadable({
  loader: () => import(/* webpackChunkName: "Topics" */ '../containers/Topics'),
  loading: Loading
})
const Topic = Loadable({
  loader: () => import(/* webpackChunkName: "Topics" */ '../containers/Topic'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import(/* webpackChunkName: "Login" */ '../containers/Login'),
  loading: Loading
})

export const childRoutes = [
  { path: '/', component: Topics, exact: true },
  { path: '/topic/:id', component: Topic, exact: true }
]

const routes: any = (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/" component={Layout} />
  </Switch>
)

export default routes
