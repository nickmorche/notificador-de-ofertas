import { useState } from 'react';
import { Box, VStack, Link, IconButton } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
    { label: "Ofertas", to: "/" },
    { label: "Alertas", to: "/alerts" },
    { label: "Perfil", to: "/profile" }
];

export default function Sidebar() {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    }

    return(
        <Box
            as="nav"
            pos="sticky"
            top="0"
            h="100vh"
            w={ isOpen ? "64" : "20"}
            p="4"
            bg="gray.800"
            color="white"
            shadow="md"
        >
            <IconButton 
                icon={ isOpen ? <FiX/> : <FiMenu/>}
                onClick={toggleSidebar}
            />
            {/* Conteuúdo da Sidebar */}
            { isOpen && ( 
                <VStack align="start" spacing="4">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            as={NavLink}
                            to={link.to}
                            _hover={{ textDecoration: "none", bg: "gray.700" }}
                            _activeLink={{ fontWeight: "bold", bg: "gray.700" }}
                            w={ isOpen ? 'full' : '20'}
                            p="2"
                            borderRadius="md"
                            color="white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </VStack>
            )}
        </Box>

    )
}