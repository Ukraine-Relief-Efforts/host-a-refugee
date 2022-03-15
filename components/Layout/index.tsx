import { ReactNode } from 'react';
import { Container } from '@mantine/core';
import { Nav, Footer } from '..';
import { LanguageProvider } from '../../context';
interface LayoutProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Layout({ children, size }: LayoutProps) {
  return (
    <LanguageProvider>
      <Container
        size={size || 'lg'}
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Nav />
        {children}
        <Footer />
      </Container>
    </LanguageProvider>
  );
}
