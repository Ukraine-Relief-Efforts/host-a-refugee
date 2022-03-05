import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mantine/core';
import { Nav, Footer, Modal } from './';
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
        <Modal
          opened={opened}
          onClose={handleClose}
          title={'Authentication required'}
          message={'Please sign in above ↗ to access this page.'}
        />
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
