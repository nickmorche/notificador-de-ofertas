import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Stack,
  Field,
  Input,
  Kbd,
  Portal,
  FormControl
} from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
//https://www.chakra-ui.com/docs/components/dialog

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const ModalCadastroOferta = ({isOpen, onClose, onSave, oferta=null}) => {
  const ref = useRef(null);
  const [formData, setFormData] = React.useState({
    id: '',
    produto: '',
    url: '',
    marca: '',
    status: 'ativa'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        // axios.post(`${process.env.REACT_APP_API_URL}/api/ofertas`, formData);
        onSave(formData);
        setFormData({
            id: '', 
            produto: '',
            url: '',
            marca: '',
            status: 'ativa'
        });
    } catch (err) {
        console.error(err);
        toast.error('Erro ao cadastrar abaixo. Por favor contate a T.I. Mensagem: ' + err);
    }
    setFormData({ id: '', produto: '', url: '', precoDesejado: '', marca: '' });
  };

  useEffect(() => {
    if (oferta) {
        setFormData({
            id: oferta.id || '',
            produto: oferta.produto || '',
            url: oferta.url || '',
            marca: oferta.marca || '',
            status: 'ativa'
        });
    } else {
        setFormData({
            id: '',
            produto: '',
            url: '',
            marca: '',
            status: 'ativa'
        });
    }
  }, [oferta]);

  // onOpenChange={(e) => setOpen(e.open)}

  return (
    <Dialog.Root key="xl" size="lg" placement="center" motionPreset="slide-in-bottom" open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{oferta ? 'Editar Oferta' : 'Cadastro de Produto'}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap='4'>
                <Field.Root>
                  <Field.Label>Produto</Field.Label>
                  <Input name='produto' onChange={handleChange} ref={ref} placeholder="Digite o nome do produto..." />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Marca</Field.Label>
                  <Input name='marca' onChange={handleChange} placeholder="Digite o nome da marca..." />
                </Field.Root>
                <Field.Root>
                  <Field.Label>URL</Field.Label>
                  <Input name='url' onChange={handleChange} placeholder="Digite a URL do site..."></Input>
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>{oferta ? 'Salvar alterações' : 'Adicionar'}</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild onClick={onClose}>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}


// const ModalCadastroOferta = ({ onSubmit }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [formData, setFormData] = React.useState({
//     produto: '',
//     url: '',
//     precoDesejado: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (onSubmit) onSubmit(formData);
//     onClose();
//     setFormData({ produto: '', url: '', precoDesejado: '' });
//   };

//   return (
//     <>
//       <Button onClick={onOpen} colorScheme="teal">Cadastrar Oferta</Button>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Nova Oferta</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl mb={3}>
//               <FormLabel>Nome do Produto</FormLabel>
//               <Input
//                 placeholder="Tênis Nike Air Max"
//                 name="produto"
//                 value={formData.produto}
//                 onChange={handleChange}
//               />
//             </FormControl>

//             <FormControl mb={3}>
//               <FormLabel>URL do Produto</FormLabel>
//               <Input
//                 placeholder="https://www.exemplo.com/produto"
//                 name="url"
//                 value={formData.url}
//                 onChange={handleChange}
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Preço Desejado (R$)</FormLabel>
//               <Input
//                 placeholder="199.90"
//                 name="precoDesejado"
//                 type="number"
//                 value={formData.precoDesejado}
//                 onChange={handleChange}
//               />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
//               Salvar
//             </Button>
//             <Button onClick={onClose}>Cancelar</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

export default ModalCadastroOferta;