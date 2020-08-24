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
import { PropsComponentItem, PropsListItemChildren } from 'src/types/interface/DrawerBar'

const ListItemChildren = (props: PropsListItemChildren) => {
  return (
    <ListItem
      button
      component={NavLink}
      to={props.href}
      onClick={props.closeMenu}
    >
      <ListItemIcon style={{ minWidth: 30 }}>
        <props.icon fontSize={'small'} />
      </ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </ListItem>
  )
}

const ComponentItem = (props: PropsComponentItem) => {
  const classes = drawerStyles()
  const currentPath = useLocation().pathname
  const isPath = (props.href === currentPath) || (props.children?.some(child => child.href === currentPath))

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
        onMouseEnter={enterItem}
        onMouseLeave={leaveItem}
        {...propsListItem}
        className={clsx({[classes.backgroundCurrentMenu]: isPath})}
      >
        <ListItemIcon >
          <props.icon fontSize={'small'} />
        </ListItemIcon>
        <HoverMenu
          elevation={1}
          open={isOpen}
          anchorEl={anchorEl}
          onClose={closeMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          MenuListProps={{ onMouseEnter: enterMenu, onMouseLeave: leaveMenu, disablePadding: true }}
        >
          <MenuItem
            button={true}
            component={props.href ? NavLink : 'div'}
            to={props.href}
            style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
            onClick={closeMenu}
          >
            {props.text}
          </MenuItem>
          <Divider />
          {
            props.children?.map((subItem, index) =>
              <ListItemChildren {...subItem} closeMenu={closeMenu} key={index} />
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
