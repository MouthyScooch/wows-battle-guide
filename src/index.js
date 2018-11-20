import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

// import 'bootstrap/dist/css/bootstrap.css'; // overwritting theme background etc
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister(); //register serviceWorker. Application is ready to register with manifest.json in place
