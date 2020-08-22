import { PropsWithChildren } from 'react'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon'

export interface DrawerBarProps extends PropsWithChildren<{}> {
  handleDrawerClose: () => void
}

export interface Menu {
  text: string
  icon: OverridableComponent<SvgIconTypeMap>
  href: string
}

export interface ItemsMenu {
  text: string,
  icon: OverridableComponent<SvgIconTypeMap>
  href?: string
  children?: Menu[]
}

export interface PropsChildrenMenu extends PropsWithChildren {
  children: Menu[]
}
