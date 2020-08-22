import NotFound from 'src/views/errors/NotFound'
import Error from 'src/views/errors/Error'

export default [
  {
    path: '/errors/404',
    exact: true,
    component: NotFound
  },
  {
    path: '/errors/500',
    exact: true,
    component: Error
  }
]
