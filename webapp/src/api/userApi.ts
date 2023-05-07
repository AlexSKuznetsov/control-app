import axios, { AxiosError } from 'axios';
import { BACKEND_BASE_URL } from '../shared/constants';

type User = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
};

export const getUserList = async () => {
  try {
    const response = await axios.get<User[]>(
      `${BACKEND_BASE_URL}/users/user-list`
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};
