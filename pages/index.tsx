import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  Divider,
  Container,
  Grid,
  Space,
  Button,
  Paper,
  Anchor,
  Text,
  Group,
  Badge,
  Center,
  InputWrapper,
  Input,
  MediaQuery,
} from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { Layout } from '../components';

import matter from 'gray-matter';
import axios from 'axios';
import fs from 'fs';
import { join } from 'path';
import { marked } from 'marked';

interface HomeProps {
  metadata: any;
  content: string;
}

const Home = ({ metadata, content }: HomeProps) => {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(),
    new Date(),
  ]);

  return (
    <>
      <Head>
        <title>{metadata.title || 'Refugee app'}</title>
        <meta name={metadata.meta_name} content={metadata.meta_content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Space h="xl" />
        <Paper padding="lg" shadow="sm" radius="md" withBorder>
          <div
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></div>
        </Paper>
      </Layout>
    </>
  );
};

const CONTENT_PATH = join(process.cwd(), 'content.mdx');

export const getStaticProps = async () => {
  const fileContents = fs.readFileSync(CONTENT_PATH);
  const { data: metadata, content } = matter(fileContents);
  return { props: { metadata, content } };
};

export default Home;
