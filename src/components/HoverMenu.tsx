import { MenuProps } from '@material-ui/core'
import React from 'react'
import Menu from '@material-ui/core/Menu'

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

// TODO fix findDOMNode is deprecated in StrictMode
export default React.forwardRef((props: MenuProps, ref) => <HoverMenu {...props} ref={ref} />)
