import axios, { AxiosError } from 'axios';
import { BACKEND_BASE_URL } from '../shared/constants';

export const getSitesList = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/sites/get-sites`);

    return response.data as string[];
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};
