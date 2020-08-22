import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ErrorsRouter from 'src/routes/Errors'
import App from 'src/App'

function Routes() {
  let errorRoutes: Array<any> = []
  ErrorsRouter.forEach((router, index) => {
    errorRoutes.push(
      <Route
        key={ index }
        path={ router.path }
        exact={ router.exact }
        component={ router.component }
      />
    )
  })

  return (
    <Switch>
      { errorRoutes }
      <Switch>
        <Route path="/" component={(props: any) => <App {...props} />} />
      </Switch>
    </Switch>
  )
}

export default Routes
