import { signIn } from 'next-auth/react';
import {
  Modal as MantineModal,
  Center,
  Space,
  Button,
  Group,
} from '@mantine/core';
import { FaGoogle, FaTwitter } from 'react-icons/fa';

interface SignInModealProps {
  opened: boolean;
  onClose: () => void;
}

export default function SignInModal({ opened, onClose }: SignInModealProps) {
  const login = (provider: string) => {
    return signIn(provider, {
      callbackUrl: '/profile?',
    });
  };

  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      size="sm"
      radius="md"
      centered
    >
      <Space h="md" />
      <Center>
        <Group direction="column" style={{ width: '100%' }}>
          <Button
            size="xl"
            color="red"
            fullWidth
            onClick={() => login('google')}
          >
            <FaGoogle size={35} style={{ marginRight: 30 }} />
            Sign In with Google
          </Button>
          <Button size="xl" fullWidth onClick={() => login('twitter')}>
            <FaTwitter size={35} style={{ marginRight: 30 }} />
            Sign In with Twitter
          </Button>
        </Group>
      </Center>
      <Space h={50} />
    </MantineModal>
  );
}
