import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Modal, Title, Text, Space } from '@mantine/core';
import { Nav, Footer } from './';
import { useSession } from 'next-auth/react';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export const Layout = ({ children, requireAuth = true }: LayoutProps) => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const [opened, setOpened] = useState<boolean>(false);

  const handleClose = () => {
    setOpened(false);
    return push('/');
  };

  useEffect(() => {
    if (!session) return setOpened(true);
  }, [session]);

  const renderContent = () => {
    if (requireAuth && !session) {
      return (
        <Modal opened={opened} onClose={handleClose} size="md" radius="md">
          <Title>Authentication required</Title>
          <Space h="xl" />
          <Text size="lg">Please login above ↗ to access this page.</Text>
          <Space h="xl" />
        </Modal>
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
