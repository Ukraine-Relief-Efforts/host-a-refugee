import { ReactNode } from 'react';
import { Container } from '@mantine/core';
import { Nav, Footer } from './';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      size={'lg'}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Nav />
      {children}
      <Footer />
    </Container>
  );
};
