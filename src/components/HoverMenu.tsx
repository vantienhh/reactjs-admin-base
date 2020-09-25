import React from 'react';
import { MenuProps, Menu } from '@material-ui/core';

function HoverMenuComponent(props: MenuProps): React.FunctionComponentElement<MenuProps> {
  const { style, PaperProps, ref } = props;

  return (
    <Menu
      ref={ref}
      style={{ pointerEvents: 'none', ...style }}
      PaperProps={{
        style: { pointerEvents: 'auto', ...PaperProps?.style },
        ...PaperProps
      }}
      {...props}
    />
  );
}

export const HoverMenu = React.forwardRef((props: MenuProps, ref) => <HoverMenuComponent {...props} ref={ref} />);
HoverMenu.displayName = 'HoverMenu';
