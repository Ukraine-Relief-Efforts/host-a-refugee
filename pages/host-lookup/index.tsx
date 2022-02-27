import Head from 'next/head';
import { Layout, HostLookup } from '../../components';

const HostLookupPage = () => {
  return (
    <>
      <Head>
        <title>Register as a host</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout requireAuth={false}>
        <HostLookup />
      </Layout>
    </>
  );
};

export default HostLookupPage;
