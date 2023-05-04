import { useQuery } from '@tanstack/react-query';
import { getProcessList } from '../api/processApi';
import { QUERY_KEYS } from '../shared/constants';

export const AdminPage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROCESSES],
    queryFn: getProcessList,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  if (data) {
    return (
      <div className='mt-4 mx-4'>
        <p className='text-lg'>List of available processes: </p>

        {data.map((el) => (
          <li key={el.id}>{el?.name || 'noname'}</li>
        ))}
      </div>
    );
  }

  return null;
};
