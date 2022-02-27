import { useForm } from '@mantine/hooks';

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
import { MdOutlineMailOutline, MdMap, MdPhone } from 'react-icons/md';
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
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      cityRegion: '',
      accomodationDetails: '',
      hostCapacity: 0,
      languages: '',
      termsOfService: false,
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  const onSubmitHandler = (values: typeof form['values']) => {
    console.log(values);
    axios({ method: 'POST', url: '/api/host', data: values });
  };

  return (
    <>
      <Space h="sm" />
      <Paper padding="lg" shadow="sm" radius="md" withBorder>
        <Title order={3}>Find a host</Title>
        <Space h="lg" />

        <form onSubmit={form.onSubmit(onSubmitHandler)}>
          <TextInput
            {...form.getInputProps('firstName')}
            placeholder="First Name"
            label="First Name"
            required
          />
          <TextInput
            {...form.getInputProps('lastName')}
            placeholder="Last Name"
            label="Last Name"
            required
          />
          <TextInput
            {...form.getInputProps('phoneNumber')}
            icon={<MdPhone />}
            placeholder="+03 123 456 789"
            label="Phone Number"
            required
          />
          <TextInput
            {...form.getInputProps('email')}
            icon={<MdOutlineMailOutline />}
            placeholder="Email"
            label="Email address"
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
            defaultValue={1}
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
