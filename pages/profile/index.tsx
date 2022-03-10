import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Space, Paper, Text, Title, Group, Badge, Center } from '@mantine/core';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { Layout } from '../../components';
import { getUserInfo } from '../api/users';
import { User } from '../../models';

export default function ProfilePage({ user }: { user: User }) {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout size="xs">
        <Space h="xl" />
        <Paper padding="lg" shadow="sm" radius="md" withBorder>
          <Group direction="column">
            <Group>
              <Title order={3}>My Profile</Title>
              {user.fields.verified ? (
                <Badge variant="filled" color="green">
                  <Group spacing="xs">
                    <AiOutlineCheck />
                    <p>Verified</p>
                  </Group>
                </Badge>
              ) : (
                <Badge variant="filled" color="red">
                  <Group spacing="xs">
                    <AiOutlineClose />
                    <p>Unverified</p>
                  </Group>
                </Badge>
              )}
            </Group>
            <Space />
            <Group direction="column">
              <Group>
                <Text weight="bold">Email:</Text>
                <Text color="dimmed">{user.fields.email}</Text>
              </Group>
              <Group>
                <Text weight="bold">Name:</Text>
                <Text color="dimmed">{user.fields.name}</Text>
              </Group>
              <Group>
                <Text weight="bold">Phone Number:</Text>
                <Text color="dimmed">{user.fields.phoneNumber}</Text>
              </Group>
              <Group>
                <Text weight="bold">City / region:</Text>
                <Text color="dimmed">
                  {user.fields.city}, {user.fields.country}
                </Text>
              </Group>
              <Group>
                <Text weight="bold">Accomodation Details:</Text>
                <Text color="dimmed">{user.fields.accomodationDetails}</Text>
              </Group>
              <Group>
                <Text weight="bold">Group size:</Text>
                <Text color="dimmed">{user.fields.groupSize}</Text>
              </Group>
              <Group>
                <Text weight="bold">Languages:</Text>
                <Text color="dimmed">{user.fields.languages.join(', ')}</Text>
              </Group>
            </Group>
          </Group>
        </Paper>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const user = await getUserInfo(session);
  if (!user) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};
