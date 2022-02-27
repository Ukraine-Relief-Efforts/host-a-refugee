import Head from 'next/head';
import { Layout, HostSignup } from '../components';

const Home = () => {
  return (
    <>
      <Head>
        <title>Register as a host</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <HostSignup />
      </Layout>
    </>
  );
};

export default Home;