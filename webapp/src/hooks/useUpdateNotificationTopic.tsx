import { useMutation } from '@tanstack/react-query';
import { updateNotificationTopicName } from '../api/notificationApi';
import { toast } from 'react-toastify';

export const useUpdateNotificationTopic = () => {
  const { mutate } = useMutation({
    mutationFn: updateNotificationTopicName,
    onError: () =>
      toast('Something whent wrong while updating topic name', {
        type: 'warning',
      }),
    onSuccess: () =>
      toast('Topic name was updated', {
        type: 'success',
        position: 'bottom-right',
        autoClose: 1000,
      }),
  });

  return { mutate };
};
