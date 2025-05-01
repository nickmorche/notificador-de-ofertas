import React, { useEffect, useState } from 'react';
import {
    Button,
    Box,
} from '@chakra-ui/react';
import axios from 'axios';
import ModalCadastroOferta from './ModalCadastroOferta.js';
import ConfirmDialog from './ConfirmDialog.js';
import { toaster } from "./ui/toaster.jsx";

const OfertaList = () => {
    const [promiseHandlers, setPromiseHandlers] = useState(null);
    const [ofertas, setOfertas] = useState([]);
    const [selectedOferta, setSelectedOferta] = useState({ id: '', produto: '', marca: '', url: '', status: '' });

    // Modais
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOferta({ id: '', produto: '', marca: '', url: '', status: '' });
    };

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
        setOfertas(res.data);
    };

    const saveOferta = async (data) => {
        if(selectedOferta.hasOwnProperty('_id')){
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/api/ofertas/${selectedOferta._id}`, data);

            const response = await toaster.promise(promise, {
                success: {
                    title: "Oferta atualizada!",
                    description: " ",
                },
                error: {
                    title: "Erro ao atualizar oferta",
                    description: "Algo deu errado ao atualizar",
                },
                loading: { title: "Atualizando...", description: "Por favor, espere" },
            });
        } else {
            delete data.id;
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/api/ofertas`, data);

            const response = toaster.promise(promise, {
                success: {
                    title: "Oferta cadastrada!",
                    description: "espere pelas notificações",
                },
                error: {
                    title: "Erro ao cadastrar oferta",
                    description: "Algo deu errado ao cadastrar",
                },
                loading: { title: "Cadastrando...", description: "Por favor, espere" },
            });
        }
        setSelectedOferta({ id: '', produto: '', marca: '', url: '', status: '' })
        await fetchOfertas();
        setIsModalOpen(false)
    }

    const handleDeleteClick = async (ofertaToDelete) => {
        const confirmed = await openConfirmDialog()
        if (confirmed) {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/api/ofertas/${ofertaToDelete}`);

            const response = toaster.promise(promise, {
                success: {
                    title: "Oferta deletada!",
                    description: " ",
                },
                error: {
                    title: "Erro ao deletar oferta",
                    description: "Algo deu errado ao deletar",
                },
                loading: { title: "Deletando...", description: "Por favor, espere" },
            });
            await fetchOfertas();
            // toaster.create({
            //     title: `Oferta deletada!`,
            //     type: "success",
            // })
        }
    }

    const handleEditButton = (oferta) => {
        // console.log(oferta);
        setSelectedOferta({ ...oferta });
        openModal()
    }

    useEffect(() => {
        fetchOfertas();
    }, []);

    return (
        <div>
            <Box p={5}>
            <Button onClick={() => { 
                toaster.create({
                    title: `Oferta cadastrada!`,
                    type: "success",
                })
            }}>Mostrar Toast de Sucesso</Button>
            <Button onClick={() => {
                const promise = new Promise((resolve) => {
                    setTimeout(() => resolve(), 5000)
                });

                toaster.promise(promise, {
                    success: {
                        title: "Successfully uploaded!",
                        description: "Looks great",
                    },
                    error: {
                        title: "Upload failed",
                        description: "Something wrong with the upload",
                    },
                    loading: { title: "Uploading...", description: "Please wait" },
                })
            }}>Mostrar Toast</Button>
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
                        <Button onClick={() => handleEditButton(oferta)}>Editar</Button>
                        <Button colorScheme="red" onClick={() => handleDeleteClick(oferta._id)}>
                            Deletar
                        </Button>
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