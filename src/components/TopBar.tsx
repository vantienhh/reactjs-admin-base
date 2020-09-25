import React from 'react';
import { NavLink } from 'react-router-dom';
import { TopBarProps } from 'src/types/TopBar';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button, Avatar, MenuItem, Badge, Menu, IconButton, Toolbar, createStyles, Divider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const menuItemStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      width: 150
    }
  })
);

const toolbarStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      minHeight: 50,
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#2d2d2d',
      color: '#ffffff'
    }
  })
);

function TopBarUser(): React.FunctionComponentElement<{}> {
  const classes = menuItemStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openPopup, setOpenPopup] = React.useState(false);

  const closePopup = () => {
    setOpenPopup(false);
    setAnchorEl(null);
  };
  const clickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(document.getElementById('top-bar-right') || event.currentTarget);
    setOpenPopup(true);
  };

  return (
    <span>
      <Button disableElevation color="inherit" onClick={clickProfile}>
        <Avatar src="https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753" />
        Lê Văn Tiến
      </Button>
      <Menu
        elevation={1}
        open={openPopup}
        anchorEl={anchorEl}
        onClose={closePopup}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem component={NavLink} to={'/example'} onClick={closePopup} className={classes.menuItem}>
          Profile
        </MenuItem>
        <MenuItem component={NavLink} to={'/test'} onClick={closePopup} className={classes.menuItem}>
          Setting
        </MenuItem>
        <Divider />
        <MenuItem component={NavLink} to={'/test'} onClick={closePopup} className={classes.menuItem}>
          Log Out
        </MenuItem>
      </Menu>
    </span>
  );
}

function TopBarLanguage(): React.FunctionComponentElement<{}> {
  const [anchorRef, setAnchorRef] = React.useState<null | HTMLElement>(null);
  const [openPopup, setOpenPopup] = React.useState(false);
  const { i18n } = useTranslation();

  const showPopupLanguage = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorRef(document.getElementById('top-bar-right') || event.currentTarget);
    setOpenPopup(true);
  };
  const closePopup = (): void => {
    setOpenPopup(false);
    setAnchorRef(null);
  };
  const changeLanguage = (lang: string): void => {
    void i18n.changeLanguage(lang);
    closePopup();
  };

  return (
    <span>
      <Button disableElevation color="inherit" onClick={showPopupLanguage}>
        {i18next.language}
      </Button>
      <Menu
        elevation={1}
        open={openPopup}
        anchorEl={anchorRef}
        onClose={closePopup}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem onClick={() => changeLanguage('vi')}>VI - Vietnamese</MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>EN - English</MenuItem>
      </Menu>
    </span>
  );
}

function TopBarRight(): React.FunctionComponentElement<{}> {
  return (
    <div id="top-bar-right">
      <IconButton component="span" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>

      <TopBarUser />
      <TopBarLanguage />
    </div>
  );
}

export function TopBar(props: TopBarProps): React.FunctionComponentElement<TopBarProps> {
  const classes = toolbarStyles();
  return (
    <Toolbar className={classes.toolbar}>
      <IconButton color="inherit" aria-label="open drawer" onClick={props.handleDrawer} edge="start">
        <MenuIcon />
      </IconButton>
      <TopBarRight />
    </Toolbar>
  );
}
