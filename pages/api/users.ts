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

        const { data: created } = await axios({
          method: 'POST',
          url: `${AIRTABLE_URL}/Hosts`,
          data: {
            records: [
              {
                fields: {
                  name: req.body.name,
                  email: req.body.email,
                  country: req.body.country,
                  accomodationDetails: req.body.accomodationDetails,
                  groupSize: req.body.groupSize,
                  phoneNumber: req.body.phoneNumber,
                  languages: req.body.languages,
                  dateStart: req.body.dateStart,
                  dateEnd: req.body.dateEnd,
                  userType: req.body.userType,
                },
              },
            ],
            typecast: true,
          },
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        });
        return res.status(200).json({ created });

      case 'PATCH':
        const { id } = await getUserInfo(session);

        const { data: updated } = await axios({
          method: 'PATCH',
          url: `${AIRTABLE_URL}/Hosts`,
          data: {
            records: [
              {
                id,
                fields: {
                  name: req.body.name,
                  email: req.body.email,
                  country: req.body.country,
                  accomodationDetails: req.body.accomodationDetails,
                  groupSize: req.body.groupSize,
                  phoneNumber: req.body.phoneNumber,
                  languages: req.body.languages,
                  dateStart: req.body.dateStart,
                  dateEnd: req.body.dateEnd,
                  userType: req.body.userType,
                },
              },
            ],
            typecast: true,
          },
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        return res.status(200).json({ updated });

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
  'email',
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
