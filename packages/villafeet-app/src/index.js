import React from 'react';
import { render } from 'react-dom';
import App from './App';
import registerWorkers from './serviceWorkers/register';

const appElement = document.getElementById('app-container');
registerWorkers();

render(<App />, appElement);
