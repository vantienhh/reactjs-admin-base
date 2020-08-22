import App from 'src/App'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFound from 'src/views/errors/NotFound'
import ServerError from 'src/views/errors/ServerError'
import Unauthorized from 'src/views/errors/Unauthorized'

function Routes() {
  return (
    <Switch>
      // Errors
      <Route exact path="/errors/401" component={ Unauthorized } />
      <Route exact path="/errors/404" component={ NotFound } />
      <Route exact path="/errors/500" component={ ServerError } />

      // App
      <Route exact path="/" render={ (props) => <Redirect to="/dashboard" push { ...props } /> } />
      <Route path="/" component={ App } />
    </Switch>
  )
}

export default Routes
