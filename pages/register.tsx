import Head from 'next/head';
import { Layout, SignupForm } from '../components';

const HostSignupPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign up for Host a Refugee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SignupForm />
      </Layout>
    </>
  );
};

export default HostSignupPage;
