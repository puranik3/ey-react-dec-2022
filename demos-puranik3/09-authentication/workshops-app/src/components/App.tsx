// It was necessary to import React till React v17
// import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { Container } from "react-bootstrap";
import Menu from "./global/Menu/Menu";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import WorkshopsList from "./pages/WorkshopsList/WorkshopsList";
import WorkshopDetails from "./pages/WorkshopDetails/WorkshopDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../services/auth';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <div>
                <Menu />
                <ToastContainer />

                <Container className="my-4">
                    <Switch>
                        <PrivateRoute path="/workshops/:id" roles={[ 'admin' ]}>
                            <WorkshopDetails />
                        </PrivateRoute>
                        <PrivateRoute path="/workshops" roles={[ 'admin', 'general' ]}>
                            <WorkshopsList />
                        </PrivateRoute>
                        <Route path="/login" exact>
                            <Login />
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
        </AuthProvider>
    );
}

export default App;
