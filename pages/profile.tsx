import { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import _ from 'lodash';
import { Space, Paper, Text, Title } from '@mantine/core';
import { getUserInfo } from './api/users';
import { Layout } from '../components';
import type { User } from '../models';

export default function ProfilePage({ user }: { user: User }) {
  const { avatar, ...rest } = user.fields;

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

          {avatar && (
            <div
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                overflow: 'hidden',
              }}
            >
              <Image src={avatar} width={100} height={100} alt="avatar" />
            </div>
          )}

          <Space h="lg" />

          {Object.entries(rest).map(([key, value]) => (
            <Fragment key={key}>
              <Text weight={700}>{_.startCase(key)}</Text>
              <hr style={{ margin: 0 }} />
              <Text>
                {typeof value === 'object' ? value.join(', ') : value}
              </Text>

              <Space h="md" />
            </Fragment>
          ))}
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
