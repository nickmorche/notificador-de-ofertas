import React from 'react';
import OfertaForm from './components/OfertaForm';
import OfertaList from './components/OfertaList';

function App(){
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif'}}>
            <h1>Cadastro de Ofertas</h1>
            <OfertaForm />
            <hr />
            <OfertaList />
        </div>
    );
}

export default App;