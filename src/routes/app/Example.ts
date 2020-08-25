import Example from 'src/views/examples/Example'
import Test from 'src/views/examples/Test'

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
]
