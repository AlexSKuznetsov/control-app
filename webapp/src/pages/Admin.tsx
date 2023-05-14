import { useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getProcessDefinition,
  startNewInstanceByProcessKey,
} from '../api/processApi';
import {
  PageLayout,
  ProcessDefinitionElement,
  NotificationSettings,
  UserSettings,
} from '../components';
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

  const { mutate } = useMutation({
    mutationFn: startNewInstanceByProcessKey,
    onSuccess: (data) =>
      toast(
        <div className='text-sm'>
          Process instance has been started.
          <p className='text-xs'>{data.id}</p>
        </div>,
        { type: 'success', position: 'bottom-right' }
      ),

    onError: () => toast('Something whent wrong', { type: 'warning' }),
  });

  const startProcessInstance = useCallback(
    (processKey: string) => {
      mutate(processKey);
    },
    [mutate, processDefinitionData]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  if (processDefinitionData?.length) {
    return (
      <PageLayout>
        <div className='grid grid-cols-2 grid-rows-2 gap-12'>
          <div className='m-2 p-4 border inline-block rounded shadow'>
            <p className='text-lg font-light mx-2 text-slate-600'>
              Deployed process list:
            </p>
            <div className='flex-col divide-y divide-slate-100'>
              {processDefinitionData?.map((process) => (
                <ProcessDefinitionElement
                  key={process.id}
                  processDefinition={process}
                  onButtonClick={startProcessInstance}
                />
              ))}
            </div>
          </div>
          <NotificationSettings />
          <UserSettings />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className='flex items-center justify-center h-full'>
        <div className='inline-block font-bold text-md my-12 mx-6 bg-slate-100 p-2 rounded shadow'>
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
      </div>
    </PageLayout>
  );
};
