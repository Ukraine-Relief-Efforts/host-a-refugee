import axios from 'axios';
import { AIRTABLE_API_KEY, AIRTABLE_URL } from '../../config';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cities } from '../../data/citiesData';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('Called with', req.body);
    const {
      name,
      userType,
      phoneNumber,
      email,
      city,
      accomodationDetails,
      groupSize,
      languages,
      dateStart,
      dateEnd,
      avatar,
    } = req.body;
    try {
		const { data: hosts } = await axios({
		method: 'GET',
		url: `${AIRTABLE_URL}/Hosts/?filterByFormula=%28%7BEmail%7D%20%3D%20%27${email}%27%29`,
		headers: {
		  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
		},
		});

		if(hosts.records.length > 0){
			throw 'Email address already exists as a Host';
		}	
	
		const response = await axios({
		method: 'POST',
		url: `${AIRTABLE_URL}/Hosts`,
		data: {
		  records: [
			{
			  fields: {
				name,
				userType,
				phoneNumber,
				email,
				city,
				accomodationDetails,
				groupSize,
				languages,
				dateStart,
				dateEnd,
				avatar,
				...cities[city as keyof typeof cities],
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
