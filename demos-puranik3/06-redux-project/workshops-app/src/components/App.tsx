// It was necessary to import React till React v17
// import React from 'react';
import { lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "./global/Menu/Menu";
import Home from "./pages/Home/Home";
import WorkshopsList from "./pages/WorkshopsList/WorkshopsList";
import WorkshopDetails from "./pages/WorkshopDetails/WorkshopDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feedback = lazy( () => import( './pages/Feedback/Feedback' ) );

function App() {
    return (
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
                    <Route path="/feedback">
                        <Suspense fallback={<div>Loading feedback page. Please wait...</div>}>
                            <Feedback />
                        </Suspense>
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
    );
}

export default App;
