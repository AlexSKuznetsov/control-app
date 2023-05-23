import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.DEV
  ? 'http://localhost:9001'
  : 'http://localhost:7001';

export const updateNotificationTopicName = async (newTopicName: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/topic`, {
      topicName: newTopicName,
    });

    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};
