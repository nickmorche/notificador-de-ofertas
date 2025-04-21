import * as React from "react"
import { Button, Box } from '@chakra-ui/react';
import  OfertaForm  from "./components/OfertaForm.js";
import  OfertaList  from './components/OfertaList.js';
import ModalCadastroOferta from './components/ModalCadastroOferta.js';



function App(){
  const handleSubmit = (formData) => {
    console.log('Dados enviados:', formData);
    // aqui você pode chamar uma rota backend com axios
  };

    
  return (
  <div style={{ padding: '20px', fontFamily: 'sans-serif'}}>
      <h1>Cadastro de Ofertas</h1>
      <Box p={5}>
        <ModalCadastroOferta onSubmit={handleSubmit} />
      </Box>
      <hr />
      <OfertaList />
  </div>
  );
}

export default App;