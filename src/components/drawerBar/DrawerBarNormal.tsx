import React from 'react';
import clsx from 'clsx';
import { ListItemText, ListItemIcon, ListItem, List, Divider, Collapse } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { drawerStyles, drawerItems } from './config';
import { PropsItemChildren, PropsComponentItem } from 'src/types/DrawerBar';

function ItemChildren(props: PropsItemChildren): React.FunctionComponentElement<PropsItemChildren> {
  const classes = drawerStyles();
  const currentPath = useLocation().pathname;

  return (
    <Collapse in={props.open} timeout={300} unmountOnExit>
      <List disablePadding>
        {props.childes.map((item) => (
          <div key={item.text} className={clsx({ [classes.backgroundCurrentMenu]: currentPath === item.href })}>
            <ListItem button component={NavLink} to={item.href} className={classes.nested}>
              <ListItemIcon>{<item.icon />}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </div>
        ))}
      </List>
    </Collapse>
  );
}

function ComponentItem(props: PropsComponentItem): React.FunctionComponentElement<PropsComponentItem> {
  const [open, setOpen] = React.useState(false);
  const itemClick = (): void => setOpen(!open);

  return (
    <div>
      <ListItem button={true} component={props.href ? NavLink : 'div'} to={props.href} onClick={itemClick}>
        <ListItemIcon>{<props.icon />}</ListItemIcon>
        <ListItemText primary={props.text} />
        {props.children && (open ? <ExpandMoreIcon /> : <ChevronLeftIcon />)}
      </ListItem>
      {props.children?.length && <ItemChildren childes={props.children} open={open} />}
    </div>
  );
}

function SidebarMenu() {
  const classes = drawerStyles();
  const currentPath = useLocation().pathname;

  return (
    <List disablePadding>
      {drawerItems.map((item, index) => {
        return (
          <div key={item.text} className={clsx({ [classes.backgroundCurrentMenu]: currentPath === item.href })}>
            <ComponentItem {...item} key={index} />
          </div>
        );
      })}
    </List>
  );
}

export function DrawerBarNormal() {
  const classes = drawerStyles();

  return (
    <div>
      <div className={classes.toolbar}>
        <h3>Admin App</h3>
      </div>
      <Divider />
      <SidebarMenu />
    </div>
  );
}
