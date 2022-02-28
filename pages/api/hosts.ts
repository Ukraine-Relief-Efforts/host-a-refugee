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
    console.log(session);

    switch (req.method) {
      case 'GET':
        const { data } = await axios.get(
          `${AIRTABLE_URL}/Hosts?api_key=${AIRTABLE_API_KEY}`
        );
        return res.status(200).json(data);

      case 'POST':
        const response = await axios({
          method: 'POST',
          url: AIRTABLE_URL,
          data: {
            records: [
              {
                fields: {
                  ...req.body,
                },
              },
            ],
            typecast: true,
          },
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        });
        return res.status(200).json({ created: response.data });

      default:
        res.status(404).json({ info: 'method not implemented' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
