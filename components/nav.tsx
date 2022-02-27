import Link from 'next/link';
import { Container, Space, Title, Breadcrumbs, Anchor } from '@mantine/core';

export const Nav = () => (
  <>
    <Space h="xl" />
    <Container padding={0}>
      <Title order={1}>🇺🇦 Help Ukraine</Title>
      <Space h="lg" />
      <Breadcrumbs separator="|">
        {[
          { title: 'Home', href: '/' },
          {
            title: 'Available places',
            href: '/host-lookup',
          },
          { title: 'Become a host', href: '/host-signup' },
        ].map((item, index) => (
          <Anchor key={index}>
            <Link href={item.href}>{item.title}</Link>
          </Anchor>
        ))}
      </Breadcrumbs>
    </Container>
  </>
);
