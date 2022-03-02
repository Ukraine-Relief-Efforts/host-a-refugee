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
  Group,
} from '@mantine/core';
import { MdPhone, MdMap } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { DateRangePicker } from '@mantine/dates';
import { citiesOptions } from '../citiesOptions';

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
      country: 'PL',
      city: '',
      accomodationDetails: '',
      groupSize: 1,
      languages: '',
      termsOfService: false,
    },
    validationRules: {
      phoneNumber: (value) => {
        var regEx = `^\\+?\\(?([0-9]{1,4})\\)?([-. ]?([0-9]{2}))?([-. ]?([0-9]{3}))([-. ]?([0-9]{2,3}))([-. ]?([0-9]{2,4}))$`;
        return value.match(regEx) !== null;
      },
    },
    errorMessages: {
      phoneNumber:
        'Please input a valid phone number and include the country code.',
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
        <Group grow direction="column">
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

          <TextInput
            {...form.getInputProps('phoneNumber')}
            icon={<MdPhone />}
            placeholder="+03 123 456 789"
            label="Phone Number"
            required
          />

          <Select
            {...form.getInputProps('country')}
            label="Country"
            placeholder="Refugee / Host"
            data={[
              { value: 'HU', label: 'Hungary' },
              { value: 'UA', label: 'Ukraine' },
              { value: 'MD', label: 'Moldova' },
              { value: 'PL', label: 'Poland' },
              { value: 'RO', label: 'Romania' },
            ]}
            required
          />

          <Select
            {...form.getInputProps('city')}
            searchable
            clearable
            maxDropdownHeight={250}
            nothingFound="No options"
            label="City"
            placeholder="City of ..."
            data={citiesOptions[
              form.values.country as keyof typeof citiesOptions
            ].map((city) => ({
              value: city,
              label: city,
            }))}
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
          <MultiSelect
            {...form.getInputProps('languages')}
            data={languagesOptions}
            label="Spoken languages"
            placeholder="Pick the languages you can use"
          />

          <Checkbox
            {...form.getInputProps('termsOfService')}
            label="I agree to the terms of service"
            required
          />

          <Button type="submit" color="teal">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
