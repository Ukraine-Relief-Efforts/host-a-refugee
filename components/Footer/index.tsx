import { useContext } from 'react';
import { Divider, Text, Anchor } from '@mantine/core';
import { LanguageContext } from '../../context';
import { labels } from './content';

export default function Footer() {
  const { language } = useContext(LanguageContext);
  return (
    <div style={{ marginTop: 'auto', padding: '1rem 0rem' }}>
      <Divider />
      <Text>{labels.createdTag[language]}</Text>
      <Anchor href="#">us</Anchor>
    </div>
  );
}
