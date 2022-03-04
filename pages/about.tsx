import Head from 'next/head';
import { Layout } from '../components';
import {
  Space,
  Paper,
  Text,
  Title,
  Grid,
  Image,
  Tooltip,
  Center,
} from '@mantine/core';
import { partners } from '../data/partnersData';
import { PartnersTable } from '../components';
import { AiFillTwitterCircle as TwitterIcon } from 'react-icons/ai';
import { AiFillGithub as GitHubIcon } from 'react-icons/ai';

export default function about() {
  return (
    <>
      <Head>
        <title>About Host a refugee</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout requireAuth={false}>
        <Paper padding="xl" shadow="sm" radius="md" withBorder>
          <Title order={3}>About us</Title>
          <Grid gutter={20}>
            <Grid.Col md={6} lg={8}>
              <Space h="md" />
              <Text size="lg" align="justify">
                <span style={{ fontWeight: 700 }}>Host a refugee</span> is
                incididunt fugiat sint sunt eiusmod fugiat ad et est irure amet
                nostrud ad sunt. Pariatur do aute veniam eiusmod aliqua tempor
                enim mollit aliquip. Irure duis excepteur eu amet ad dolor duis
                consectetur est officia tempor minim minim. Nisi aliquip veniam
                occaecat laborum ea culpa. Dolore pariatur ullamco cillum id
                adipisicing ipsum laborum adipisicing.
              </Text>
              <Space h="md" />
              <Text size="lg" align="justify">
                Adipisicing commodo elit consectetur excepteur sunt dolore qui
                laborum exercitation. Elit excepteur anim incididunt adipisicing
                amet esse proident non sint. Veniam nulla incididunt dolor
                ullamco nostrud excepteur ut magna sint aute consequat. Aliqua
                occaecat duis id commodo ut exercitation mollit aliqua. Labore
                duis aliquip ad irure ea est Lorem est elit et id voluptate
                magna.
              </Text>
              <Space h="md" />
              <Text align="justify" color="gray">
                Irure tempor voluptate ex officia amet consectetur aliqua ea.
                Veniam irure anim duis reprehenderit officia sunt esse velit. Ut
                cupidatat eiusmod incididunt exercitation aliqua consequat velit
                mollit Lorem quis cillum nulla cillum dolor. Excepteur ea minim
                ex commodo.
              </Text>
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <Center>
                <Tooltip
                  label="&copy; Matti (https://www.pexels.com/@matti-121010384)"
                  position="bottom"
                  placement="center"
                  withArrow
                  arrowSize={3}
                >
                  <Image
                    radius="md"
                    src="stop_war.jpg"
                    alt="A Kid Protesting against the War in Ukraine"
                    withPlaceholder
                  />
                </Tooltip>
              </Center>
            </Grid.Col>
          </Grid>
        </Paper>
        <Space h="md" />
        <Paper padding="xl" shadow="sm" radius="md" withBorder>
          <Title order={3}>TechFor_Ukraine</Title>
          <Space h="md" />
          <Text size="lg" align="justify">
            We are part of an international team of people working to fuel and
            organize the creation of software aimed at helping the Ukrainian
            people during the current war with Russia. Our organization has
            developed technologies such as a missile/air alarm system, a website
            that encompasses information for Ukrainian refugees, and impending
            others.
          </Text>
          <Space h="md" />
          <Center>
            <Grid>
              {/* https://www.schemecolor.com/ukraine-flag-colors.php */}
              <Grid.Col span={6} gutter="xl">
                <a
                  href="https://twitter.com/TechFor_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon size={'3em'} color={'#005BBB'} />
                </a>
              </Grid.Col>
              <Grid.Col span={6}>
                <a
                  href="https://github.com/Ukraine-Relief-Efforts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon size={'3em'} color={'#FFD500'} />
                </a>
              </Grid.Col>
            </Grid>
          </Center>
        </Paper>
        <Space h="md" />
        <Paper padding="xl" shadow="sm" radius="md" withBorder>
          <Title order={3}>Our partners</Title>
          <Space h="md" />
          <PartnersTable data={partners} />
        </Paper>
      </Layout>
    </>
  );
}
