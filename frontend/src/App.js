import * as React from "react"
import { Button, Box } from '@chakra-ui/react';
import  OfertaForm  from "./components/OfertaForm.js";
import  OfertaList  from './components/OfertaList.js';
// import ModalCadastro from './components/Modal.js';



function App(){
  return (
  <div style={{ padding: '20px', fontFamily: 'sans-serif'}}>
      <h1>Cadastro de Ofertas</h1>
      <OfertaForm />
      <Button colorScheme="teal" size="md">
        Teste Chakra
      </Button>
      <hr />
      <OfertaList />
  </div>
  );
}

export default App;