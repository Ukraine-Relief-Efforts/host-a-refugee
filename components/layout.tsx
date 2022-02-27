import { Container } from '@mantine/core';
import { Nav, Footer } from './';

export const Layout = ({ children }: any) => (
  <Container
    size={'lg'}
    style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
  >
    <Nav />
    {children}
    <Footer />
  </Container>
);
