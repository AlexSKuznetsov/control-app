import axios, { AxiosError } from 'axios';
import { NOTIFICATION_SERVICE_BASE_URL } from '../shared/constants';

export const updateNotificationTopicName = async (newTopicName: string) => {
  try {
    const res = await axios.post(`${NOTIFICATION_SERVICE_BASE_URL}/topic`, {
      topicName: newTopicName,
    });

    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};
