import React, { useState } from 'react';
import axios from 'axios';

const OfertaForm = () => {
    const [formData, setFormData] = useState({
        produto: '',
        url: '',
        palavraChave: '',
        marca: '',
        status: 'ativa'
    });

    const handleChage = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:5000/api/ofertas', formData);
            alert('Oferta cadastrada!')
            setFormData({
                produto: '',
                url: '',
                palavraChave: '',
                marca: '',
                status: 'ativa'
            });
        } catch (err) {
            alert('Erro ao cadastrar abaixo. Por favor contate a T.I.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name='produto' placeholder='Produto' value={formData.produto} onChange={handleChange} /><br />
            <input name='url' placeholder='URL' value={formData.url} onChange={handleChange} /><br />
            <input name='palavraChave' placeholder='Palavra-chave' value={formData.palavraChave} onChange={handleChange} /><br />
            <select name='status' value={formData.status} onChange={handleChange}>
                <option value='ativa'>Ativa</option>
                <option value='inativa'>Inativa</option>
            </select><br />
            <button type='submit'>Salvar</button>
        </form>
    );
};

export default OfertaForm;