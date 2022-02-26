import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Space,
  Paper,
  TextInput,
  Title,
  Button,
  Textarea,
  NumberInput,
} from '@mantine/core';
import { MdOutlineMailOutline, MdMap } from 'react-icons/md';
export const HostSignup = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  return (
    <>
      <Space h="xl" />
      <Paper padding="lg" shadow="sm" radius="md" withBorder>
        <Title order={3}>Register as a host</Title>
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
          <NumberInput
            {...register('capacity', { required: true })}
            defaultValue={1}
            placeholder="People capacity"
            label="People capacity"
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
