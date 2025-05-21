import { Container, Heading, VStack, Text } from '@chakra-ui/react';
import  OfertaList  from '../components/OfertaList.js';
import { Toaster } from '../components/ui/toaster.jsx';

export default function Ofertas(){
    return (
        <>
            <Heading mb={4}>Ofertas Cadastradas</Heading>
            <VStack spacing={4} align="stretch">
                <OfertaList />
                <Toaster/>
            </VStack>
        </>
    )
}