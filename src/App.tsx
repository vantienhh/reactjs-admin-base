import React from 'react'
import MaterialAppBar from '@material-ui/core/AppBar'
import MaterialDrawer from '@material-ui/core/Drawer'
import DrawerBar from 'src/components/DrawerBar'
import TopBar from 'src/components/TopBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Route, Switch, Redirect } from 'react-router-dom'
import clsx from 'clsx'
import { appRoutes } from 'src/routes/App'

const drawerWidth = 240

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${ drawerWidth }px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
)

function App() {
  const classes = useStyles()
  const [isOpenDrawer, setOpen] = React.useState(false)
  const handleDrawerOpen = (): void => setOpen(true)
  const handleDrawerClose = (): void => setOpen(false)

  return (
    <div className={ classes.root }>
      <CssBaseline />
      <MaterialAppBar
        elevation={ 0 }
        position="fixed"
        className={ clsx(classes.appBar, { [classes.appBarShift]: isOpenDrawer }) }
      >
        <TopBar handleDrawerOpen={ handleDrawerOpen } isOpenDrawer={ isOpenDrawer } />
      </MaterialAppBar>

      <MaterialDrawer
        variant="permanent"
        className={ clsx(classes.drawer, {
          [classes.drawerOpen]: isOpenDrawer,
          [classes.drawerClose]: !isOpenDrawer
        }) }
        classes={ {
          paper: clsx({
            [classes.drawerOpen]: isOpenDrawer,
            [classes.drawerClose]: !isOpenDrawer
          })
        } }
      >
        <DrawerBar handleDrawerClose={ handleDrawerClose } />
      </MaterialDrawer>

      <main className={ classes.content }>
        <div className={ classes.toolbar } />
        <Switch>
          {
            appRoutes.map((router, index) =>
              <Route
                key={ index }
                path={ router.path }
                exact={ router.exact }
                component={ router.component }
              />
            )
          }
          <Route render={ () => <Redirect to="/errors/404" /> } />
        </Switch>
      </main>
    </div>
  )
}

export default App
