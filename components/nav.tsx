import Link from 'next/link';
import {
  Container,
  Button,
  Center,
  Space,
  Title,
  Text,
  Breadcrumbs,
  Anchor,
  Avatar,
} from '@mantine/core';
import { useSession, signIn } from 'next-auth/react';

const routes = [
  { title: 'Home', href: '/' },
  {
    title: 'Available places',
    href: '/host-lookup',
    protected: true,
  },
  { title: 'Become a host', href: '/host-signup' },
];

export const Nav = () => {
  const { data: session } = useSession();

  return (
    <>
      <Space h="xl" />
      <Container
        padding={0}
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
        {session ? (
          <Avatar src={session.user!.image!} />
        ) : (
          <Button
            style={{
              position: 'absolute',
              display: 'flex',
              right: 0,
              top: 0,
              alignContent: 'flex-end',
            }}
            size="md"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        )}
        <Space h="lg" />
        <Breadcrumbs separator="|">
          {routes.map((item, index) => (
            <Anchor key={`${index}-${item}`}>
              <Link href={item.href} passHref>
                <Text color="blue" size="lg">
                  {item.title}
                </Text>
              </Link>
            </Anchor>
          ))}
        </Breadcrumbs>
      </Container>
    </>
  );
};
