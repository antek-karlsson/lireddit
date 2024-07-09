import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <Link as={NextLink} href={'/login'}>
          Login
        </Link>
        <Link as={NextLink} href={'/register'}>
          Register
        </Link>
      </>
    );
  } else {
    body = (
      <>
        <Box>{data.me.username}</Box>
        <Button variant={'link'}>Log out</Button>
      </>
    );
  }
  return (
    <Flex bg={'teal'} p={4} justify={'flex-end'} alignItems={'center'}>
      <Flex gap={4}>{body}</Flex>
    </Flex>
  );
};
