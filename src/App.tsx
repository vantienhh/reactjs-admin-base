import React from 'react'
import clsx from 'clsx'
import { IRouter } from 'src/types'
import { appRoutes } from 'src/routes/App'
import { DrawerBarNormal, DrawerBarCompact, TopBar } from 'src/components'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { CssBaseline, AppBar as MaterialAppBar, Drawer as MaterialDrawer } from '@material-ui/core'

const DRAWER_NORMAL_WIDTH = 240
const DRAWER_COMPACT_WIDTH = 50

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    topBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    topBarShort: {
      marginLeft: DRAWER_NORMAL_WIDTH,
      width: `calc(100% - ${DRAWER_NORMAL_WIDTH}px)`,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.easeIn,
        duration: 250
      })
    },
    topBarLong: {
      marginLeft: DRAWER_NORMAL_WIDTH,
      width: `calc(100% - ${DRAWER_COMPACT_WIDTH}px)`,
      transition: theme.transitions.create(['width'], {
        duration: 250
      })
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: 50
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
)

const styleDrawerNormal = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_NORMAL_WIDTH
    },
    pager: {
      width: DRAWER_NORMAL_WIDTH,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.easeIn,
        duration: 250
      })
    }
  })
)

const styleDrawerCompact = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_COMPACT_WIDTH
    },
    pager: {
      width: DRAWER_COMPACT_WIDTH,
      transition: theme.transitions.create(['width'], {
        duration: 250
      })
    }
  })
)

function ComponentAppPassAuth(): React.FunctionComponentElement<{}> {
  const classes = useStyles()
  const classesNormal = styleDrawerNormal()
  const classesCompact = styleDrawerCompact()

  const [isDrawerNormal, setOpen] = React.useState(false)
  const handleDrawer = (): void => setOpen(!isDrawerNormal)

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Top Bar */}
      <MaterialAppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.topBar, {
          [classes.topBarShort]: isDrawerNormal,
          [classes.topBarLong]: !isDrawerNormal
        })}
      >
        <TopBar handleDrawer={handleDrawer} isDrawerNormal={isDrawerNormal} />
      </MaterialAppBar>

      {/* Drawer Bar */}
      <MaterialDrawer
        variant="permanent"
        className={clsx({ [classesNormal.drawer]: isDrawerNormal, [classesCompact.drawer]: !isDrawerNormal })}
        classes={{ paper: isDrawerNormal ? classesNormal.pager : classesCompact.pager }}
      >
        {isDrawerNormal ? <DrawerBarNormal /> : <DrawerBarCompact />}
      </MaterialDrawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {appRoutes.map((router, index) => (
            <Route key={index} path={router.path} exact={router.exact} component={router.component} />
          ))}
          <Route render={() => <Redirect to="/errors/404" />} />
        </Switch>
      </main>
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
