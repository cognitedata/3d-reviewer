import React from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Login from '../containers/Login'

export const history = createBrowserHistory()

function Routes() {
  return (
    <Router history={history}>
      <Route path="/:tenant" component={Login} />
    </Router>
  )
}

export default Routes
