import React from "react";
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import About from './About';
import WorkshopsList from '../containers/WorkshopsList';
import WorkshopDetails from './WorkshopDetails';

import './App.css';

function App() {
    return (
        <div>
            <NavBar />
            <Container className="my-4">
                <Switch>
                    <Route path="/workshops/:id" component={WorkshopDetails} />
                    <Route path="/workshops" component={WorkshopsList} />
                    <Route path="/" component={About} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;