import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../shared/constants';
import { getSitesList } from '../api/sitesApi';

export const useSitesList = () => {
  const {
    data: siteList,
    isLoading,
    error,
  } = useQuery({
    queryFn: getSitesList,
    queryKey: [QUERY_KEYS.GET_SITES_LIST],
  });

  return { siteList, isLoading, error };
};
