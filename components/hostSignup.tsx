import { useRouter } from 'next/router';
import { useForm } from '@mantine/hooks';
import { useSession } from 'next-auth/react';

import {
  Space,
  Paper,
  Title,
  TextInput,
  Textarea,
  Button,
  NumberInput,
  MultiSelect,
  Checkbox,
} from '@mantine/core';
import { MdMap, MdPhone } from 'react-icons/md';
import axios from 'axios';

const languagesOptions = [
  { value: 'English', label: 'English' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Romanian', label: 'Romanian' },
  { value: 'German', label: 'German' },
  { value: 'Hungarian', label: 'Hungarian' },
];

export const HostSignup = () => {
  const { data: session } = useSession();
  const { reload } = useRouter();

  const form = useForm({
    initialValues: {
      phoneNumber: '',
      cityRegion: '',
      accomodationDetails: '',
      hostCapacity: 1,
      languages: '',
      termsOfService: false,
    },
  });

  const onSubmitHandler = (values: typeof form['values']) => {
    axios({
      method: 'POST',
      url: '/api/hosts',
      data: {
        ...values,
        name: session?.user?.name,
        email: session?.user?.email,
      },
    });
    return reload();
  };

  return (
    <>
      <Space h="sm" />
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
          <Textarea
            {...form.getInputProps('accomodationDetails')}
            placeholder="About the accomodation and Rules"
            label="Accomodation details"
          />
          <NumberInput
            defaultValue={2}
            {...form.getInputProps('hostCapacity')}
            placeholder="Number of people"
            label="Host capacity"
            required
          />
          <MultiSelect
            {...form.getInputProps('languages')}
            data={languagesOptions}
            label="Spoken languages"
            placeholder="Pick all that you like"
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
    </>
  );
};
