import React, { useReducer } from 'react';
import Navbar from './Navbar';
import About from './About';
import WorkshopsList from './WorkshopsList';
import WorkshopDetails from './WorkshopDetails';
import PageNotFound from './PageNotFound';

import workshopsReducer, { initialState } from '../reducers/workshops';
import WorkshopsContext from '../context/workshops';

import { Route, Switch, Redirect } from 'react-router-dom';

function App(props) {
    const [ state, dispatch ] = useReducer( workshopsReducer, initialState );

    const value = {
        workshops: state,
        dispatch
    };

    return (
        <WorkshopsContext.Provider value={value}>
            <Navbar />
            <div className="container my-4">
                <Switch>
                    <Route path="/" exact>
                        <About />
                    </Route>
                    <Route path="/workshops" exact render={() => <WorkshopsList />}></Route>
                    <Route path="/workshops/:id" component={WorkshopDetails}></Route>
                    <Redirect to="/" />
                    {/* <Route path="**" component={PageNotFound} /> */}
                </Switch>
            </div>
        </WorkshopsContext.Provider>
    );
}

export default App;