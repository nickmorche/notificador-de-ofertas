import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OfertaList = () => {
    const [ofertas, setOfertas] = useState([]);
    
    const fetchOfertas = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/ofertas`);
        let ofertas_teste = res.data;
        setOfertas(res.data);
    };

    useEffect(() => {
        fetchOfertas();
    }, []);

    return (
        <div>
            <h2>Ofertas Cadastradas</h2>
            <ul>
                {ofertas.map(oferta => (
                    <li key={oferta._id}>
                        <strong>{oferta.produto} - {oferta.marca} - {oferta.site} ({oferta.status})</strong>
                    </li>
                ))} 
            </ul>
        </div>
    );
};

export default OfertaList;