import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Menu,
  Button,
  Center,
  Space,
  Title,
  Text,
  Breadcrumbs,
  Anchor,
  Avatar,
  MediaQuery,
  Group,
  Select,
} from '@mantine/core';
import { useSession, signOut } from 'next-auth/react';
import { SignInModal } from '../signInModal';
import { LanguageContext } from '../../context';
import { labels } from './content';

type languageOptions = 'eng' | 'ua' | 'pl' | 'ro' | 'sk' | 'de' | 'hu';

const routes = (lang: languageOptions) => [
  { title: labels.menuHome[lang], href: '/' },
  { title: labels.menuAbout[lang], href: '/about' },
];

const authButtonStyle: {} = {
  position: 'absolute',
  display: 'flex',
  right: 0,
  top: 0,
  alignContent: 'flex-end',
};

export const Nav = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const [opened, setOpened] = useState(false);
  const { language, setLanguage }: any = useContext(LanguageContext);

  return (
    <>
      <SignInModal opened={opened} onClose={() => setOpened(false)} />

      <Space h="xl" />
      <Group>
        <MediaQuery smallerThan={'md'} styles={{ fontSize: '1.2rem' }}>
          <Title order={1}>🇺🇦 Host a Refugee</Title>
        </MediaQuery>

        {session && session.user ? (
          <Menu
            trigger="hover"
            style={{ padding: '1rem' }}
            sx={authButtonStyle}
            placement="end"
            control={
              <Avatar
                size="lg"
                radius="xl"
                style={{ cursor: 'pointer' }}
                src={session.user!.image!}
              />
            }
          >
            <Menu.Item onClick={() => push('profile')}>My Profile</Menu.Item>
            <Menu.Item
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
            >
              Logout
            </Menu.Item>
          </Menu>
        ) : (
          <Button
            sx={authButtonStyle}
            size="md"
            onClick={() => setOpened(true)}
          >
            Sign In
          </Button>
        )}
      </Group>
      <Space h="lg" />
      <Center>
        <Breadcrumbs separator="|">
          {routes(language).map((item, index) => (
            <Anchor key={`${index}-${item}`} href={item.href}>
              <MediaQuery smallerThan={'md'} styles={{ fontSize: '0.9rem' }}>
                <Text color="blue" size="md">
                  {item.title}
                </Text>
              </MediaQuery>
            </Anchor>
          ))}
        </Breadcrumbs>
        <Space h="md" />
        <Select
          size="xs"
          title="Language"
          style={{ width: 100, paddingLeft: '1rem' }}
          placeholder="Website Language"
          onChange={setLanguage}
          value={language}
          data={[
            { value: 'eng', label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Eng' },
            { value: 'ua', label: '🇺🇦 Ua' },
            { value: 'ro', label: '🇷🇴 Ro' },
            { value: 'de', label: '🇩🇪 De' },
            { value: 'sk', label: '🇸🇰 Sk' },
            { value: 'pl', label: '🇵🇱 Pl' },
          ]}
        />
      </Center>
      <Space h="xl" />
    </>
  );
};
