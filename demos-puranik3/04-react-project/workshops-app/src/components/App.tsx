// It was necessar to import React till React v17
// import React from 'react';
import { Container } from 'react-bootstrap';
import Menu from './global/Menu/Menu';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
      <Menu />

      <Container className="my-4">
        <Home />
      </Container>
    </div>
  );
}

export default App;