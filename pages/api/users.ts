import axios from 'axios';
import { AIRTABLE_API_KEY, AIRTABLE_URL } from '../../config';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { filterByFormula } from '../../utils';

export async function getUserInfo(session: Session | null): Promise<any> {
  const { data } = await axios({
    method: 'GET',
    url: `${AIRTABLE_URL}/Hosts?maxRecords=1&${filterByFormula(
      'email',
      session!.user!.email!
    )}`,
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  return data.records[0];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    switch (req.method) {
      case 'GET':
        const user = await getUserInfo(session);
        return res.status(200).json({ user: user.records[0]?.fields });

      case 'POST':
        const { termsOfService, ...rest } = req.body;
        const { data: created } = await axios({
          method: 'POST',
          url: `${AIRTABLE_URL}/Hosts`,
          data: {
            records: [
              {
                fields: rest,
              },
            ],
            typecast: true,
          },
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        });
        return res.status(200).json({ created });

      default:
        res.status(404).json({ info: 'method not implemented' });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
