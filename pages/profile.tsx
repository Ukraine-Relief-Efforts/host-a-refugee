import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Layout } from '../components';
import { Space, Paper, Text, Title } from '@mantine/core';
import { getUserInfo } from './api/users';
import type { User } from '../models';

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
          <Title order={3}>My Profile</Title>
          <Space h="lg" />
          <Text size="md">{`Email: ${user.fields.email}`}</Text>
          <Text size="md">{`Name: ${user.fields.name}`}</Text>
          <Text size="md">{`Phone Number: ${user.fields.phoneNumber}`}</Text>
          <Text size="md">{`City / Region: ${user.fields.cityRegion}`}</Text>
          <Text size="md">{`Accomodation Details: ${user.fields.accomodationDetails}`}</Text>
          <Text size="md">{`Host Capacity: ${user.fields.groupSize}`}</Text>
          <Text size="md">{`Spoken Languages ${user.fields.languages}`}</Text>
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
