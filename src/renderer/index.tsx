// document.write('test');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';


ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);
