import { useMutation } from '@tanstack/react-query';
import { startNewInstanceByProcessKey } from '../api/processApi';
import { toast } from 'react-toastify';

export const useStartNewProcessInstance = () => {
  const { mutate } = useMutation<
    any,
    Error,
    { processKey: string; variables?: string }
  >({
    mutationFn: ({ processKey, variables }) =>
      startNewInstanceByProcessKey(processKey, variables),
    onSuccess: (data) =>
      toast(
        <div className='text-sm'>
          Process instance has been started.
          <p className='text-xs'>{data.id}</p>
        </div>,
        { type: 'success', position: 'bottom-right', autoClose: 1000 }
      ),

    onError: () => toast('Something whent wrong', { type: 'warning' }),
  });

  return { mutate };
};
