import Head from 'next/head';
import { Layout, SignupForm } from '../components';

const HostSignupPage = () => {
  return (
    <>
      <Head>
        <title>Register as a host</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SignupForm />
      </Layout>
    </>
  );
};

export default HostSignupPage;
