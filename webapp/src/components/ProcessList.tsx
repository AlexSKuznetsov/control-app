import { useCallback } from 'react';
import { NoProcessDefinition, ProcessDefinitionElement, Progress } from '.';
import { useProcessDefinition } from '../hooks/useProcessDefinition';
import { useStartNewProcessInstance } from '../hooks/useStartNewProcessInstance';

export const ProcessList = () => {
  const { processDefinitionData, isLoading, error } = useProcessDefinition();
  const { mutate } = useStartNewProcessInstance();

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
    return <Progress />;
  }

  if (error) {
    return <p>Error...</p>;
  }

  return (
    <div className='w=auto m-2 rounded border p-4 shadow'>
      <p className='mx-2 text-lg font-light text-slate-600'>
        Deployed process list:
      </p>
      {processDefinitionData && processDefinitionData?.length > 0 ? (
        <div className='flex-col divide-y divide-slate-200'>
          {processDefinitionData?.map((process) => (
            <ProcessDefinitionElement
              key={process.id}
              processDefinition={process}
              onButtonClick={startProcessInstance}
            />
          ))}
        </div>
      ) : (
        <NoProcessDefinition />
      )}
    </div>
  );
};
