import { Container, Space, Title, Breadcrumbs, Anchor } from '@mantine/core';

export const Nav = () => (
  <>
    <Space h="xl" />
    <Container padding={0}>
      <Title order={1}>🇺🇦 Help Ukraine</Title>
      <Space h="lg" />
      <Breadcrumbs separator="|">
        {[
          { title: 'Home', href: 'http://localhost:3000/' },
          {
            title: 'Available places',
            href: 'http://localhost:3000/host-lookup',
          },
          { title: 'Become a host', href: 'http://localhost:3000/host-signup' },
        ].map((item, index) => (
          <Anchor key={index} href={item.href} >
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
    </Container>
  </>
);
