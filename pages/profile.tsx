import Head from 'next/head';
import { Layout } from '../components';
import { Space, Paper, Text, Title } from '@mantine/core';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Register as a host</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Space h="xl" />
        <Paper padding="lg" shadow="sm" radius="md" withBorder>
          <Title order={3}>My Profile</Title>
          <Space h="lg" />

          <Text size="md">{`Email: ${session?.user?.email}`}</Text>
          <Text size="md">{`Name: ${session?.user?.name}`}</Text>
        </Paper>
      </Layout>
    </>
  );
};

export default ProfilePage;
