import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/globals/App';

/* BrowserRouter watches changes in the URL and refreshes the <App /> */
ReactDOM.render( 
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById( 'root' )
);