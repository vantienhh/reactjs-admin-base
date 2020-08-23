import React from 'react'
import clsx from 'clsx'
import { Divider, List } from '@material-ui/core'
import { useLocation, NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HoverMenu from 'src/components/HoverMenu'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import { drawerStyles, drawerItems } from './config'
import { PropsComponentItem } from 'src/types/interface/DrawerBar'

const ComponentItem = (props: PropsComponentItem) => {
  const [mouseOverItem, setMouseOverItem] = React.useState(false)
  const [mouseOverMenu, setMouseOverMenu] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  let propsListItem: any = { button: true }
  if (props.href) propsListItem = { ...propsListItem, component: NavLink, to: props.href }

  const enterItem = (event: any): void => {
    setMouseOverItem(true)
    setAnchorEl(event.currentTarget)
  }
  const leaveItem = (): void => setMouseOverItem(false)
  const enterMenu = (): void => setMouseOverMenu(true)
  const leaveMenu = (): void => setMouseOverMenu(false)
  const closeMenu = (): void => {
    setMouseOverItem(false)
    setMouseOverMenu(false)
  }

  const isOpen = mouseOverMenu || mouseOverItem

  return (
    <div>
      <ListItem
        {...propsListItem}
        onMouseEnter={enterItem}
        onMouseLeave={leaveItem}
      >
        <ListItemIcon>{<props.icon fontSize={'small'} />}</ListItemIcon>
        <HoverMenu
          elevation={1}
          open={isOpen}
          anchorEl={anchorEl}
          onClose={closeMenu}
          MenuListProps={{
            onMouseEnter: enterMenu,
            onMouseLeave: leaveMenu,
            disablePadding: true
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
            {props.text}
          </MenuItem>
          <Divider />
          {
            props.children?.map((subItem, index) => (
              <MenuItem
                key={index}
                button
                component={NavLink}
                to={subItem.href}
                onClick={closeMenu}
              >
                <ListItemIcon style={{ minWidth: 30 }}>
                  <subItem.icon fontSize={'small'} />
                </ListItemIcon>
                <ListItemText>{subItem.text}</ListItemText>
              </MenuItem>)
            )
          }
        </HoverMenu>
      </ListItem>
    </div>
  )
}

const SidebarMenu = () => {
  const classes = drawerStyles()
  const currentPath = useLocation().pathname

  return (
    <List disablePadding>
      {drawerItems.map((item, index) => {
        return (
          <div
            key={item.text}
            className={clsx({ [classes.backgroundCurrentMenu]: currentPath === item.href })}
          >
            <ComponentItem {...item} key={index} />
          </div>
        )
      })}
    </List>
  )
}

function DrawerBarCompact() {
  const classes = drawerStyles()

  return (
    <div>
      <div className={classes.toolbar}>
        <h3>App</h3>
      </div>
      <Divider />
      <SidebarMenu />
    </div>
  )
}

export default DrawerBarCompact
