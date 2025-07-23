import { useState } from 'react';
import { Box, VStack, HStack, Link, IconButton, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiUser, FiSettings, FiAlertCircle } from 'react-icons/fi';

const links = [
    { label: "Ofertas", to: "/", icon: <FiHome /> },
    { label: "Alertas", to: "/alerts", icon: <FiAlertCircle /> },
    { label: "Perfil", to: "/profile", icon: <FiUser /> }
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
            data-state={ isOpen ? 'open' : 'closed' }
            _closed={{
                animation: "fadeOut 300ms ease-in"
            }}
            _open={{
                animation: "fade-in 300ms ease-out"
            }}
        >
            <IconButton onClick={toggleSidebar}>
                { isOpen ? <FiX/> : <FiMenu/>}
            </IconButton>
            {/* Conteuúdo da Sidebar */}
            <VStack align="start" spacing="4">
                {links.map((link) => (
                    <HStack>
                        <Link
                            key={link.to}
                            as={NavLink}
                            to={link.to}
                            _hover={{ textDecoration: "none", bg: "gray.700" }}
                            _activeLink={{ fontWeight: "bold", bg: "gray.700" }}
                            w='full'
                            p="2"
                            borderRadius="md"
                            color="white"
                        >   
                            <IconButton>{link.icon}</IconButton>
                            {isOpen && (link.label)}
                        </Link>
                    </HStack>
                ))}
            </VStack>
        </Box>

    )
}