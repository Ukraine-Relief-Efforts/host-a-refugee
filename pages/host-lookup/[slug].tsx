import { Nav, Footer } from '../../components';
import { dummyData } from '../../dummyData';

export const Host = ({ name, location, capacity, url }: HostPageProps) => {
  return (
    <>
      <Nav />
      <article>
        <h1>{name}</h1>
        <p>{location}</p>
      </article>
      <Footer />
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
  console.log(data);

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

export default Host;
