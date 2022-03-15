import { useContext } from 'react';
import { Space, Paper, Title, Tabs } from '@mantine/core';
import { MdPersonSearch, MdHouse } from 'react-icons/md';
import { Table } from '..';
import { User } from '../../models';
import dynamic from 'next/dynamic';
import { LanguageContext } from '../../context';
import { labels } from './content';
const Map = dynamic(() => import('../Map'), { ssr: false });

type HostLookupProps = { hosts: User[]; refugees: User[] };

export default function UsersLookup({ hosts, refugees }: HostLookupProps) {
  const { language } = useContext(LanguageContext);

  return (
    <>
      <Space h="xl" />
      <Paper shadow="sm" radius="md" withBorder padding={0}>
        <Title order={3} style={{ padding: '1rem' }}>
          {labels.title[language]}
        </Title>
        <Tabs grow>
          <Tabs.Tab label="Hosts" icon={<MdHouse />}>
            <Table data={hosts} type="host" />
            <Space h="xl" />
            <Map pins={hosts} />
          </Tabs.Tab>
          <Tabs.Tab label="Refugees" icon={<MdPersonSearch />}>
            <Table data={refugees} type="refugee" />
            <Space h="xl" />
            <Map pins={refugees} />
          </Tabs.Tab>
        </Tabs>
      </Paper>
      <Space h="xl" />
    </>
  );
}
