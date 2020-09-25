import React from 'react'
import clsx from 'clsx'
import { IRouter } from 'src/types'
import { appRoutes } from 'src/routes/App'
import { DrawerBarNormal, DrawerBarCompact, TopBar } from 'src/components'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { CssBaseline, Drawer } from '@material-ui/core'

const DRAWER_NORMAL_WIDTH = 240
const DRAWER_COMPACT_WIDTH = 50

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    displayFlex: {
      display: 'flex'
    },
    drawerNormal: {
      width: DRAWER_NORMAL_WIDTH,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.easeIn,
        duration: 250
      })
    },
    pagerNormal: {
      width: DRAWER_NORMAL_WIDTH,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.easeIn,
        duration: 250
      })
    },
    drawerCompact: {
      width: DRAWER_COMPACT_WIDTH,
      transition: theme.transitions.create(['width'], {
        duration: 200
      })
    },
    pagerCompact: {
      width: DRAWER_COMPACT_WIDTH,
      transition: theme.transitions.create(['width'], {
        duration: 200
      })
    },
    containerLong: {
      height: '100vh',
      width: `calc(100% - ${DRAWER_COMPACT_WIDTH}px)`,
      transition: theme.transitions.create(['width'], {
        duration: 200
      })
    },
    containerShort: {
      height: '100vh',
      width: `calc(100% - ${DRAWER_NORMAL_WIDTH}px)`,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.easeIn,
        duration: 250
      })
    },
    content: {
      padding: '15px',
      overflowX: 'auto',
      height: 'calc(100% - 52px)'
    }
  })
)

function ComponentAppPassAuth(): React.FunctionComponentElement<{}> {
  const classes = useStyles()

  const [isDrawerNormal, setOpen] = React.useState(false)
  const handleDrawer = (): void => setOpen(!isDrawerNormal)

  return (
    <div className={classes.displayFlex}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx({ [classes.drawerNormal]: isDrawerNormal, [classes.drawerCompact]: !isDrawerNormal })}
        classes={{ paper: isDrawerNormal ? classes.pagerNormal : classes.pagerCompact }}
      >
        {isDrawerNormal ? <DrawerBarNormal /> : <DrawerBarCompact />}
      </Drawer>

      <div className={clsx({ [classes.containerShort]: isDrawerNormal, [classes.containerLong]: !isDrawerNormal })}>
        <TopBar handleDrawer={handleDrawer} isDrawerNormal={isDrawerNormal} />

        <div className={classes.content}>
          <Switch>
            {appRoutes.map((router, index) => (
              <Route key={index} path={router.path} exact={router.exact} component={router.component} />
            ))}
            <Route render={() => <Redirect to="/errors/404" />} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

function checkAuthenticate(route: IRouter): boolean {
  console.log('route', route)
  // check Authenticate
  return true
}

export function App(): React.FunctionComponentElement<{}> {
  const currentPath = useLocation().pathname
  const router = appRoutes.filter((router) => router.path === currentPath)

  if (router.length) {
    if (checkAuthenticate(router[0])) {
      return <ComponentAppPassAuth />
    }
    return <Redirect to="/errors/401" />
  }
  return <Redirect to="/errors/404" />
}
