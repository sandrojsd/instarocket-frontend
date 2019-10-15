import React from 'react';
import { BrowserRouter} from 'react-router-dom';

import Hearder from './components/Header';
import Routes from './routes';

function App() {
  return (
    //tudo que utiliza rota tem que ficar dentro do BrowserRouter
    <BrowserRouter>
      <Hearder />
      <Routes />
    </BrowserRouter>
    
  );
}

export default App;
