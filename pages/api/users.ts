import axios from 'axios';
import { AIRTABLE_API_KEY, AIRTABLE_URL } from '../../config';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { filterByFormula } from '../../utils';
import { User } from '../../models/index';

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

    const removeSensitiveData = (obj: { records: User[] }) => {
      const result = { records: [] as User[] };
      result.records = obj.records.map((user: User) => {
        const { id, createdTime } = user;
        const { name, phoneNumber, email, ...objWithoutSensitiveData } =
          user.fields;
        return { id, fields: { ...objWithoutSensitiveData }, createdTime };
      });
      return result;
    };

    const hostsWithoutSensitiveData = removeSensitiveData(hosts);
    const refugeesWithoutSensitiveData = removeSensitiveData(refugees);

    return {
      hosts: hostsWithoutSensitiveData,
      refugees: refugeesWithoutSensitiveData,
    };
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

    const fields = {
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      country: req.body.country,
      accomodationDetails: req.body.accomodationDetails,
      groupSize: req.body.groupSize,
      phoneNumber: req.body.phoneNumber,
      languages: req.body.languages,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      userType: req.body.userType,
    };

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
                fields,
              },
            ],
            typecast: true,
          },
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        return res.status(200).json({ created });

      case 'PATCH':
        const { data: updated } = await axios({
          method: 'PATCH',
          url: `${AIRTABLE_URL}/Hosts`,
          data: {
            records: [
              {
                id: await getUserInfo(session).then((user) => user.id),
                fields,
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

      case 'DELETE':
        await axios({
          method: 'DELETE',
          url: `${AIRTABLE_URL}/Hosts/${await getUserInfo(session).then(
            (user) => user.id
          )}`,
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        return res
          .status(204)
          .json({ message: 'Profile successfully deleted' });

      default:
        res.status(404).json({ info: 'method not implemented' });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
