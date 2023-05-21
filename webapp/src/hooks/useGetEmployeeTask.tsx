import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../shared/constants';
import { getEmployeeTasks } from '../api/processApi';
import { toast } from 'react-toastify';

export const useGetEmployeeTask = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_EMPLOYEE_TASKS],
    queryFn: getEmployeeTasks,
    onError: () => toast('Error loading task list', { type: 'warning' }),
  });

  return { data, isLoading };
};
