import axios from 'axios';
import { POSITION_STACK_URL, POSITION_STACK_API_KEY } from '../../config';

export async function getForwardGeocodingInfo(location: string): Promise<any> {
  try {
    const {
      data: { data },
    } = await axios({
      method: 'GET',
      url: `${POSITION_STACK_URL}forward?access_key=${POSITION_STACK_API_KEY}&query=${location}`,
    });

    const { latitude, longitude } = data[0];

    return { latitude, longitude };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
