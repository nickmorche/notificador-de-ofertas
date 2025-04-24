import React, { useRef, useState } from 'react';
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
//https://www.chakra-ui.com/docs/components/dialog

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const ModalCadastroOferta = () => {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = React.useState({
    produto: '',
    url: '',
    marca: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    //if (onSubmit) onSubmit(formData);
    e.preventDefault();
    try {
        axios.post(`${process.env.REACT_APP_API_URL}/api/ofertas`, formData);
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
    setFormData({ produto: '', url: '', precoDesejado: '', marca: '' });
  };

  return (
    <Dialog.Root key="xl" size="lg" placement="center" motionPreset="slide-in-bottom" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Cadastrar produto
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Cadastro de Produto</Dialog.Title>
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
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
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