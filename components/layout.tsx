import { Container, Button } from '@mantine/core';
import { Nav, Footer } from './';
import { useSession, signIn } from 'next-auth/react';

export const Layout = ({ children }: any) => {
  const { data: session } = useSession();

  return (
    <Container
      size={'lg'}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Nav />
      {session ? children : <Button onClick={() => signIn()}>Sign In</Button>}
      <Footer />
    </Container>
  );
};
