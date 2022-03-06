import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { UsersLookup, Layout, AboutIndex } from '../components';
import { User } from '../models';
import { getAllUsers } from './api/users';
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { hosts, refugees } = await getAllUsers();

  return {
    props: { refugees: refugees.records, hosts: hosts.records },
  };
};
