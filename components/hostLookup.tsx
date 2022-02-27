import { useState } from 'react';
import {
  Space,
  Paper,
  TextInput,
  Title,
  Button,
  Textarea,
  Table,
  ActionIcon,
  NumberInput,
  Checkbox,
} from '@mantine/core';
import { MdPhone, MdMap, MdOutlineHouse } from 'react-icons/md';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { DateRangePicker } from '@mantine/dates';

export const HostLookup = ({ hosts }: HostLookupProps) => {
  const { data: session } = useSession();
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);

  const form = useForm({
    initialValues: {
      phoneNumber: '',
      cityRegion: '',
      accomodationDetails: '',
      groupSize: 1,
      termsOfService: false,
    },
  });

  const onSubmitHandler = (values: typeof form['values']) => {
    console.log(values);
    axios({
      method: 'POST',
      url: '/api/seekers',
      data: {
        ...values,
        dateStart: value[0],
        dateEnd: value[1],
        name: session?.user?.name,
        email: session?.user?.email,
      },
    });
    form.reset();
  };

  const rows = hosts?.map((element) => (
    <tr key={element.fields.name}>
      <td>{element.fields.cityRegion}</td>
      <td>{element.fields.name}</td>
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

        <form onSubmit={form.onSubmit(onSubmitHandler)}>
          <TextInput
            {...form.getInputProps('phoneNumber')}
            icon={<MdPhone />}
            placeholder="+03 123 456 789"
            label="Phone Number"
            required
          />
          <TextInput
            {...form.getInputProps('cityRegion')}
            icon={<MdMap />}
            placeholder="City"
            label="City / Region Name"
            required
          />
          <DateRangePicker
            label="Accomodation dates"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
          />
          <Textarea
            {...form.getInputProps('accomodationDetails')}
            placeholder="About the accomodation and Rules"
            label="Accomodation details"
          />
          <NumberInput
            defaultValue={2}
            {...form.getInputProps('groupSize')}
            placeholder="Number of people"
            label="Number of people"
            required
          />
          <Space h="lg" />
          <Checkbox
            {...form.getInputProps('termsOfService')}
            label="I agree to sell my privacy"
            required
          />
          <Space h="xl" />

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
    name: string;
    phoneNumber: string;
    email: string;
    cityRegion: string;
    accomodationDetails: string;
    hostCapacity: number;
  };
  createdTime: string;
};

type HostLookupProps = { hosts: Host[] };
