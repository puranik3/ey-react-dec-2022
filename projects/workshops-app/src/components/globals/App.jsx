import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import AppNavbar from './AppNavbar';
import Home from '../pages/Home';
import WorkshopsList from '../pages/WorkshopsList';
import AddWorkshop from '../pages/AddWorkshop';
import WorkshopDetails from '../pages/WorkshopDetails';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div>
            <AppNavbar />
            
            <Container className="my-4">
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/workshops" exact>
                    <WorkshopsList />
                </Route>
                <Switch>
                    <Route path="/workshops/add" exact>
                        <AddWorkshop />
                    </Route>
                    
                    {/* this is not exact as it has to show up on /workshops/:id/add as well */}
                    <Route path="/workshops/:id">
                        <WorkshopDetails />
                    </Route>
                </Switch>
            </Container>
        </div>
    );
};

export default App;