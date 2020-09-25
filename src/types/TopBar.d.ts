import { PropsWithChildren } from 'react';

export interface TopBarProps extends PropsWithChildren<{}> {
  handleDrawer: () => void;
  isDrawerNormal: boolean;
}
