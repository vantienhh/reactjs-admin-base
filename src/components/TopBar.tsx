import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { IconButton, Typography, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, createStyles } from '@material-ui/core/styles'

interface AppBarProps extends PropsWithChildren<{}> {
  handleDrawerOpen: () => void
  isOpenDrawer: boolean
}

const useStyles: any = makeStyles(() =>
  createStyles({
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    }
  })
)

const TopBar: React.FunctionComponent<AppBarProps> = (props: AppBarProps) => {
  const classes = useStyles()
  return (
    <div>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={ props.handleDrawerOpen }
          edge="start"
          className={ clsx(classes.menuButton, {
            [classes.hide]: props.isOpenDrawer
          }) }
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
        >
          Admin App
        </Typography>
      </Toolbar>
    </div>
  )
}

export default TopBar
