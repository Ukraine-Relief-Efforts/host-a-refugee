import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Space,
  Paper,
  TextInput,
  Title,
  Button,
  Textarea,
  Table,
  ActionIcon,
} from '@mantine/core';
import { MdOutlineMailOutline, MdMap, MdOutlineHouse } from 'react-icons/md';

export const HostLookup = ({ hosts }: HostLookupProps) => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  const rows = hosts?.map((element) => (
    <tr key={element.fields.firstName}>
      <td>{element.fields.cityRegion}</td>
      <td>
        {element.fields.firstName} {element.fields.lastName}
      </td>
      <td>{element.fields.hostCapacity}</td>
      <td>
        <Button variant="light" size="xs">
          <MdOutlineHouse style={{ height: '1rem', width: '1rem' }} />
          Contact
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Space h="xl" />
      <Paper shadow="sm" radius="md" withBorder padding={0}>
        <Title order={3} style={{ padding: '1rem' }}>
          Available hosts
        </Title>
        <div style={{ width: '100%', maxHeight: 500, overflow: 'auto' }}>
          <Table striped horizontalSpacing={5}>
            <thead>
              <tr>
                <th>Location</th>
                <th>Name</th>
                <th>Cap.</th>
                <th>Contact host</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </Paper>
      <Space h="xl" />

      <Paper padding="lg" shadow="sm" radius="md" withBorder>
        <Title order={3}>Find a host</Title>
        <Space h="lg" />

        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <TextInput
            {...register('firstName', { required: true })}
            placeholder="First Name"
            label="First Name"
            required
          />
          <TextInput
            {...register('lastName', { required: true })}
            placeholder="Last Name"
            label="Last Name"
            required
          />
          <TextInput
            {...register('email', { required: true })}
            icon={<MdOutlineMailOutline />}
            placeholder="Email"
            label="Email address"
            required
          />
          <TextInput
            {...register('location', { required: true })}
            icon={<MdMap />}
            placeholder="City"
            label="City / Region Name"
            required
          />
          <Textarea
            {...register('aboutHost')}
            placeholder="About the accomodation and Rules"
            label="Accomodation details"
          />

          <p>{data}</p>
          <Button type="submit" color="teal">
            Submit
          </Button>
        </form>
      </Paper>
      <Space h="xl" />
    </>
  );
};

type Host = {
  id: string;
  fields: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    cityRegion: string;
    accomodationDetails: string;
    hostCapacity: number;
  };
  createdTime: string;
};

type HostLookupProps = { hosts: Host[] };
