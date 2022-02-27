import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Space } from '@mantine/core';
export const HostSignup = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  return (
    <>
      <Space h="sm" />
      <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/shrGJ9QFefvxi47xL?backgroundColor=yellow"
        frameBorder="0"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          display: 'block',
        }}
      ></iframe>
    </>
  );
};
