import React from 'react'
import { IconButton, createStyles, Theme, List, Divider, useTheme } from '@material-ui/core'
import { ItemsMenu, DrawerBarProps, PropsChildrenMenu } from 'src/types/interface/DrawerBar'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import { NavLink as RouterLink } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { StarBorder } from '@material-ui/icons'
import MailIcon from '@material-ui/icons/Mail'
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
)

const items: ItemsMenu[] = [
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

const ChildrenMenu: React.FunctionComponent<PropsChildrenMenu> = (props: PropsChildrenMenu) => {
  const classes = useStyles()

  return (
    <Collapse in={ true } timeout="auto" unmountOnExit>
      <List disablePadding>
        { props.children.map(item => (
          <div key={ item.text }>
            <ListItem
              button
              component={ RouterLink }
              to={ item.href }
              className={ classes.nested }
            >
              <ListItemIcon>{ <item.icon /> }</ListItemIcon>
              <ListItemText primary={ item.text } />
            </ListItem>
          </div>
        )) }
      </List>
    </Collapse>
  )
}

const ListMenu: React.FunctionComponent = () => {
  return (
    <List>
      { items.map((item, index) => {
        if (item.href) {
          return (
            <div key={ `${ item.text }_${ index }` }>
              <ListItem button component={ RouterLink } to={ item.href }>
                <ListItemIcon>{ <item.icon /> }</ListItemIcon>
                <ListItemText primary={ item.text } />
              </ListItem>
              { item.children?.length && <ChildrenMenu children={ item.children } /> }
            </div>
          )
        }

        return (
          <div key={ `${ item.text }_${ index }` }>
            <ListItem>
              <ListItemIcon>{ <item.icon /> }</ListItemIcon>
              <ListItemText primary={ item.text } />
            </ListItem>

            { item.children?.length && <ChildrenMenu children={ item.children } /> }
          </div>
        )
      }) }
    </List>
  )
}

const DrawerBar: React.FunctionComponent<DrawerBarProps> = (props: DrawerBarProps) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div>
      <div className={ classes.toolbar }>
        <IconButton onClick={ props.handleDrawerClose }>
          { theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon /> }
        </IconButton>
      </div>
      <Divider />
      <ListMenu />
    </div>
  )
}

export default DrawerBar
