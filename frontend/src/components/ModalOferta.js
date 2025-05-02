import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Stack,
  Field,
  Input,
  Portal,
} from '@chakra-ui/react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const ModalOferta = ({isOpen, onClose, onSave, oferta=null}) => {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    id: '',
    produto: '',
    url: '',
    marca: '',
    status: 'ativa'
  });
  const [isEdicao, setIsEdicao] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
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
    }
    setFormData({ id: '', produto: '', url: '', precoDesejado: '', marca: '' });
  };

  useEffect(() => {
    if (oferta && oferta.produto != '') {
      setIsEdicao(true);
      setFormData({
          id: oferta.id || '',
          produto: oferta.produto || '',
          url: oferta.url || '',
          marca: oferta.marca || '',
          status: 'ativa'
      });
    } else {
      setIsEdicao(false);
      setFormData({
          id: '',
          produto: '',
          url: '',
          marca: '',
          status: 'ativa'
      });
    }
  }, [oferta]);

  return (
    <Dialog.Root key="xl" size="lg" placement="center" motionPreset="slide-in-bottom" open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{isEdicao ? 'Editar Oferta' : 'Cadastro de Produto'}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap='4'>
                <Field.Root>
                  <Field.Label>Produto</Field.Label>
                  <Input name='produto' value={formData.produto} onChange={handleChange} ref={ref} placeholder="Digite o nome do produto..." />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Marca</Field.Label>
                  <Input name='marca' value={formData.marca} onChange={handleChange} placeholder="Digite o nome da marca..." />
                </Field.Root>
                <Field.Root>
                  <Field.Label>URL</Field.Label>
                  <Input name='url' value={formData.url} onChange={handleChange} placeholder="Digite a URL do site..."></Input>
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>{isEdicao ? 'Salvar alterações' : 'Adicionar'}</Button>
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

export default ModalOferta;