import { useState } from 'react';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import {
  Space,
  Paper,
  TextInput,
  Title,
  Button,
  Textarea,
  NumberInput,
  Checkbox,
  MultiSelect,
  Select,
} from '@mantine/core';
import { MdPhone, MdMap } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { DateRangePicker } from '@mantine/dates';

const languagesOptions = [
  { value: 'English', label: 'English' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Romanian', label: 'Romanian' },
  { value: 'German', label: 'German' },
  { value: 'Hungarian', label: 'Hungarian' },
];
export const SignupForm = () => {
  const { data: session } = useSession();
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);

  const form = useForm({
    initialValues: {
      userType: '',
      phoneNumber: '',
      cityRegion: '',
      accomodationDetails: '',
      groupSize: 1,
      languages: '',
      termsOfService: false,
    },
  });

  const onSubmitHandler = (values: typeof form['values']) => {
    console.log(values);
    axios({
      method: 'POST',
      url: '/api/users',
      data: {
        ...values,
        dateStart: value[0],
        dateEnd: value[1],
        name: session?.user?.name,
        email: session?.user?.email,
        avatar: session?.user?.image,
      },
    });
    form.reset();
  };
  return (
    <Paper padding="lg" shadow="sm" radius="md" withBorder>
      <Title order={3}>Register</Title>
      <Space h="lg" />

      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <Select
          {...form.getInputProps('userType')}
          label="Register type"
          placeholder="Refugee / Host"
          data={[
            { value: 'refugee', label: 'Refugee' },
            { value: 'host', label: 'Host' },
          ]}
          required
        />
        <Space h="lg" />

        <TextInput
          {...form.getInputProps('phoneNumber')}
          icon={<MdPhone />}
          placeholder="+03 123 456 789"
          label="Phone Number"
          required
        />
        <Space h="lg" />

        <TextInput
          {...form.getInputProps('cityRegion')}
          icon={<MdMap />}
          placeholder="City"
          label="City / Region Name"
          required
        />
        <Space h="lg" />

        <DateRangePicker
          label="Accomodation dates"
          placeholder="Pick dates range"
          value={value}
          onChange={setValue}
        />
        <Space h="lg" />

        <Textarea
          {...form.getInputProps('accomodationDetails')}
          placeholder="About the accomodation and Rules"
          label="Accomodation details"
        />
        <Space h="lg" />

        <NumberInput
          defaultValue={2}
          {...form.getInputProps('groupSize')}
          placeholder="Number of people"
          label="Number of people"
          required
        />
        <Space h="lg" />
        <MultiSelect
          {...form.getInputProps('languages')}
          data={languagesOptions}
          label="Spoken languages"
          placeholder="Pick the languages you can use"
        />
        <Space h="xl" />

        <Checkbox
          {...form.getInputProps('termsOfService')}
          label="I agree to the terms of service"
          required
        />
        <Space h="xl" />

        <Button type="submit" color="teal">
          Submit
        </Button>
      </form>
    </Paper>
  );
};
