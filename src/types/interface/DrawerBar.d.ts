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

export interface PropsMenuChildren extends PropsWithChildren {
  open: boolean
  children: Item[]
}

export interface PropsMenu extends Items{

}
