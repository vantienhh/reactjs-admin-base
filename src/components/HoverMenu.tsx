import React from 'react'
import Menu from '@material-ui/core/Menu'
import { MenuProps } from '@material-ui/core'

function HoverMenu(props: MenuProps) {
  const { style, PaperProps, ref } = props

  return (
    <Menu
      ref={ref}
      style={{ pointerEvents: 'none', ...style }}
      PaperProps={{
        style: { pointerEvents: 'auto', ...PaperProps?.style },
        ...PaperProps
      }}
      {...props}
    >
    </Menu>
  )
}

export default React.forwardRef((props: MenuProps, ref) => <HoverMenu {...props} ref={ref} />)
