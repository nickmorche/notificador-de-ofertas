import React, { useEffect, useState } from 'react';
import {
    Button,
    Box,
} from '@chakra-ui/react';
import axios from 'axios';
import ModalCadastroOferta from './ModalCadastroOferta.js';
import ConfirmDialog from './ConfirmDialog.js';
import { toast } from 'react-toastify';

const OfertaList = () => {
    const [promiseHandlers, setPromiseHandlers] = useState(null);
    const [ofertas, setOfertas] = useState([]);
    const [selectedOferta, setSelectedOferta] = useState({ id: '', produto: '', marca: '', url: '', status: '' });

    // Modais
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openConfirmDialog = () => {
        setIsConfirmDialogOpen(true)
        return new Promise((resolve, reject) => {
          setPromiseHandlers({ resolve, reject })
        })
      }
    
      const handleCancel = () => {
        setIsConfirmDialogOpen(false)
        promiseHandlers?.resolve(false)
      }
    
    const handleConfirm = () => {
        setIsConfirmDialogOpen(false)
        promiseHandlers?.resolve(true)
    }

    const fetchOfertas = async () => {
        console.log('passei por aqui');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/ofertas`);
        //let ofertas_teste = res.data;
        setOfertas(res.data);
    };

    const saveOferta = async (data) => {
        console.log(data);
        console.log(selectedOferta);
        if(data.id == ''){
        // if (!selectedOferta && selectedOferta.hasOwnProperty('id') && selectedOferta.id == ''){
            delete data.id;
            axios.post(`${process.env.REACT_APP_API_URL}/api/ofertas`, data);
            // const newOferta = {
            //     id: Date.now(),
            //     produto: data.produto,
            //     marca: data.marca,
            //     url: data.url,
            //     status: 'ativa'
            // };

            // setOfertas([...ofertas, data]);
            
            toast.success('Oferta cadastrada');
        } else {
            axios.put(`${process.env.REACT_APP_API_URL}/api/ofertas/${selectedOferta._id}`, data);
            // const updatedOfertas = ofertas.map(oferta => 
            //     oferta.id === selectedOferta.id ? data: oferta
            // );
            // setOfertas(updatedOfertas);
            toast.success('Oferta atualizada');
        }
        fetchOfertas();
        setSelectedOferta({ id: '', produto: '', marca: '', url: '', status: '' })
        setIsModalOpen(false)
    }

    const handleEditButton = (oferta) => {
        setSelectedOferta({ ...oferta });
        openModal()
    }

    useEffect(() => {
        fetchOfertas();
    }, []);

    return (
        <div>
            <Box p={5}>
                <Button onClick={openModal}>Cadastrar Oferta</Button>
                <ModalCadastroOferta 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    onSave={saveOferta} 
                    oferta={selectedOferta}
                />
            </Box>
            <hr />
            <h2>Ofertas Cadastradas</h2>
            <ul>
                {ofertas.map(oferta => (
                    <li key={oferta._id}>
                        <strong>{oferta.produto} - {oferta.marca} - {oferta.url} ({oferta.status})</strong>
                    </li>
                ))} 
            </ul>
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default OfertaList;