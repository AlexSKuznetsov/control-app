import axios, { AxiosError } from 'axios';
import { BACKEND_BASE_URL } from '../shared/constants';

type ProcessData = {
  id: string;
  deploymentTime: string;
  links: string[];
  source: string;
  tenantId: string | null;
  name: string | null;
};

export const getProcessList = async () => {
  try {
    const response = await axios.get<ProcessData[]>(
      `${BACKEND_BASE_URL}/deployment`
    );

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};
