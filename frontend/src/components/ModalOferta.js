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
  Text
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const schema = yup.object().shape({
  produto: yup.string().required("O nome do produto é obrigatório"),
  marca: yup.string().required("A marca é obrigatória"),
  url: yup.string().url("Insira uma URL válida").required("A URL é obrigatória")
});

const ModalOferta = ({isOpen, onClose, onSave, oferta=null}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //       onSave(formData);
  //       setFormData({
  //           id: '', 
  //           produto: '',
  //           url: '',
  //           marca: '',
  //           status: 'ativa'
  //       });
  //   } catch (err) {
  //       console.error(err);
  //   }
  //   setFormData({ id: '', produto: '', url: '', precoDesejado: '', marca: '' });
  // };

  useEffect(() => {
    if (oferta && oferta.produto) {
      setIsEdicao(true);
      // Preenche o formulário com os dados da oferta (modo edição)
      setValue('id', oferta.id || '');
      setValue('produto', oferta.produto || '');
      setValue('url', oferta.url || '');
      setValue('marca', oferta.marca || '');
      setValue('status', 'ativa');
    } else {
      setIsEdicao(false);
      reset({
        id: '',
        produto: '',
        url: '',
        marca: '',
        status: 'ativa',
      });
    }
  }, [oferta, setValue, reset]);

  const onSubmit = (data) => {
    onSave(data);
    reset();
  }

  return (
    <Dialog.Root key="xl" size="lg" placement="center" motionPreset="slide-in-bottom" open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{oferta?.produto ? 'Editar Oferta' : 'Cadastro de Produto'}</Dialog.Title>
            </Dialog.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Body pb="4">
                <Stack gap='4'>
                  <Field.Root>
                    <Field.Label>Produto</Field.Label>
                    <Input placeholder="Digite o nome do produto..." {...register('produto')} />
                    {errors.produto && <Text color="red.500">{errors.produto.message}</Text>}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Marca</Field.Label>
                    <Input placeholder="Digite o nome da marca..." {...register('marca')} />
                    {errors.marca && <Text color="red.500">{errors.marca.message}</Text>}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>URL</Field.Label>
                    <Input placeholder="Digite a URL do site..." {...register('url')}></Input>
                    {errors.url && <Text color="red.500">{errors.url.message}</Text>}
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={onClose}>Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button type="submit" onClick={handleSubmit}>{oferta?.produto ? 'Salvar alterações' : 'Adicionar'}</Button>
              </Dialog.Footer>
            </form>
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