import React from 'react'
import { App } from 'src/App'
import { Switch, Route, Redirect } from 'react-router-dom'
import { NotFound, ServerError, Unauthorized } from 'src/views/errors'

function Routes() {
  return (
    <Switch>
      {/* Errors */}
      <Route exact path="/errors/401" component={Unauthorized} />
      <Route exact path="/errors/404" component={NotFound} />
      <Route exact path="/errors/500" component={ServerError} />

      {/* App */}
      <Route exact path="/" render={(props) => <Redirect to="/dashboard" push {...props} />} />
      <Route path="/" component={App} />
    </Switch>
  )
}

export default Routes
