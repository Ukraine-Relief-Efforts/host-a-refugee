import Head from 'next/head';
import {
  Space,
  Paper,
  Text,
  Title,
  LoadingOverlay,
  Group,
  Badge,
  Center,
} from '@mantine/core';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { Layout, SignupForm } from '../components';
import { useUser } from '../hooks';

export default function ProfilePage() {
  const { data, loading, error } = useUser();

  const renderUserInfo = () => {
    if (error) {
      return <Text color="red">Error: {error}</Text>;
    }

    return data?.user?.email ? (
      <Group direction="column">
        <Group>
          <Text weight="bold">Email:</Text>
          <Text color="dimmed">{data?.user?.email}</Text>
        </Group>
        <Group>
          <Text weight="bold">Name:</Text>
          <Text color="dimmed">{data?.user?.name}</Text>
        </Group>
        <Group>
          <Text weight="bold">Phone Number:</Text>
          <Text color="dimmed">{data?.user?.phoneNumber}</Text>
        </Group>
        <Group>
          <Text weight="bold">City / region:</Text>
          <Text color="dimmed">
            {data?.user?.city}, {data?.user?.country}
          </Text>
        </Group>
        <Group>
          <Text weight="bold">Accomodation Details:</Text>
          <Text color="dimmed">{data?.user?.accomodationDetails}</Text>
        </Group>
        <Group>
          <Text weight="bold">Group size:</Text>
          <Text color="dimmed">{data?.user?.groupSize}</Text>
        </Group>
        <Group>
          <Text weight="bold">Languages:</Text>
          <Text color="dimmed">{data?.user?.languages.join(', ')}</Text>
        </Group>
      </Group>
    ) : (
      <SignupForm />
    );
  };

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
          <LoadingOverlay visible={loading} />
          <Center>
            <Group direction="column">
              <Group>
                <Title order={3}>My Profile</Title>
                {data?.user?.verified ? (
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
              {renderUserInfo()}
            </Group>
          </Center>
        </Paper>
      </Layout>
    </>
  );
}
