import { Flex, Link, Icon, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer(){
    return (
        <Flex 
            as="footer"
            mt={8}
            pt={4}
            borderTop="1px"
            borderColor="gray.200"
            justify="center"
            align="center"
            direction="column"
            gap={2}
        >
            <Flex gap={4}>
                <Link href="https://github.com/nickmorche" isExternal>
                    <Icon as={FaGithub} boxSize={6} />
                </Link>
                <Link href="https://www.linkedin.com/in/nicolas-morche-0a47ab180" isExternal>
                    <Icon as={FaLinkedin} boxSize={6} />
                </Link>
                <Text fontSize="sm" color="gray.500">
                    © {new Date().getFullYear()} - Nicolas Lima Morche
                </Text>
            </Flex>
        </Flex>
    )
}