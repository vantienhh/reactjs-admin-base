import { Dashboard } from 'src/views/dashboard'

export default [
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    auth: true
  }
]
