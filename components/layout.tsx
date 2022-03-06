import { ReactNode } from 'react';
import { Container } from '@mantine/core';
import { Nav, Footer } from './';

interface LayoutProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Layout = ({ children, size }: LayoutProps) => {
  return (
    <Container
      size={size || 'lg'}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Nav />
      {children}
      <Footer />
    </Container>
  );
};
