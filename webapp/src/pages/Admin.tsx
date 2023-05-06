import { useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import * as Toast from '@radix-ui/react-toast';
import cn from 'classnames';
import {
  getProcessDefinition,
  startNewInstanceByProcessKey,
} from '../api/processApi';
import { QUERY_KEYS } from '../shared/constants';

export const AdminPage = () => {
  const {
    data: processDefinitionData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROCESS_DEFINITION],
    queryFn: getProcessDefinition,
  });

  const { mutate, isLoading: mutationLoading } = useMutation({
    mutationFn: startNewInstanceByProcessKey,
  });

  const startProcessInstance = useCallback((processKey: string) => {
    mutate(processKey);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  if (processDefinitionData?.length) {
    return (
      <Toast.Provider swipeDirection='right'>
        <div className='mt-4 mx-4'>
          <p className='text-lg font-sans mt-4'>Process definition: </p>

          {processDefinitionData?.map((process) => (
            <li key={process.id} className='my-1 text-sm'>
              name: {process.name ?? 'noname'} | key: {process.key} | version:{' '}
              {process.version}
              {process.key && (
                <button
                  disabled={mutationLoading}
                  className={cn(
                    'ml-2 h-8 px-2 font-semibold rounded-md bg-blue-700 text-white text-sm hover:bg-blue-500',
                    {
                      'bg-slate-400': mutationLoading,
                    }
                  )}
                  onClick={() => startProcessInstance(process.key as string)}
                >
                  start instance
                </button>
              )}
            </li>
          ))}
        </div>
      </Toast.Provider>
    );
  }

  return (
    <div className='font-bold text-md my-12 mx-6 bg-slate-100 inline-block p-2 rounded shadow'>
      <p> There are no processes uploaded to Caumunda Engine.</p>
      Please use{' '}
      <Link
        to={'https://camunda.com/download/modeler'}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-600 hover:underline'
      >
        Camunda modeler
      </Link>{' '}
      for uploading new process.
      <p className='text-sm font-normal mt-4'>
        Rest endpoint: http://localhost:8080/engine-rest
      </p>
    </div>
  );
};
