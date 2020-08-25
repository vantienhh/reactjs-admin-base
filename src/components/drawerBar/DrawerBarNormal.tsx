import React from 'react'
import clsx from 'clsx'
import { List, Divider } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { NavLink, useLocation } from 'react-router-dom'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { drawerStyles, drawerItems } from './config'
import { PropsItemChildren, PropsComponentItem } from 'src/types/DrawerBar'

const ItemChildren = (props: PropsItemChildren) => {
  const classes = drawerStyles()
  const currentPath = useLocation().pathname

  return (
    <List disablePadding hidden={!props.open}>
      {props.children.map(item => (
        <div
          key={item.text}
          className={clsx({ [classes.backgroundCurrentMenu]: currentPath === item.href })}
        >
          <ListItem
            button
            component={NavLink}
            to={item.href}
            className={classes.nested}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        </div>
      ))}
    </List>
  )
}

const ComponentItem = (props: PropsComponentItem) => {
  const [open, setOpen] = React.useState(false)
  const handleClick = (): void => setOpen(!open)

  return (
    <div>
      <ListItem
        button={true}
        component={props.href ? NavLink : 'div'}
        to={props.href}
        onClick={handleClick}
      >
        <ListItemIcon>{<props.icon />}</ListItemIcon>
        <ListItemText primary={props.text} />
        {props.children && (open ? <ExpandMoreIcon /> : <ChevronLeftIcon />)}
      </ListItem>
      {props.children?.length && <ItemChildren children={props.children} open={open} />}
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

const DrawerBarNormal = () => {
  const classes = drawerStyles()

  return (
    <div>
      <div className={classes.toolbar}>
        <h3>Admin App</h3>
      </div>
      <Divider />
      <SidebarMenu />
    </div>
  )
}

export default DrawerBarNormal
