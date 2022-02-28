import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { Layout } from '../components';
import { Space, Paper, Text, Title } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useUserInfo } from '../hooks';

export default function ProfilePage() {
  const { data: session } = useSession();
  const { userInfo, loading, error } = useUserInfo(session?.user?.email);

  return (
    <>
      <Head>
        <title>Profile Page</title>
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
}
