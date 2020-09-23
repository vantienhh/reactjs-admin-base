import React from 'react'
import { IconButton, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { TopBarProps } from 'src/types/TopBar'
import Badge from '@material-ui/core/Badge'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { TopBarUser } from './TopBarUser'

const TopBarRight = () => {
  return (
    <div>
      <IconButton component="span" color="inherit">
        <Badge badgeContent={4} color="error">
          <MailOutlineIcon />
        </Badge>
      </IconButton>
      <IconButton component="span" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>

      <TopBarUser />
    </div>
  )
}

export const TopBar = (props: TopBarProps) => {
  return (
    <div>
      <Toolbar style={{ minHeight: 50, display: 'flex', justifyContent: 'space-between', backgroundColor: '#2d2d2d' }}>
        <IconButton color="inherit" aria-label="open drawer" onClick={props.handleDrawer} edge="start">
          <MenuIcon />
        </IconButton>
        <TopBarRight />
      </Toolbar>
    </div>
  )
}
