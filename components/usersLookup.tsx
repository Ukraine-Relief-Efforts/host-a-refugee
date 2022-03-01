import { Space, Paper, Title, Tabs } from '@mantine/core';
import { MdPersonSearch, MdHouse } from 'react-icons/md';
import { Table } from '.';
import { Host } from '../models';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), { ssr: false });

export const UsersLookup = ({ hosts, refugees }: HostLookupProps) => {
  return (
    <>
      <Space h="xl" />
      <Paper shadow="sm" radius="md" withBorder padding={0}>
        <Title order={3} style={{ padding: '1rem' }}>
          Registered people
        </Title>
        <Tabs grow>
          <Tabs.Tab label="Hosts" icon={<MdHouse />}>
            <Table data={hosts} />
            <Space h="xl" />
            <Map pins={hosts} />
          </Tabs.Tab>
          <Tabs.Tab label="Refugees" icon={<MdPersonSearch />}>
            <Table data={refugees} />
            <Space h="xl" />
            <Map pins={refugees} />
          </Tabs.Tab>
        </Tabs>
      </Paper>
      <Space h="xl" />
    </>
  );
};

type HostLookupProps = { hosts: Host[]; refugees: Host[] };
