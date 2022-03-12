import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { POSITION_STACK_URL, POSITION_STACK_API_KEY } from '../../config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { location } = req.body;

  // TODO: use CitiesData.ts to get the coordinates instead of using an external api
  switch (req.method) {
    case 'POST':
      try {
        const {
          data: { data },
        } = await axios({
          method: 'GET',
          url: encodeURI(
            `${POSITION_STACK_URL}forward?access_key=${POSITION_STACK_API_KEY}&query=${location}`
          ),
        });

        const { latitude, longitude } = data[0];

        console.log(data)

        return res.status(201).json({ latitude, longitude });
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
