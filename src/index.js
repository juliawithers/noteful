import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import STORE from './STORE'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
<BrowserRouter>
    <App store={STORE}/>
</BrowserRouter>, 
document.getElementById('root')
);

