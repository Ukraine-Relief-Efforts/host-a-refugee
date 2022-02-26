import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import {
  Space,
  Paper,
  TextInput,
  Title,
  Button,
  Textarea,
  Table,
} from '@mantine/core';
import { MdOutlineMailOutline, MdMap } from 'react-icons/md';
import { dummyData } from '../dummyData';

export const HostLookup = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  const rows = dummyData.map((element) => (
    <tr key={element.name}>
      <td>{element.location}</td>
      <td>{element.name}</td>
      <td>{element.capacity}</td>
      <td>
        <Link href={element.url}>{element.url}</Link>
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

        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Learn more</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
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
