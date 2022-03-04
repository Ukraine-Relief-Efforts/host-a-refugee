import { Table } from '@mantine/core';
import { Partner } from '../models';

type PartnerProps = { data: Partner[] };

export const PartnersTable = ({ data }: PartnerProps) => {
  const partnerRows = data?.map((partner) => (
    <tr key={partner.name}>
      <td>{partner.name}</td>
      <td>{partner.what}</td>
      <td>
        <a href={partner.operation} target="_blank" rel="noreferrer noopener">
          Link
        </a>
      </td>
      <td>
        <a href={partner.donation} target="_blank" rel="noreferrer noopener">
          Link
        </a>
      </td>
    </tr>
  ));

  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Table striped horizontalSpacing={'xs'} verticalSpacing={'xs'}>
        <thead>
          <tr>
            <th>Partner name</th>
            <th>What do they do?</th>
            <th>Dedicated operation</th>
            <th>Donation page</th>
          </tr>
        </thead>
        <tbody>{partnerRows}</tbody>
      </Table>
    </div>
  );
};
