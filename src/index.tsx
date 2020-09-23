import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import * as serviceWorker from './serviceWorker'
import { unstable_createMuiStrictModeTheme, ThemeProvider } from '@material-ui/core/styles'
import Routes from 'src/routes'

import './plugins/i18n'

const AppRoot = () => {
  const theme = unstable_createMuiStrictModeTheme({})

  return (
    // DEV
    <React.StrictMode>
      {/*DEV (để loại trừ bớt warning: findDOMNode is deprecated in StrictMode )*/}
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </CookiesProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

const elementRoot: HTMLElement | null = document.getElementById('root')
let renderMethod: Renderer = elementRoot && elementRoot.innerHTML !== '' ? ReactDOM.hydrate : ReactDOM.render

renderMethod(<AppRoot />, elementRoot)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
