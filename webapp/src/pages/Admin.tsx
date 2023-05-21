import { useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
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
  NoProcessDefinition,
  Progress,
  SiteList,
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

  const startProcessInstance = useCallback(
    (
      processKey: string,
      sites: string,
      startType: 'manual' | 'auto',
      adHocDescription: string
    ) => {
      mutate({
        processKey,
        variables: JSON.stringify({
          siteList: { value: sites, type: 'String' },
          startEventType: { value: startType, type: 'String' },
          adHocDescription: { value: adHocDescription, type: 'String' },
        }),
      });
    },
    [mutate, processDefinitionData]
  );

  if (isLoading) {
    return (
      <PageLayout>
        <Progress />
      </PageLayout>
    );
  }

  if (error) {
    return <p>Error...</p>;
  }

  if (processDefinitionData?.length) {
    return (
      <PageLayout>
        <div className='grid grid-cols-2 grid-rows-2 gap-1'>
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
          <div className='m-2 p-4 border inline-block rounded shadow'>
            <p className='text-lg font-light mx-2 text-slate-600'>Site list:</p>
            <SiteList />
          </div>
        </div>
      </PageLayout>
    );
  }

  return <NoProcessDefinition />;
};
