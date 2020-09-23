import React from 'react'
import clsx from 'clsx'
import { IRouter } from 'src/types'
import { appRoutes } from 'src/routes/App'
import { TopBar } from 'src/components/topBar'
import { DrawerBarNormal, DrawerBarCompact } from 'src/components/drawerBar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { CssBaseline, AppBar as MaterialAppBar, Drawer as MaterialDrawer } from '@material-ui/core'

const drawerNormalWidth = 240
const drawerCompactWidth = 50

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    topBar: {
      zIndex: theme.zIndex.drawer + 1
      // transition: theme.transitions.create(['width', 'margin'], {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen
      // })
    },
    topBarShort: {
      marginLeft: drawerNormalWidth,
      width: `calc(100% - ${drawerNormalWidth}px)`
    },
    topBarLong: {
      marginLeft: drawerNormalWidth,
      width: `calc(100% - ${drawerCompactWidth}px)`
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      // ...theme.mixins.toolbar
      height: 50
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
)

const styleDrawerNormal = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerNormalWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    pager: {
      width: drawerNormalWidth
    }
  })
)

const styleDrawerCompact = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerCompactWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    pager: {
      overflowX: 'hidden',
      width: drawerCompactWidth
    }
  })
)

function MaterialDrawerBarNormal() {
  const classes = styleDrawerNormal()
  return (
    <MaterialDrawer
      variant="permanent"
      className={clsx(classes.drawer, classes.pager)}
      classes={{ paper: classes.pager }}
    >
      <DrawerBarNormal />
    </MaterialDrawer>
  )
}

function MaterialDrawerBarCompact() {
  const classes = styleDrawerCompact()

  return (
    <MaterialDrawer
      variant="permanent"
      className={clsx(classes.drawer, classes.pager)}
      classes={{ paper: classes.pager }}
    >
      <DrawerBarCompact />
    </MaterialDrawer>
  )
}

function ComponentAppPassAuth() {
  const classes = useStyles()
  const [isOpenDrawer, setOpen] = React.useState(false)
  const handleDrawer = (): void => setOpen(!isOpenDrawer)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MaterialAppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.topBar, {
          [classes.topBarShort]: isOpenDrawer,
          [classes.topBarLong]: !isOpenDrawer
        })}
      >
        <TopBar handleDrawer={handleDrawer} isOpenDrawer={isOpenDrawer} />
      </MaterialAppBar>

      {isOpenDrawer ? <MaterialDrawerBarNormal /> : <MaterialDrawerBarCompact />}

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

export function App() {
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
