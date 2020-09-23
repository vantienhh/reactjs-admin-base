import React from 'react'
import { NavLink } from 'react-router-dom'
import { TopBarProps } from 'src/types/TopBar'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Button, Avatar, MenuItem, Badge, Menu, IconButton, Toolbar, createStyles, Divider } from '@material-ui/core'

export const menuItemStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      width: 150
    }
  })
)

const TopBarUser = () => {
  const classes = menuItemStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const closeMenu = () => {
    setOpen(false)
    setAnchorEl(null)
  }
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  return (
    <span>
      <Button disableElevation color="inherit" onClick={handleClick}>
        <Avatar src="https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753" />
        Lê Văn Tiến
      </Button>
      <Menu
        elevation={1}
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem component={NavLink} to={'/example'} onClick={closeMenu} className={classes.menuItem}>
          Profile
        </MenuItem>
        <MenuItem component={NavLink} to={'/test'} onClick={closeMenu} className={classes.menuItem}>
          Setting
        </MenuItem>
        <Divider />
        <MenuItem component={NavLink} to={'/test'} onClick={closeMenu} className={classes.menuItem}>
          Log Out
        </MenuItem>
      </Menu>
    </span>
  )
}

const TopBarRight = () => {
  return (
    <div>
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
