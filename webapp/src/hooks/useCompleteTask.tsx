import { useMutation } from '@tanstack/react-query';
import { completeTask } from '../api/processApi';
import { toast } from 'react-toastify';

export const useCompleteTask = () => {
  const { mutate } = useMutation({
    mutationFn: completeTask,
    onError: () =>
      toast('Something whent wrong while completing task', { type: 'warning' }),
  });

  return { mutate };
};
