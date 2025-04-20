import react, { useEffect, useState } from 'react';
import axios from 'axios';

const OfertaList = () => {
    const [ofertas, setOfertas] = useState([]);
    
    const fetchOfertas = async () => {
        // const res = await axios.get('http://localhost:5000/api/ofertas');
        // setOfertas(res.data);
        return [];
    };

    useEffect(() => {
        fetchOfertas();
    }, []);

    return (
        <div>
            <h2>Ofertas Cadastradas</h2>
            <ul>
                {/* {ofertas.map(oferta => {
                    <li key={oferta._id}>
                        <strong>{oferta.produto} - {oferta.marca} - {oferta.url} ({oferta.status})</strong>
                    </li>
                })} */}
            </ul>
        </div>
    );
};

export default OfertaList;