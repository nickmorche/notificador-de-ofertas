import { Heading, Switch, Stack, Input, List, Text, Button, Field, Checkbox, Box, HStack, VStack, Separator,
    SimpleGrid,
    NativeSelect
} from "@chakra-ui/react"
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { withMask } from "use-mask-input";

const schema = yup.object().shape({
    numero_whatsapp: yup.number(),
    email: yup.string().email("Insira um e-mail válido!").required("O e-mail é obrigatório")
});


export default function Profile(){
    const [checkedEmail, setCheckedEmail] = useState(false);
    const [checkedWhatsApp, setCheckedWhatsApp] = useState(false);
    const [alertas, setAlertas] = useState([
        {id: 1, freq: "Semanalmente", horario: "16:00", dia: "segunda"},
        {id: 2, freq: "Diariamente", horario: "07:00", dia: ""}
    ])

    const horarios = [
        "00:00", "00:30", "01:00", "01:30",
        "02:00", "02:30", "03:00", "03:30",
        "04:00", "04:30", "05:00", "05:30",
        "06:00", "06:30", "07:00", "07:30",
        "08:00", "08:30", "09:00", "09:30",
        "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30",
        "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30",
        "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30",
        "22:00", "22:30", "23:00", "23:30"
    ];

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

    // TODO: Usar componente Field 
    // Doc: https://www.chakra-ui.com/docs/components/field

    return <>
        
        <Stack gap="8" pb="8" maxW="lg" css={{ "--field-label-width": "144px" }}>
            <Heading>Configuração do usuário</Heading>
            <Field.Root orientation="horizontal" required>
                <Field.Label fontWeight="medium" textWrap={"nowrap"}>
                    Nome Completo
                    <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Seu nome" />
            </Field.Root>
            <Field.Root orientation="horizontal">
                <Field.Label>E-mail</Field.Label>
                <Switch.Root size="lg" variant="solid"
                    checked={checkedEmail}
                    onCheckedChange={() => setCheckedEmail(!checkedEmail)}
                >
                    <Switch.HiddenInput />
                    {/* <Switch.Label textWrapMode="nowrap">E-mail</Switch.Label> */}
                    <Switch.Control />
                </Switch.Root>
                <Input disabled={!checkedEmail} placeholder="Digite seu e-mail aqui" flex="1"/>
            </Field.Root>
            <Field.Root orientation="horizontal">
                <Field.Label>WhatsApp</Field.Label>
                <Switch.Root size="lg" variant="solid"
                    checked={checkedWhatsApp}
                    onCheckedChange={() => setCheckedWhatsApp(!checkedWhatsApp)}
                >
                    <Switch.HiddenInput />
                    <Switch.Control />
                </Switch.Root>
                <Input disabled={!checkedWhatsApp} placeholder="(99) 99999-9999" ref={withMask("(99) 99999-9999")} />
            </Field.Root>
        </Stack>
        <Stack gap="8" pb="8" maxW="lg" css={{ "--field-label-width": "144px" }} >
            <Separator/>
            <Heading>Preferências de Alertas</Heading>
            <SimpleGrid columns={[1, null, 2]} spacing={4}>
                {/* Lista de alertas existentes */}
                {alertas.map((alerta) => (
                    <Box key={alerta.id} borderWidth="1px" borderRadius="md" p={4}>
                        <Text>Toda semana às {alerta.horario} {alerta.dia && `Na ${alerta.dia}`}</Text>
                        <HStack>
                            <Button size="sm" colorScheme="red">Excluir</Button>
                            <Button size="sm" variant="outline">Editar</Button>
                        </HStack>
                    </Box>
                ))}
            <Box borderWidth="1px" borderRadius="md" p={4} borderStyle={"dashed"}>
                <Field.Root orientation="vertical" required>
                    <Field.Label>Frequência</Field.Label>
                    <Field.RequiredIndicator />
                    <NativeSelect.Root>
                        <NativeSelect.Field>
                            <option>Semanalmente</option>
                            <option>Diariamente</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    
                </Field.Root>
                <Field.Root orientation="vertical" required>
                    <Field.Label>Horário</Field.Label>
                    <Field.RequiredIndicator />
                    <NativeSelect.Root>
                        <NativeSelect.Field>
                            {horarios.map((hor) => (
                                <option>{hor}</option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>
            </Box>
            </SimpleGrid>
            {/* Formulário de novo alerta */}
            {/* <Input disabled={isDisabledEmail} />
            <Button onClick={() => setIsDisabledEmail(!isDisabledEmail)}>
                Desabilitar
            </Button> */}
        </Stack>
        {/* <HStack gap={4}>
            <Switch.Root size="lg" variant="solid">
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label textWrapMode={"nowrap"}>E-mail</Switch.Label>
            </Switch.Root>
            <Input placeholder="Digite seu e-mail"></Input>
        </HStack> */}
        {/* <Box maxW="800px" mx="auto" mt={8} p={6}>
            <VStack align="stretch" spacing={4}>
                <HStack>
                    <Text textWrap={"nowrap"}>Nome Completo</Text>
                    <Input name="nome"></Input>
                </HStack>
            </VStack>
            <VStack align="stretch" spacing={4}>
                <Text>E-mail</Text>
                <Switch.Root size="lg" variant="solid">
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label>E-mail</Switch.Label>
                </Switch.Root>
            </VStack>
        </Box> */}
    </>
}