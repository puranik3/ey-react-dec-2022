import React from "react";
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import About from './About';
import WorkshopsList from './WorkshopsList';
import WorkshopDetails from './WorkshopDetails';

function App() {
    return (
        <div>
            <NavBar />
            <div className="container my-4">
                <Switch>
                    <Route path="/workshops/:id" component={WorkshopDetails} />
                    <Route path="/workshops" component={WorkshopsList} />
                    <Route path="/" component={About} />
                </Switch>
            </div>
        </div>
    );
}

export default App;