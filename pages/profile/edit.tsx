import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { Paper, Title, Space } from '@mantine/core';
import { Layout, SignupForm } from '../../components';
import { getUserInfo } from '../api/users';
import { User } from '../../models';

export default function EditPage({ user }: { user: User }) {
  console.log(user);

  const initialValues = {
    userType: '',
    phoneNumber: '',
    country: 'PL',
    city: '',
    accomodationDetails: '',
    groupSize: 1,
    languages: '',
    termsOfService: false,
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Sign up for Host a Refugee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Paper padding="lg" shadow="sm" radius="md" withBorder>
          <Title order={3}>Register</Title>
          <Space h="lg" />

          <SignupForm
            initialValues={initialValues}
            method="POST"
            url="/api/users"
          />
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
  if (user) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};
