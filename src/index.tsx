import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import * as serviceWorker from './serviceWorker'
import Routes from 'src/routes'

const elementRoot: HTMLElement | null = document.getElementById('root')

let renderMethod: Renderer = (elementRoot && elementRoot.innerHTML !== '') ? ReactDOM.hydrate : ReactDOM.render

const AppRoot = () => {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  )
}

renderMethod(<AppRoot />, elementRoot)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
