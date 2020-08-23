import React from 'react'
import clsx from 'clsx'
import { Items, PropsComponentItem } from 'src/types/interface/DrawerBar'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MailIcon from '@material-ui/icons/Mail'
import { StarBorder } from '@material-ui/icons'
import { Divider, Theme, createStyles, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation, NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HoverMenu from 'src/components/HoverMenu'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'

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
  const leaveItem = (): void => {
    setMouseOverItem(false)
  }
  const enterMenu = (): void => {
    setMouseOverMenu(true)
  }
  const leaveMenu = (): void => {
    setMouseOverMenu(false)
  }

  const handlerClassMenu = (): void => {
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
          onClose={handlerClassMenu}
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
          <MenuItem style={{display: 'flex', justifyContent: 'center'}}>
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
                onClick={handlerClassMenu}
              >
                <ListItemIcon style={{minWidth: 30}}>
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
  const classes = useStyles()
  const currentPath = useLocation().pathname

  return (
    <List disablePadding>
      {items.map((item, index) => {
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
  const classes = useStyles()

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
