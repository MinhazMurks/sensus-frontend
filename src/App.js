import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/pages/Home';
import About from './components/pages/About';
import './App.css';

function App() {

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route
                        path="/"
                        component={Home}
                        exact/>
                    <Route
                        path="/about"
                        component={About}
                    />
                    < Route
                        component={Error}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
