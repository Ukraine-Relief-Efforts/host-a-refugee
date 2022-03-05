import { useState } from 'react';
import {
  Button,
  Group,
  Text,
  Code,
  Modal,
  Table as CoreTable,
  Avatar,
} from '@mantine/core';
import { MdOutlineHouse } from 'react-icons/md';
import { User } from '../models';

type TableProps = { data: User[] };

export const Table = ({ data }: TableProps) => {
  const [opened, setOpened] = useState(false);
  const [focused, setFocused] = useState<User>();

  const mapRows = data?.map((element) => (
    <tr key={element.id}>
      <td>{element.fields.country}</td>
      <td>
        from <Code>{element.fields.dateStart || 'null'}</Code> to{' '}
        <Code>{element.fields.dateStart || 'null'}</Code>
      </td>
      <td>{element.fields.groupSize}</td>
      <td>
        <Button
          variant="light"
          size="xs"
          onClick={() => {
            setOpened(true);
            setFocused(element);
          }}
          leftIcon={
            <MdOutlineHouse style={{ height: '1rem', width: '1rem' }} />
          }
        >
          Contact
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Group direction="column">
          <Avatar
            radius="xl"
            size="lg"
            src={focused?.fields.avatar}
            alt="it's me"
          />
          <Text>
            <b>Location:</b> {focused?.fields.country}
          </Text>
          <Text>
            <b>Name:</b> {focused?.fields.name}
          </Text>
          <Text>
            <b>Details:</b> {focused?.fields.accomodationDetails}
          </Text>
          <Text>
            <b>Languages: </b>
            {focused?.fields.languages}
          </Text>
          <Text>
            <b>Phone: </b>
            {focused?.fields.phoneNumber}
          </Text>
          <Text>
            <b>Email:</b> {focused?.fields.email}
          </Text>
          <Text>
            <b>Date:</b> {focused?.fields.dateStart} - {focused?.fields.dateEnd}
          </Text>
        </Group>
      </Modal>

      <div style={{ width: '100%', maxHeight: 500, overflow: 'auto' }}>
        <CoreTable striped horizontalSpacing={'xs'} verticalSpacing={'xs'}>
          <thead>
            <tr>
              <th>Location</th>
              <th>Dates</th>
              <th>Cap.</th>
              <th>Contact host</th>
            </tr>
          </thead>
          <tbody>{mapRows}</tbody>
        </CoreTable>
      </div>
    </>
  );
};
