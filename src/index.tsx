import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
import './custom.css';
import './unify.css';
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
