import React from 'react';
import clsx from 'clsx';
import { useLocation, NavLink } from 'react-router-dom';
import { HoverMenu } from 'src/components/HoverMenu';
import { ListItemText, MenuItem, ListItemIcon, ListItem, Divider, List, createStyles } from '@material-ui/core';
import { PropsComponentItem, PropsListItemChildren, PropsTreeViewItem } from 'src/types/DrawerBar';
import { drawerStyles, drawerItems } from './config';
import makeStyles from '@material-ui/core/styles/makeStyles';

const itemChildrenIconStyles = makeStyles(() =>
  createStyles({
    iconWidth: {
      minWidth: 30
    }
  })
);

const treeViewItemStyles = makeStyles(() =>
  createStyles({
    itemText: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    treeWidth: {
      width: 150
    }
  })
);

function ItemChildren(props: PropsListItemChildren): React.FunctionComponentElement<PropsListItemChildren> {
  const classes = itemChildrenIconStyles();
  return (
    <ListItem button component={NavLink} to={props.href} onClick={props.closeMenu}>
      <ListItemIcon className={classes.iconWidth}>
        <props.icon fontSize={'small'} />
      </ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </ListItem>
  );
}

function TreeViewItem(props: PropsTreeViewItem): React.FunctionComponentElement<PropsTreeViewItem> {
  const classes = treeViewItemStyles();
  const [mouseOverMenu, setMouseOverMenu] = React.useState(false);
  const enterMenu = (): void => setMouseOverMenu(true);
  const leaveMenu = (): void => setMouseOverMenu(false);
  const closeMenu = (): void => {
    setMouseOverMenu(false);
    props.closeMenu();
  };

  const isOpen = mouseOverMenu || props.mouseOverItem;

  return (
    <HoverMenu
      elevation={1}
      open={isOpen}
      anchorEl={props.anchorEl}
      onClose={closeMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      MenuListProps={{ onMouseEnter: enterMenu, onMouseLeave: leaveMenu, disablePadding: true }}
    >
      <MenuItem
        button={true}
        component={props.href ? NavLink : 'div'}
        to={props.href}
        className={`${classes.treeWidth} ${classes.itemText}`}
        style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
        onClick={closeMenu}
      >
        {props.text}
      </MenuItem>
      <Divider />
      {props.children?.map((subItem, index) => (
        <ItemChildren {...subItem} closeMenu={closeMenu} key={index} />
      ))}
    </HoverMenu>
  );
}

function ItemComponent(props: PropsComponentItem): React.FunctionComponentElement<PropsComponentItem> {
  const [mouseOverItem, setMouseOverItem] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const leaveItem = (): void => setMouseOverItem(false);
  const closeMenu = (): void => setMouseOverItem(false);
  const enterItem = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setMouseOverItem(true);
    setAnchorEl(event.currentTarget);
  };

  const classes = drawerStyles();
  const currentPath = useLocation().pathname;
  const itemHrefInsideCurrentPath =
    props.href === currentPath || props.children?.some((child) => child.href === currentPath);

  let propsListItem: any = { button: true };
  if (props.href) propsListItem = { ...propsListItem, component: NavLink, to: props.href };

  return (
    <div>
      <ListItem
        onMouseEnter={enterItem}
        onMouseLeave={leaveItem}
        {...propsListItem}
        className={clsx({ [classes.backgroundCurrentMenu]: itemHrefInsideCurrentPath })}
      >
        <ListItemIcon>
          <props.icon fontSize={'small'} />
        </ListItemIcon>
        <TreeViewItem closeMenu={closeMenu} anchorEl={anchorEl} mouseOverItem={mouseOverItem} {...props} />
      </ListItem>
    </div>
  );
}

function SidebarMenu(): React.FunctionComponentElement<{}> {
  const classes = drawerStyles();
  const currentPath = useLocation().pathname;

  return (
    <List disablePadding>
      {drawerItems.map((item, index) => {
        return (
          <div key={item.text} className={clsx({ [classes.backgroundCurrentMenu]: currentPath === item.href })}>
            <ItemComponent {...item} key={index} />
          </div>
        );
      })}
    </List>
  );
}

export function DrawerBarCompact(): React.FunctionComponentElement<{}> {
  const classes = drawerStyles();

  return (
    <div>
      <div className={classes.toolbar}>
        <h3>App</h3>
      </div>
      <Divider />
      <SidebarMenu />
    </div>
  );
}
