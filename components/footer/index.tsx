import { useContext } from 'react';
import { Divider, Text, Anchor } from '@mantine/core';
import { LanguageContext } from '../../context';
import { languageOptions } from '../../models';
import { labels } from './content';

export const Footer = () => {
  const { language }: any = useContext(LanguageContext);
  return (
    <div style={{ marginTop: 'auto', padding: '1rem 0rem' }}>
      <Divider />
      <Text>{labels.createdTag[language as languageOptions]}</Text>
      <Anchor href="#">us</Anchor>
    </div>
  );
};
