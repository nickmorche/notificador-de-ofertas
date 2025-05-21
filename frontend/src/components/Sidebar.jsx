import { Box, VStack, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const links = [
    { label: "Ofertas", to: "/" },
    { label: "Alertas", to: "/alerts" },
    { label: "Perfil", to: "/profile" }
];

export default function Sidebar() {
    return(
        <Box
            as="nav"
            pos="sticky"
            top="0"
            h="100vh"
            w="64"
            p="4"
            bg="gray.800"
            color="white"
            shadow="md"
        >
            <VStack align="start" spacing="4">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        as={NavLink}
                        to={link.to}
                        _hover={{ textDecoration: "none", bg: "gray.700" }}
                        _activeLink={{ fontWeight: "bold", bg: "gray.700" }}
                        w="full"
                        p="2"
                        borderRadius="md"
                    >
                        {link.label}
                    </Link>
                ))}
            </VStack>
        </Box>

    )
}