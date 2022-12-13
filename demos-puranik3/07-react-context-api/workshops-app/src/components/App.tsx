// It was necessary to import React till React v17
// import React from 'react';
import { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "./global/Menu/Menu";
import Home from "./pages/Home/Home";
import WorkshopsList from "./pages/WorkshopsList/WorkshopsList";
import WorkshopDetails from "./pages/WorkshopDetails/WorkshopDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { ToastContainer } from 'react-toastify';
import ThemeContext, { Theme } from '../contexts/ThemeContext';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [ theme, setTheme ] = useState<Theme>( 'light' );

    const toggle = () => {
        setTheme( ( t : Theme ) => t === 'light' ? 'dark' : 'light' );
    };

    const value = {
        theme,
        toggle
    };

    return (
        <ThemeContext.Provider value={value}>
            <div>
                <Menu />
                <ToastContainer />

                <Container className="my-4">
                    <Switch>
                        <Route path="/workshops/:id">
                            <WorkshopDetails />
                        </Route>
                        <Route path="/workshops">
                            <WorkshopsList />
                        </Route>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="**">
                            <PageNotFound />
                        </Route>
                    </Switch>
                </Container>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
