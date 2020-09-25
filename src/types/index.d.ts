import { ComponentType } from 'react';

export interface IRouter {
  path: string;
  exact: boolean;
  component: ComponentType;
  auth?: boolean;
}
