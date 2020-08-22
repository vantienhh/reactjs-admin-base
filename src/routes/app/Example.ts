import Example from 'src/views/examples/Example'
import Test from 'src/views/examples/Test'

export default [
  {
    path: '/example',
    exact: true,
    component: Example
  },
  {
    path: '/test',
    exact: true,
    component: Test
  }
]
