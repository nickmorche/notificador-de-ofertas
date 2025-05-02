import * as React from "react"
import { Button, Box } from '@chakra-ui/react';
import { Container, Heading, VStack, Text } from '@chakra-ui/react';
import  OfertaList  from './components/OfertaList.js';
import { Toaster } from './components/ui/toaster.jsx';


function App(){
  return (
    <Container maxW="container.lg" py={6}>
      <Heading mb={4}>Ofertas Cadastradas</Heading>
      <VStack spacing={4} align="stretch">
        <OfertaList />
        <Toaster/>
      </VStack>
    </Container>
  );
}

export default App;