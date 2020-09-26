import React from 'react';
import ReactDOM, { Renderer } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import * as serviceWorker from './serviceWorker';
import { unstable_createMuiStrictModeTheme, ThemeProvider } from '@material-ui/core/styles';
import Routes from 'src/routes';

import './plugins/i18n';

function AppRoot() {
  const theme = unstable_createMuiStrictModeTheme({});

  const App = () => (
    <CookiesProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </CookiesProvider>
  );

  if (process.env.NODE_ENV === 'production') {
    return <App />;
  }

  return (
    <React.StrictMode>
      {/*để loại trừ bớt warning: findDOMNode is deprecated in StrictMode*/}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

const elementRoot: HTMLElement | null = document.getElementById('root');
const renderMethod: Renderer = elementRoot && elementRoot.innerHTML !== '' ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(<AppRoot />, elementRoot);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
