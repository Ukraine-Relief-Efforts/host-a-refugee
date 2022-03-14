import { useContext } from 'react';
import Link from 'next/link';
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
import { labels } from './content';
import { LanguageContext } from '../../context';

const iconStyles: {} = { marginRight: '0.5em' };
type languageOptions = 'eng' | 'ua' | 'pl' | 'ro' | 'sk' | 'de' | 'hu';
export const AboutIndex = () => {
  const { language } = useContext(LanguageContext);

  return (
    <Paper padding="xl" shadow="sm" radius="md" withBorder>
      <Title order={3}>About us</Title>
      <Text size="lg" align="justify">
        {labels.aboutUs[language]}
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
              {labels.refugeeTitle[language]}
            </Text>
            <Space h="xs" />
            <Text size="lg" align="center">
              {labels.refugeeContent[language]}
            </Text>
          </Grid.Col>
          <Grid.Col sm={6}>
            <Center>
              <ShieldIcon size="2em" style={iconStyles} />
              <HelpIcon size="2em" style={iconStyles} />
              <ShelterIcon size="2em" />
            </Center>
            <Text size="lg" align="center" weight={700} underline>
              {labels.hostTilte[language]}
            </Text>
            <Space h="xs" />
            <Text size="lg" align="center">
              {labels.hostContent[language]}
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
