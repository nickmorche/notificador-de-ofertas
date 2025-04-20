import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Select,
    useDisclosure,
    Box,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function ModalCadastro(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formData, setFormData ] = useState({
        produto: "",
        url: "",
        palavraChave: "",
        marca: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    return (
        <>
          <Button colorScheme="blue" onClick={onOpen}>
            Adicionar Produto
          </Button>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Cadastrar Produto</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit}>
                <ModalBody pb={6}>
                  <FormControl mb={3}>
                    <FormLabel>Nome do Produto</FormLabel>
                    <Input
                      name="produto"
                      value={formData.produto}
                      onChange={handleChange}
                      placeholder="Ex: Tênis Adidas"
                      required
                    />
                  </FormControl>
    
                  <FormControl mb={3}>
                    <FormLabel>URL do Site</FormLabel>
                    <Input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      placeholder="https://www.exemplo.com/produto"
                      required
                    />
                  </FormControl>
    
                  <FormControl mb={3}>
                    <FormLabel>Palavra-chave</FormLabel>
                    <Input
                      name="palavraChave"
                      value={formData.palavraChave}
                      onChange={handleChange}
                      placeholder="Ex: desconto, nike"
                    />
                  </FormControl>
                </ModalBody>
    
                <ModalFooter>
                  <Button type="submit" colorScheme="green" mr={3}>
                    Salvar
                  </Button>
                  <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </>
      );
}
