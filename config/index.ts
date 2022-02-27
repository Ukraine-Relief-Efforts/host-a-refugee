import { config } from 'dotenv';

config();

export const AIRTABLE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_APP_ID}/Hosts?maxRecords=50&view=Grid%20view`;
export const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;