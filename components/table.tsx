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
import { RangeCalendar } from '@mantine/dates';
import { MdOutlineHouse } from 'react-icons/md';
import { User } from '../models';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), { ssr: false });

type TableProps = { data: User[]; type: string };

export const Table = ({ data, type }: TableProps) => {
  const [opened, setOpened] = useState(false);
  const [focused, setFocused] = useState<User | null>();
  const [value, setValue] = useState<[Date, Date]>([new Date(), new Date()]);

  const mapRows = data?.map((element) => {
    const {
      id,
      fields: { country, city, dateStart, dateEnd, groupSize },
    } = element;
    return (
      <tr key={id}>
        <td>
          {country || city ? (
            <>
              {city} {country}
            </>
          ) : (
            '-'
          )}
        </td>
        <td>
          {dateStart && dateEnd ? (
            <>
              From <Code>{dateStart}</Code> to <Code>{dateEnd}</Code>
            </>
          ) : (
            'Flexible'
          )}
        </td>
        <td>{groupSize}</td>
        <td>
          <Button
            variant="light"
            size="xs"
            onClick={() => {
              const {
                fields: { dateStart, dateEnd },
              } = element;
              const start: Date = dateStart ? new Date(dateStart) : new Date();
              const end: Date = dateEnd ? new Date(dateEnd) : new Date();
              setValue([start, end]);
              setOpened(true);
              setFocused(element);
            }}
            leftIcon={
              <MdOutlineHouse style={{ height: '1rem', width: '1rem' }} />
            }
          >
            Info
          </Button>
        </td>
      </tr>
    );
  });

  const renderModal = () => {
    if (!focused) return null;

    const {
      fields: {
        avatar,
        city,
        country,
        lat,
        lng,
        accomodationDetails,
        languages,
        dateStart,
        dateEnd,
      },
    } = focused;

    return (
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setFocused(null);
          setValue([new Date(), new Date()]);
        }}
      >
        <Group direction="column">
          <Avatar radius="xl" size="lg" src={avatar} alt="it's me" />
          <Text>
            <b>Location:</b> {city} {country}
          </Text>
          {lat && lng && <Map pin={{ lat, lng, city, country }} />}
          <Text>
            <b>Details:</b> {accomodationDetails}
          </Text>
          <Text>
            <b>Languages: </b>
            {languages ? (
              <ul>
                {languages.map((language, index) => {
                  return <li key={`${language}${index}`}>{language}</li>;
                })}
              </ul>
            ) : (
              <ul>Unspecified</ul>
            )}
          </Text>
          {dateStart && dateEnd && (
            <>
              <Text>
                <b>Date:</b> {dateStart} to {dateEnd}
              </Text>
              <RangeCalendar
                initialMonth={new Date(dateStart)}
                value={value}
                onChange={() => void 0}
              />
            </>
          )}
        </Group>
      </Modal>
    );
  };

  return (
    <>
      {renderModal()}
      <div style={{ width: '100%', maxHeight: 500, overflow: 'auto' }}>
        <CoreTable striped horizontalSpacing={'xs'} verticalSpacing={'xs'}>
          <thead>
            <tr>
              <th>Location</th>
              <th>Dates</th>
              <th>People</th>
              <th>About {type}</th>
            </tr>
          </thead>
          <tbody>{mapRows}</tbody>
        </CoreTable>
      </div>
    </>
  );
};
