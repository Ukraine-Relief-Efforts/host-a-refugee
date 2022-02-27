import { ReactNode } from 'react';
import { Container, Button, Center } from '@mantine/core';
import { Nav, Footer } from './';
import { useSession } from 'next-auth/react';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export const Layout = ({ children, requireAuth = true }: LayoutProps) => {
  const { data: session } = useSession();

  const renderContent = () => {
    if (requireAuth && !session) {
      return (
        <Center>
          Authentication required. Please login with the button above.
        </Center>
      );
    }

    return children;
  };

  return (
    <Container
      size={'lg'}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Nav />
      {renderContent()}
      <Footer />
    </Container>
  );
};
