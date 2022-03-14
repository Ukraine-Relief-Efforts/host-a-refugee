import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import {
  Text,
  TextInput,
  Button,
  Textarea,
  NumberInput,
  Checkbox,
  MultiSelect,
  Select,
  Group,
  LoadingOverlay,
} from '@mantine/core';
import { Modal } from '..';
import { MdPhone } from 'react-icons/md';
import { DateRangePicker } from '@mantine/dates';
import { citiesOptions } from '../../data/citiesOptions';
import countryAbbrs from '../../data/countryAbbrs';
import { LanguageContext } from '../../context';
import { labels } from './content';

const languagesOptions = [
  { value: 'English', label: 'English' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Romanian', label: 'Romanian' },
  { value: 'German', label: 'German' },
  { value: 'Hungarian', label: 'Hungarian' },
];

interface SignupFormProps {
  initialValues: {
    userType: string;
    phoneNumber?: string;
    country: string;
    city?: string;
    accomodationDetails?: string;
    groupSize: number;
    languages: string | string[];
    termsOfService?: boolean;
  };
  method: 'POST' | 'PATCH';
  url: string;
}

export const SignupForm = ({ initialValues, method, url }: SignupFormProps) => {
  const { language } = useContext(LanguageContext);

  const { push } = useRouter();
  const { data: session } = useSession();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [dates, setDates] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);

  const form = useForm({
    initialValues,
    validationRules: {
      userType: (value) => !!value,
      phoneNumber: (value) => {
        const regEx = `^\\+?\\(?([0-9]{1,4})\\)?([-. ]?([0-9]{2}))?([-. ]?([0-9]{3}))([-. ]?([0-9]{2,3}))([-. ]?([0-9]{2,4}))$`;
        return !!value || value!.match(regEx) !== null;
      },
      languages: (value) => !!value,
      groupSize: (value) => value > 0,
    },
    errorMessages: {
      userType: labels.registerTypeError[language],
      phoneNumber: labels.phoneNumberError[language],
      languages: labels.languagesError[language],
    },
  });

  const { userType } = form.values;

  const handleModalClose = () => {
    form.reset();
    setIsSuccess(false);
    return push('/profile');
  };

  const retrieveLatLng = async (location: string): Promise<any> => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/api/location',
        data: {
          location,
        },
      });
      const { latitude, longitude } = data;
      return [latitude, longitude];
    } catch (error: any) {
      console.error(error);
    }
  };

  const onSubmitHandler = async (values: typeof form['values']) => {
    setIsSubmitting(true);
    setError('');

    try {
      const [lat, lng] = await retrieveLatLng(
        values.city || countryAbbrs[values.country]
      );

      const data = {
        ...values,
        dateStart: dates[0],
        dateEnd: dates[1],
        name: session?.user?.name,
        email: session?.user?.email,
        avatar: session?.user?.image,
        lat,
        lng,
      };

      await axios({
        method,
        url,
        data,
      });
      setIsSuccess(true);
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.error || error.message);
    }

    return setIsSubmitting(false);
  };

  return (
    <>
      <Modal
        opened={isSuccess}
        onClose={handleModalClose}
        title="Success!"
        message={
          userType === 'host'
            ? labels.modalMessageHost[language]
            : labels.modalMessageRefugee[language]
        }
      />

      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <Group grow direction="column">
          <LoadingOverlay visible={isSubmitting} />
          <Select
            {...form.getInputProps('userType')}
            label={labels.registerTypeLabel[language]}
            placeholder={labels.registerTypePlaceholder[language]}
            data={[
              { value: 'refugee', label: 'Refugee' },
              { value: 'host', label: 'Host' },
            ]}
            required
          />

          <TextInput
            {...form.getInputProps('phoneNumber')}
            icon={<MdPhone />}
            placeholder={labels.phoneNumberPlaceholder[language]}
            label={labels.phoneNumberLabel[language]}
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
            data={Object.entries(countryAbbrs).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
            required
          />

          <Select
            {...form.getInputProps('city')}
            searchable
            clearable
            maxDropdownHeight={250}
            nothingFound="No options"
            label={
              userType === 'refugee'
                ? labels.cityLabelRefugee[language]
                : labels.cityLabelHost[language]
            }
            placeholder={labels.cityPlaceholder[language]}
            data={citiesOptions[
              form.values.country as keyof typeof citiesOptions
            ].map((city, index) => ({
              value: `${city}-${index}`,
              label: city,
            }))}
          />

          <DateRangePicker
            label={labels.datesLabel[language]}
            placeholder={labels.datesPlaceholder[language]}
            value={dates}
            onChange={setDates}
          />

          <Textarea
            {...form.getInputProps('accomodationDetails')}
            placeholder={labels.detailsPlaceholder[language]}
            label={labels.detailsLabel[language]}
          />

          <NumberInput
            defaultValue={2}
            {...form.getInputProps('groupSize')}
            placeholder={labels.groupSizePlaceholder[language]}
            label={
              userType === 'refugee'
                ? labels.groupSizeLabelRefugee[language]
                : labels.groupSizeLabelHost[language]
            }
            min={1}
            required
          />

          <MultiSelect
            {...form.getInputProps('languages')}
            data={languagesOptions}
            label={labels.languagesLabel[language]}
            placeholder={labels.languagesPlaceholder[language]}
            required
          />

          {method === 'POST' && (
            <Checkbox
              {...form.getInputProps('termsOfService')}
              label={labels.tosLabel[language]}
              required
            />
          )}

          <Button type="submit" color="teal">
            {labels.buttonText[language]}
          </Button>

          {error && (
            <Text color="red" size="sm">
              {error}
            </Text>
          )}
        </Group>
      </form>
    </>
  );
};
