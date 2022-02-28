import Head from 'next/head';
import { Space, Paper, Text } from '@mantine/core';
import { UsersLookup, Layout } from '../components';
import axios from 'axios';
import { Host } from '../models';
import { AIRTABLE_URL, AIRTABLE_API_KEY } from '../config';

interface HomeProps {
  hosts: Host[];
  refugees: Host[];
}

export default function HomePage({ hosts, refugees }: HomeProps) {
  return (
    <>
      <Head>
        <title>Refugee app</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout requireAuth={false}>
        <Space h="xl" />
        <Paper padding="lg" shadow="sm" radius="md" withBorder>
          <Text>About us</Text>
        </Paper>
        <UsersLookup hosts={hosts} refugees={refugees} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const { data: refugees } = await axios({
    method: 'GET',
    url: `${AIRTABLE_URL}/Hosts?filterByFormula=%28%7BuserType%7D%20%3D%20%27refugee%27%29`,
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });

  const { data: hosts } = await axios({
    method: 'GET',
    url: `${AIRTABLE_URL}/Hosts?filterByFormula=%28%7BuserType%7D%20%3D%20%27host%27%29`,
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  return {
    props: { refugees: refugees.records, hosts: hosts.records },
  };
}
