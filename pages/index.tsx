import Head from 'next/head';
import { UsersLookup, Layout, AboutIndex } from '../components';
import axios from 'axios';
import { User } from '../models';
import { AIRTABLE_URL, AIRTABLE_API_KEY } from '../config';
import { filterByFormula } from '../utils';
interface HomeProps {
  hosts: User[];
  refugees: User[];
}

export default function HomePage({ hosts, refugees }: HomeProps) {
  return (
    <>
      <Head>
        <title>Refugee app</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <AboutIndex />
        <UsersLookup hosts={hosts} refugees={refugees} />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }: any) {
  const { data: refugees } = await axios({
    method: 'GET',
    url: `${AIRTABLE_URL}/Hosts?${filterByFormula('userType', 'refugee')}`,
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });

  const { data: hosts } = await axios({
    method: 'GET',
    url: `${AIRTABLE_URL}/Hosts?${filterByFormula('userType', 'host')}`,
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, stale-while-revalidate=59'
  );

  return {
    props: { refugees: refugees.records, hosts: hosts.records },
  };
}
