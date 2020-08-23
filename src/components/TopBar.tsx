import React from 'react'
import { IconButton, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

interface AppBarProps extends React.PropsWithChildren<{}> {
  handleDrawer: () => void
  isOpenDrawer: boolean
}

const TopBar = (props: AppBarProps) => {
  return (
    <div>
      <Toolbar style={{ minHeight: 50 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawer}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </div>
  )
}

export default TopBar
