import Head from 'next/head';
import { Layout, HostLookup } from '../../components';

const Home = () => {
  return (
    <>
      <Head>
        <title>Register as a host</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <HostLookup />
      </Layout>
    </>
  );
};

export default Home;
