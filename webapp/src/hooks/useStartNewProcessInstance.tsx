import { useMutation, useQueryClient } from '@tanstack/react-query';
import { startNewInstanceByProcessKey } from '../api/processApi';
import { toast } from 'react-toastify';
import { QUERY_KEYS } from '../shared/constants';

export const useStartNewProcessInstance = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    any,
    Error,
    { processKey: string; variables?: string }
  >({
    mutationFn: ({ processKey, variables }) =>
      startNewInstanceByProcessKey(processKey, variables),
    onSuccess: (data) => {
      toast(
        <div className='text-sm'>
          Process instance has been started.
          <p className='text-xs'>{data.id}</p>
        </div>,
        { type: 'success', position: 'bottom-right', autoClose: 1000 }
      );
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EMPLOYEE_TASKS],
      });
    },

    onError: () => toast('Something whent wrong', { type: 'warning' }),
  });

  return { mutate };
};
