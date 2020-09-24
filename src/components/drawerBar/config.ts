import { Items } from 'src/types/DrawerBar'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MailIcon from '@material-ui/icons/Mail'
import { StarBorder } from '@material-ui/icons'
import { Theme, makeStyles, createStyles } from '@material-ui/core'

export const drawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
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

export const drawerItems: Items[] = [
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
