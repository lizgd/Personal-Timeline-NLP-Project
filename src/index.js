import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

import { Grommet } from 'grommet';

const theme = {
  global: {
   colors: {
     'black': '#000000',
     'orange': '#FFC300',
     'white': '#FFFFFF',
     'red-orange': '#FF5733',
     'yellow-green': '#DAF7A6',

     'accent-1': '#FFC300',
     'accent-2': '#ECA400',

     'light-1': '#DCDCDC',
     'light-2': '#C0C0C0',
     'light-3': '#A9A9A9',

     'brand': '#990D35',

     'text': {
       dark: "#FFFFFF",
       light: "#000000"
     },
   },
   edgeSize: {
     small: '12px',
   },
   elevation: {
     light: {
       medium: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
     },
   },
    font: {
      family: 'system-ui',
    },
    hover: {
      color: '#ECA400',
    },
    button: {
      disabled: {
        opacity: 0.9,
      },
    },
  },
};

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Grommet theme={theme}>
      <App />
    </Grommet>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
