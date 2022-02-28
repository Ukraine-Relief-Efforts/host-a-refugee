import axios from 'axios';
import { getSession } from 'next-auth/react';
import { AIRTABLE_API_KEY, AIRTABLE_URL } from '../../config';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    switch (req.method) {
      case 'GET':
        const { data: user } = await axios({
          method: 'GET',
          url: `${AIRTABLE_URL}/Hosts?maxRecords=1&filterByFormula=%28%7Bemail%7D%20%3D%20%27${session?.user?.email}%27%29`,
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        });
        return res.status(200).json({ user: user.records[0]?.fields });

      case 'POST':
        const { termsOfService, ...rest } = req.body;
        const { data: created } = await axios({
          method: 'POST',
          url: AIRTABLE_URL,
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
