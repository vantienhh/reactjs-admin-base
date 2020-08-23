import React from 'react'
import { createStyles, Theme, List, Divider } from '@material-ui/core'
import { Items, PropsMenuChildren, PropsMenu } from 'src/types/interface/DrawerBar'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink, useLocation } from 'react-router-dom'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { StarBorder } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MailIcon from '@material-ui/icons/Mail'
import DashboardIcon from '@material-ui/icons/Dashboard'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      // ...theme.mixins.toolbar,
      height: 50
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    backgroundCurrentMenu: {
      background: '#dadada'
    }
  })
)

const items: Items[] = [
  {
    text: 'Dashboard',
    icon: DashboardIcon,
    href: '/dashboard'
  },
  {
    text: 'mails',
    icon: MailIcon,
    children: [
      {
        text: 'Example',
        icon: StarBorder,
        href: '/example'
      },
      {
        text: 'Test',
        icon: StarBorder,
        href: '/test'
      }
    ]
  }
]

const MenuChildren = (props: PropsMenuChildren) => {
  const classes = useStyles()
  const currentPath = useLocation().pathname

  return (
    <List disablePadding hidden={ !props.open }>
      { props.children.map(item => (
        <div
          key={ item.text }
          className={ clsx({ [classes.backgroundCurrentMenu]: currentPath === item.href }) }
        >
          <ListItem
            button
            component={ NavLink }
            to={ item.href }
            className={ classes.nested }
          >
            <ListItemIcon>{ <item.icon /> }</ListItemIcon>
            <ListItemText primary={ item.text } />
          </ListItem>
        </div>
      )) }
    </List>
  )
}

const Menu = (props: PropsMenu) => {
  const [open, setOpen] = React.useState(false)
  const handleClick = (): void => setOpen(!open)

  let propsListItem: any = { button: true }
  if (props.href) propsListItem = { ...propsListItem, component: NavLink, to: props.href }

  return (
    <div>
      <ListItem { ...propsListItem } onClick={ handleClick }>
        <ListItemIcon>{ <props.icon /> }</ListItemIcon>
        <ListItemText primary={ props.text } />
        { props.children && (open ? <ExpandMoreIcon /> : <ChevronLeftIcon />) }
      </ListItem>
      { props.children?.length && <MenuChildren children={ props.children } open={ open } /> }
    </div>
  )
}

const ListMenu = () => {
  const classes = useStyles()
  const currentPath = useLocation().pathname

  return (
    <List disablePadding>
      { items.map((item, index) => {
        return (
          <div
            key={ item.text }
            className={ clsx({ [classes.backgroundCurrentMenu]: currentPath === item.href }) }
          >
            <Menu { ...item } key={ index } />
          </div>
        )
      }) }
    </List>
  )
}

const DrawerBar = () => {
  const classes = useStyles()

  return (
    <div>
      <div className={ classes.toolbar }>
        <h3>Admin App</h3>
      </div>
      <Divider />
      <ListMenu />
    </div>
  )
}

export default DrawerBar
