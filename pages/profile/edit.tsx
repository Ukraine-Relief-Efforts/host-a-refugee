import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSession, signOut } from 'next-auth/react';
import axios from 'axios';
import {
  Paper,
  Title,
  Text,
  Space,
  Group,
  Button,
  Modal,
  LoadingOverlay,
} from '@mantine/core';
import { Layout, SignupForm } from '../../components';
import { getUserInfo } from '../api/users';
import { User } from '../../models';

export default function EditPage({ user }: { user: User }) {
  const { push } = useRouter();
  const [opened, setOpened] = useState<boolean>(false);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { email, name, dateStart, dateEnd, ...formValues } = user.fields;

  const initialValues = {
    ...formValues,
    termsOfService: true,
  };

  const handleDeleteConfirmation = async () => {
    setIsDeleting(true);
    setError('');

    try {
      await axios({
        method: 'DELETE',
        url: `/api/users`,
      });
      setIsDeleted(true);
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.error || error.message);
    }

    return setIsDeleting(false);
  };

  const handleSuccessModalClose = () => {
    setOpened(false);
    setIsDeleted(false);
    signOut();
    return push('/');
  };

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Sign up for Host a Refugee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Delete Confirmation"
        centered
      >
        <Text>
          Are you sure you would like to delete your profile? This will remove
          all of your information from our records.
        </Text>
        <Space h="xl" />
        <Group position="right">
          <Button onClick={handleDeleteConfirmation} color="red">
            Confirm
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isDeleted}
        onClose={handleSuccessModalClose}
        title="Success"
        centered
      >
        <Text>
          Your profile has been successfully delete and all of your information
          has been removed from our database.
        </Text>
        <Space h="xl" />
        <Group position="right">
          <Button onClick={handleSuccessModalClose}>Continue</Button>
        </Group>
      </Modal>

      <Layout size="sm">
        <Paper padding="lg" shadow="sm" radius="md" withBorder>
          <LoadingOverlay visible={isDeleting} />

          <Group style={{ position: 'relative' }}>
            <Title order={3}>Edit Profile</Title>
            <Button
              style={{ position: 'absolute', right: 0 }}
              color="red"
              onClick={() => setOpened(true)}
            >
              Delete
            </Button>
          </Group>
          <Space h="lg" />

          <SignupForm
            initialValues={initialValues}
            method="PATCH"
            url="/api/users"
          />

          {error && (
            <>
              <Space h="lg" />
              <Text color="red">{error}</Text>
            </>
          )}
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
