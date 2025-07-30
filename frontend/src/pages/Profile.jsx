import { Heading, Switch, Stack, Input, Text, Button, Field, Checkbox } from "@chakra-ui/react"
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    numero_whatsapp: yup.number(),
    email: yup.string().email("Insira um e-mail válido!").required("O e-mail é obrigatório")
});

// Adicionar nome ou apelido pelo qual devemos chamar ele
// Adicionar on/off do lado Adicionar e-mail 
// Adicionar on/off do lado Adicionar número de telefone
//  

export default function Profile(){
    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     formState: { errors },
    //     setValue
    // } = useForm({
    //     resolver: yupResolver(schema)
    // });
    // const ref = useRef(null);

    // useEffect(() => {
    //     if (conf) {
    //         setValue('numero_whatsapp', )
    //     }
    // })

    return <>
        <Heading>Configuração do usuário</Heading>
        <Stack gap="4">
            <Stack gap="2">
                <Switch.Root size="lg" variant="solid">
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label>E-mail</Switch.Label>
                </Switch.Root>
                <Input placeholder="Digite seu e-mail"></Input>
            </Stack>
        </Stack>
    </>
}