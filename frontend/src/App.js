import * as React from "react"
import { Button, Box } from '@chakra-ui/react';
import  OfertaList  from './components/OfertaList.js';
import { ToastContainer } from 'react-toastify';




function App(){
  return (
  <div style={{ padding: '20px', fontFamily: 'sans-serif'}}>
      <h1>Cadastro de Ofertas</h1>
      <OfertaList />
      <ToastContainer />
  </div>
  );
}

export default App;