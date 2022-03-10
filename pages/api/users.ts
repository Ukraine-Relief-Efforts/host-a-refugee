import axios from 'axios';
import { AIRTABLE_API_KEY, AIRTABLE_URL } from '../../config';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { filterByFormula } from '../../utils';

export async function getAllUsers() {
  try {
    const { data: refugees } = await axios({
      method: 'GET',
      url: `${AIRTABLE_URL}/Hosts?${filterByFormula('userType', 'refugee')}`,
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    const { data: hosts } = await axios({
      method: 'GET',
      url: `${AIRTABLE_URL}/Hosts?${filterByFormula('userType', 'host')}`,
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    return { hosts, refugees };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getUserInfo(session: Session | null): Promise<any> {
  try {
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
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    const {
      query: { profile },
    } = req;

    switch (req.method) {
      case 'GET':
        if (!!profile) {
          const user = await getUserInfo(session);
          return res.status(200).json({ user });
        } else {
          const { hosts, refugees } = await getAllUsers();
          res.setHeader(
            'Cache-Control',
            'public, s-maxage=120, stale-while-revalidate=59'
          );
          return res.status(200).json({ hosts, refugees });
        }

      case 'POST':
        const user = await getUserInfo(session);
        if (!!user) {
          return res.status(400).json({
            error: 'User profile with this email already exists!',
          });
        }

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

      case 'PUT':
        for (const key in req.body) {
          if (!allowedUpdates.includes(key)) throw new Error('Invalid update!');
        }

        const { data: updated } = await axios({
          method: 'PUT',
          url: `${AIRTABLE_URL}/Hosts`,
          data: {
            records: [
              {
                fields: req.body,
              },
            ],
            typecast: true,
          },
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        });
        return res.status(200).json({ updated });

      // case 'DELETE':
      //   const { data: deleted } = await axios({
      //     method: 'DELETE',
      //     url: `${AIRTABLE_URL}/Hosts/`,

      default:
        res.status(404).json({ info: 'method not implemented' });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}

const allowedUpdates = [
  'name',
  'userType',
  'phoneNumber',
  'country',
  'city',
  'accomodationDetails',
  'groupSize',
  'languages',
  'dateStart',
  'dateEnd',
];
