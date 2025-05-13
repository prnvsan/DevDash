import { Flex, HStack, Link as ChakraLink, Heading } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'GitHub', path: '/' },
  { label: 'NPM', path: '/npm' },
  { label: 'News', path: '/news' },
  { label: 'To-Do', path: '/todo' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <Flex as="nav" p={4} shadow="sm" justify="space-between" align="center" bg="black.50">
      <Heading size="md">DevDash 🚀</Heading>
      <HStack spacing={6}>
        {navLinks.map(link => (
          <ChakraLink
            as={Link}
            to={link.path}
            key={link.path}
            fontWeight={location.pathname === link.path ? 'bold' : 'normal'}
          >
            {link.label}
          </ChakraLink>
        ))}
      </HStack>
    </Flex>
  );
}
