import React, { useEffect, useState } from 'react';
import { Card, Status, Text, Box, Button, HStack, Stack, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import ModalOferta from './ModalOferta.js';
import ConfirmDialog from './ConfirmDialog.js';
import { toaster } from "./ui/toaster.jsx";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const OfertaList = () => {
    const [promiseHandlers, setPromiseHandlers] = useState(null);
    const [ofertas, setOfertas] = useState([]);
    const [selectedOferta, setSelectedOferta] = useState({ id: '', produto: '', marca: '', url: '', status: '' });
    const [undoTimeout, setUndoTimeout] = useState(null);
    const [deletedOferta, setDeletedOferta] = useState(null);

    // Modais
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOferta({ id: '', produto: '', marca: '', url: '', status: '' });
    };

    const openUndoModal = () => setIsUndoModalOpen(true);
    const closeUndoModal = () => setIsUndoModalOpen(false);

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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/ofertas`);
        setOfertas(res.data);
    };

    const saveOferta = async (data) => {
        const isEdit = selectedOferta.hasOwnProperty('_id');
    
        const saveAndUpdate = async () => {
            if (isEdit) {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/ofertas/${selectedOferta._id}`, data);
            } else {
                delete data.id;
                await axios.post(`${process.env.REACT_APP_API_URL}/api/ofertas`, data);
            }
    
            // Aguarda atualização da lista
            await fetchOfertas();
    
            // Limpa e fecha modal
            setSelectedOferta({ id: '', produto: '', marca: '', url: '', status: '' });
            setIsModalOpen(false);
        };
    
        // Garante que o toast reflita todo o processo
        await toaster.promise(saveAndUpdate(), {
            success: {
                title: isEdit ? "Oferta atualizada!" : "Oferta cadastrada!",
                description: "Tudo certo!",
            },
            error: {
                title: isEdit ? "Erro ao atualizar oferta" : "Erro ao cadastrar oferta",
                description: "Algo deu errado, tente novamente.",
            },
            loading: {
                title: isEdit ? "Atualizando..." : "Cadastrando...",
                description: "Por favor, espere.",
            },
        });
    };

    const handleEditButton = (oferta) => {
        setSelectedOferta({ ...oferta });
        openModal()
    };

    const handleDeleteClick = async (ofertaToDelete) => {
        const confirmed = await openConfirmDialog();
        
        setDeletedOferta(ofertaToDelete);

        const deleteAndUpdate = async () => {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/ofertas/${ofertaToDelete}`);
            
            // Aguarda atualização da lista
            await fetchOfertas();
        };

        if (confirmed) {
            await toaster.promise(deleteAndUpdate(), {
                success: {
                    title: "Oferta deletada!",
                    description: " ",
                    action: {
                        label: "Desfazer",
                        onClick: () => {
                            handleUndo(ofertaToDelete);
                        }
                    },
                    duration: 5000
                },
                error: {
                    title: "Erro ao deletar oferta",
                    description: "Algo deu errado ao deletar",
                },
                loading: { title: "Deletando...", description: "Por favor, espere" },
            });
        }
    }
    

    const handleUndo = async (ofertaToDelete) => {
        const undoDeletedOferta = async () => {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/ofertas/${ofertaToDelete}/restaurar`);
        
            // Aguarda atualização da lista
            await fetchOfertas();
        }

        await toaster.promise(undoDeletedOferta, {
            success: {
                title: "Oferta restaurada!",
                description: " ",
                duration: 5000
            },
            error: {
                title: "Erro ao restaurar oferta",
                description: "Algo deu errado ao restaurar",
            },
            loading: { title: "Restaurando...", description: "Por favor, espere" },
        });
        
        // Restaurar a oferta deletada
        // if (deletedOferta) {
        // setOfertas([...ofertas, deletedOferta]);
        // }
        
        // // Limpar o timeout e fechar o modal
        // if (undoTimeout) clearTimeout(undoTimeout);
        // setIsUndoModalOpen(false);
        // setDeletedOferta(null);
  };

    useEffect(() => {
        fetchOfertas();
    }, []);

    return (
        <div>
            <Box p={5}>
                <Button onClick={openModal} colorPalette={'blue'}><IoIosAddCircle /> Cadastrar Oferta</Button>
                <ModalOferta 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    onSave={saveOferta} 
                    oferta={selectedOferta}
                />
            </Box>
            <hr />
            <h2>Ofertas Cadastradas</h2>
            <SimpleGrid columns={{ base: 1, md: 2 }} minChildWidth="sm" spacing={4}>
                {ofertas.map(oferta => (
                    <Card.Root key={oferta._id}>
                        <Card.Body>
                            <HStack mb="4" gap="1">
                                <Status.Root colorPalette={oferta.status == 'ativa' ? 'green' : 'red'}>
                                    <Status.Indicator />
                                </Status.Root>
                                <Text fontWeight="bold">
                                    {oferta.produto} - {oferta.marca}
                                </Text>
                            </HStack>
                            <Text fontSize="sm" noOfLines={1}>{oferta.url}</Text>
                        </Card.Body>
                        <Card.Footer>
                            <HStack spacing={3}>
                                <Button size="sm" onClick={() => handleEditButton(oferta)}><MdEdit /> Editar</Button>
                                <Button size="sm" colorPalette="red" onClick={() => handleDeleteClick(oferta._id)}><FaTrash />Deletar</Button>
                            </HStack>
                        </Card.Footer>
                    </Card.Root>
                ))} 
            </SimpleGrid>
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default OfertaList;