import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../shared/constants';
import { getProcessDefinition } from '../api/processApi';

export const useProcessDefinition = () => {
  const {
    data: processDefinitionData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROCESS_DEFINITION],
    queryFn: getProcessDefinition,
  });

  return { processDefinitionData, isLoading, error };
};
