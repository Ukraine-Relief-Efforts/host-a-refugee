import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  Title,
  Container,
  Grid,
  Space,
  Button,
  Paper,
  Card,
  Text,
  Group,
  Badge,
  Center,
  InputWrapper,
  Input,
  MediaQuery,
} from '@mantine/core';
import { Nav, HostSignup, Footer } from '../components';

const Home = () => {
  return (
    <>
      <Head>
        <title>Register as a host</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container size={'lg'} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <HostSignup />
        <Footer />
      </Container>
    </>
  );
};

export default Home;
