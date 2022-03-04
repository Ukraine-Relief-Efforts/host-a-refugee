import {
  Space,
  Paper,
  Text,
  Title,
  Grid,
  Center,
  Tooltip,
} from '@mantine/core';
import { CgMore as MoreIcon } from 'react-icons/cg';
import { GiCarpetBombing as BombIcon } from 'react-icons/gi';
import { GrRun as RunIcon } from 'react-icons/gr';
import { FaCity as CityIcon, FaHandsHelping as HelpIcon } from 'react-icons/fa';
import { MdOutlineNightShelter as ShelterIcon } from 'react-icons/md';
import { BsShieldCheck as ShieldIcon } from 'react-icons/bs';
import Link from 'next/link';

const iconStyles: {} = { marginRight: '0.5em' };

export const AboutIndex = () => {
  return (
    <Paper padding="xl" shadow="sm" radius="md" withBorder>
      <Title order={3}>About us</Title>
      <Text size="lg" align="justify">
        Host a refugee is a website dedicated to helping the refugees fleeing
        ukraine.
      </Text>
      <Space h="xl" />
      <Center>
        <Grid gutter="xl">
          <Grid.Col sm={6}>
            <Center>
              <BombIcon size="2em" style={iconStyles} />
              <CityIcon size="2em" style={iconStyles} />{' '}
              <RunIcon size="1.5em" />
            </Center>
            <Text size="lg" align="center" weight={700} underline>
              If you are a refugee:
            </Text>
            <Space h="xs" />
            <Text size="lg" align="center">
              Browse through the available hosts. Please be mindful of the
              capacity of your host concerning the amount of people, and the
              available dates. You can then contact a potential host directly
            </Text>
          </Grid.Col>
          <Grid.Col sm={6}>
            <Center>
              <ShieldIcon size="2em" style={iconStyles} />
              <HelpIcon size="2em" style={iconStyles} />
              <ShelterIcon size="2em" />
            </Center>
            <Text size="lg" align="center" weight={700} underline>
              If you can host:
            </Text>
            <Space h="xs" />
            <Text size="lg" align="center">
              Please register and become a host. We will ask you where, for how
              long, and how many people you can host. Refugees will then be able
              to contact you directly to arrange a hosting
            </Text>
          </Grid.Col>
        </Grid>
      </Center>
      <Space h="md" />
      <Text align="right">
        <Tooltip
          withArrow
          transition="fade"
          transitionDuration={200}
          label="Learn more"
          position="bottom"
          placement="center"
        >
          <Link href="/about" passHref>
            <a style={{ color: 'black' }}>
              <MoreIcon style={{ cursor: 'pointer' }} />
            </a>
          </Link>
        </Tooltip>
      </Text>
    </Paper>
  );
};
