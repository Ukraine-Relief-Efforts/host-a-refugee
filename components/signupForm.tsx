import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import {
  Space,
  Paper,
  Text,
  TextInput,
  Title,
  Button,
  Textarea,
  NumberInput,
  Checkbox,
  MultiSelect,
  Select,
  Group,
  LoadingOverlay,
} from '@mantine/core';
import { MdPhone } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { DateRangePicker } from '@mantine/dates';
import { citiesOptions } from '../data/citiesOptions';
import { Modal } from '.';

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
  const { push } = useRouter();
  const { data: session } = useSession();
  const [dates, setDates] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
      userType: (value) => !!value,
      phoneNumber: (value) => {
        var regEx = `^\\+?\\(?([0-9]{1,4})\\)?([-. ]?([0-9]{2}))?([-. ]?([0-9]{3}))([-. ]?([0-9]{2,3}))([-. ]?([0-9]{2,4}))$`;
        return !!value || value.match(regEx) !== null;
      },
      languages: (value) => !!value,
    },
    errorMessages: {
      userType: 'Please select your registration type',
      phoneNumber:
        'Please input a valid phone number and include the country code.',
      languages: 'Please select at least one language',
    },
  });

  const { userType } = form.values;

  const onSubmitHandler = async (values: typeof form['values']) => {
    setIsSubmitting(true);
    setError('');

    try {
      await axios({
        method: 'POST',
        url: '/api/users',
        data: {
          ...values,
          dateStart: dates[0],
          dateEnd: dates[1],
          name: session?.user?.name,
          email: session?.user?.email,
          avatar: session?.user?.image,
        },
      });
      setIsSuccess(true);
    } catch (error: any) {
      console.error(error.response);
      setError(error.response?.data?.error || error.message);
    }

    return setIsSubmitting(false);
  };

  const handleModalClose = () => {
    form.reset();
    setIsSuccess(false);
    return push('/');
  };

  return (
    <Paper padding="lg" shadow="sm" radius="md" withBorder>
      <Title order={3}>Register</Title>
      <Space h="lg" />

      <Modal
        opened={isSuccess}
        onClose={handleModalClose}
        title="Success!"
        message={`Your registration was successful${
          userType === 'host'
            ? ", we can't thank you enough for your support in these tough times 💗"
            : '.'
        } We're working on matching you with a ${
          userType === 'refugee' ? 'host' : 'refugee'
        } and will be in touch with you as soon as possible!`}
      />

      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <Group grow direction="column">
          <LoadingOverlay visible={isSubmitting} />
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
            label={
              userType === 'refugee'
                ? 'Destination country'
                : 'Country of residence'
            }
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
            label={
              userType === 'refugee' ? 'Destination city' : 'City of residence'
            }
            placeholder="City of ..."
            data={citiesOptions[
              form.values.country as keyof typeof citiesOptions
            ].map((city, index) => ({
              value: `${city}-${index}`,
              label: city,
            }))}
          />

          <DateRangePicker
            label="Accomodation dates"
            placeholder="Pick dates range"
            value={dates}
            onChange={setDates}
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
            label={
              userType === 'refugee'
                ? 'Number of people in your group'
                : 'Number of people you can accomodate'
            }
            required
          />

          <MultiSelect
            {...form.getInputProps('languages')}
            data={languagesOptions}
            label="Spoken languages"
            placeholder="Pick the languages you can use"
            required
          />

          <Checkbox
            {...form.getInputProps('termsOfService')}
            label="I agree to the terms of service"
            required
          />

          <Button type="submit" color="teal">
            Submit
          </Button>

          {error && (
            <Text color="red" size="sm">
              {error}
            </Text>
          )}
        </Group>
      </form>
    </Paper>
  );
};
