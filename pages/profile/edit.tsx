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
    ...user.fields,
    termsOfService: true,
  };

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Sign up for Host a Refugee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Paper padding="lg" shadow="sm" radius="md" withBorder>
          <Title order={3}>Edit Profile</Title>
          <Space h="lg" />

          <SignupForm
            initialValues={initialValues}
            method="PATCH"
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

  return {
    props: { user },
  };
};
