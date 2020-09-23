import React from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { NavLink } from 'react-router-dom'
import { Divider, createStyles } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

export const menuItemStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      width: 150
    }
  })
)

export const TopBarUser = () => {
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
