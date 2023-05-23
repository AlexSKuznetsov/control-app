import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeTask } from '../api/processApi';
import { toast } from 'react-toastify';
import { QUERY_KEYS } from '../shared/constants';

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: completeTask,
    onError: () =>
      toast('Something whent wrong while completing task', { type: 'warning' }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EMPLOYEE_TASKS],
      }),
  });

  return { mutate };
};
