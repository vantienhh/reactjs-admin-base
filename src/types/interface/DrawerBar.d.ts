import { PropsWithChildren } from 'react'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon'

export interface Item {
  text: string
  icon: OverridableComponent<SvgIconTypeMap>
  href: string
}

export interface Items {
  text: string,
  icon: OverridableComponent<SvgIconTypeMap>
  href?: string
  children?: Item[]
}

export interface PropsItemChildren extends PropsWithChildren {
  open: boolean
  children: Item[]
}

export interface PropsComponentItem extends Items {

}

export interface PropsTreeViewItemChildren {
  open: boolean
  anchorEl: any
  closeTreeView(): void
}
