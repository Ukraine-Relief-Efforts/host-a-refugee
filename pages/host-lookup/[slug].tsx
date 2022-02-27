import Head from 'next/head';
import { Layout } from '../../components';
import { dummyData } from '../../dummyData';

export const HostPage = ({ name, location, capacity, url }: HostPageProps) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <article>
          <h1>{name}</h1>
          <p>{location}</p>
        </article>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const paths = dummyData.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsType) {
  const { slug } = params;
  const data = dummyData.filter((item) => item.slug === slug);

  return {
    props: { ...data },
  };
}

type GetStaticPropsType = { params: any };
type HostPageProps = {
  name: string;
  location: string;
  capacity: number;
  url: string;
};

export default HostPage;
