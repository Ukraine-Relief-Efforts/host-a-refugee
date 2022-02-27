import axios from 'axios';
import { AIRTABLE_API_KEY, AIRTABLE_URL } from '../../config';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('Called with', req.body);
    const {
      name,
      phoneNumber,
      email,
      cityRegion,
      accomodationDetails,
      groupSize,
      dateStart,
      dateEnd,
    } = req.body;
    try {
      const response = await axios({
        method: 'POST',
        url: `${AIRTABLE_URL}/Seekers`,
        data: {
          records: [
            {
              fields: {
                name,
                phoneNumber,
                email,
                cityRegion,
                accomodationDetails,
                groupSize,
                dateStart,
                dateEnd,
              },
            },
          ],
          typecast: true,
        },
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
      });
      res.status(200).json({ created: response.data });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(404).json({ info: 'method not implemented' });
  }
};

export default handler;
