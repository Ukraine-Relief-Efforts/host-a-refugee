import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut, getProviders } from 'next-auth/react';
import {
  Menu,
  Button,
  Center,
  Space,
  Title,
  Text,
  Breadcrumbs,
  Anchor,
  Avatar,
} from '@mantine/core';
import { SignInModal } from './signInModal';

const authButtonStyle: {} = {
  position: 'absolute',
  display: 'flex',
  right: 0,
  top: 0,
  alignContent: 'flex-end',
};

export const Nav = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const [opened, setOpened] = useState(false);

  const routes = [
    { title: 'Home', href: '/' },
    { title: 'About us', href: '/about' },
  ];

  return (
    <>
      <SignInModal opened={opened} onClose={() => setOpened(false)} />

      <Space h="xl" />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Center>
          <Title order={1}>🇺🇦 Host a Refugee</Title>
        </Center>
        {session && session.user ? (
          <Menu
            sx={authButtonStyle}
            placement="end"
            control={
              <Avatar
                size="lg"
                radius="xl"
                style={{ cursor: 'pointer' }}
                src={session.user!.image!}
              />
            }
          >
            <Menu.Item onClick={() => push('profile')}>My Profile</Menu.Item>
            <Menu.Item
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
            >
              Logout
            </Menu.Item>
          </Menu>
        ) : (
          <Button
            sx={authButtonStyle}
            size="md"
            onClick={() => setOpened(true)}
          >
            Sign In
          </Button>
        )}
        <Space h="lg" />
        <Breadcrumbs separator="|">
          {routes.map((item, index) => (
            <Anchor key={`${index}-${item}`}>
              <Link href={item.href} passHref>
                <Text color="blue" size="md">
                  {item.title}
                </Text>
              </Link>
            </Anchor>
          ))}
        </Breadcrumbs>
        <Space h="xl" />
      </div>
    </>
  );
};
