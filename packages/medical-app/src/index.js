import React from 'react';
import { render } from 'react-dom';
import App from './App';
import registerWorkers from './serviceWorkers/register';
import setTheme from './utils/themeHandler';

const appElement = document.getElementById('app-container');

// TODO: Get theme from group/domain preferences, and store values on localStorage
setTheme();

registerWorkers();

render(<App />, appElement);
