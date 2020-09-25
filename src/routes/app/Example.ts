import { Example, Test } from 'src/views/examples';

export default [
  {
    path: '/example',
    exact: true,
    component: Example,
    auth: true
  },
  {
    path: '/test',
    exact: true,
    component: Test,
    auth: true
  }
];
