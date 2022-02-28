import Head from 'next/head';
import { Space, Paper } from '@mantine/core';
import { Layout } from '../components';

import matter from 'gray-matter';
import fs from 'fs';
import { join } from 'path';
import { marked } from 'marked';

interface HomeProps {
  metadata: any;
  content: string;
}

export default function HomePage({ metadata, content }: HomeProps) {
  return (
    <>
      <Head>
        <title>{metadata.title || 'Refugee app'}</title>
        <meta name={metadata.meta_name} content={metadata.meta_content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout requireAuth={false}>
        <Space h="xl" />
        <Paper padding="lg" shadow="sm" radius="md" withBorder>
          <div
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></div>
        </Paper>
      </Layout>
    </>
  );
}

const CONTENT_PATH = join(process.cwd(), 'content.mdx');

export async function getStaticProps() {
  const fileContents = fs.readFileSync(CONTENT_PATH);
  const { data: metadata, content } = matter(fileContents);
  return {
    props: {
      metadata,
      content,
    },
  };
}
