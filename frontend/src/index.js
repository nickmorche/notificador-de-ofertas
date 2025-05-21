import React from 'react';
import ReactDOM, {createRoot} from 'react-dom/client';
import { ChakraProvider, defaultSystem, defineConfig } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);