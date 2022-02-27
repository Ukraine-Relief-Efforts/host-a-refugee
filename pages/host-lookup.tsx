import axios from 'axios';
import Head from 'next/head';
import { Layout, HostLookup } from '../components';
import { AIRTABLE_URL, AIRTABLE_API_KEY } from '../config';
const Home = ({ hosts }: HostLookupProps) => {
  return (
    <>
      <Head>
        <title>Register as a host</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <HostLookup hosts={hosts} />
      </Layout>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const response = await axios({
    method: 'GET',
    url: `${AIRTABLE_URL}?maxRecords=50&view=Grid%20view`,
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });

  return {
    props: { hosts: response.data.records },
  };
}

type Host = {
  id: string;
  fields: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    cityRegion: string;
    accomodationDetails: string;
    hostCapacity: number;
  };
  createdTime: string;
};

type HostLookupProps = { hosts: Host[] };
