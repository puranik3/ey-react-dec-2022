// It was necessary to import React till React v17
// import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Menu from './global/Menu/Menu';
import Home from './pages/Home/Home';
import WorkshopsList from './pages/WorkshopsList/WorkshopsList';

function App() {
  return (
    <div>
      <Menu />

      <Container className="my-4">
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/workshops">
          <WorkshopsList />
        </Route>
      </Container>
    </div>
  );
}

export default App;