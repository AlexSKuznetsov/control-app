import { useCallback } from 'react';
import cn from 'classnames';
import { ProcessDefinition } from '../types/processDefinition';

type PropsType = {
  processDefinition: ProcessDefinition;
  onButtonClick: (processKey: string) => void;
};

export const ProcessDefinitionElement: React.FC<PropsType> = ({
  onButtonClick,
  processDefinition,
}) => {
  const onClick = useCallback(() => {
    onButtonClick(processDefinition.key as string);
  }, [processDefinition]);

  return (
    <div className='p-2'>
      <div className='flex items-center gap-12 justify-between'>
        <div>
          <h2 className='font-semibold text-slate-900'>
            {processDefinition.name ?? 'Noname'}
          </h2>
          <div className='flex gap-2 font-light text-slate-500 text-xs'>
            <div>
              <span>key: </span>
              <span>{processDefinition.key}</span>
            </div>
            <div>
              <span>version: </span>
              <span>{processDefinition.version}</span>
            </div>
            <div>
              <span>file: </span>
              <span>{processDefinition.resource}</span>
            </div>
          </div>
        </div>

        <button
          className={cn(
            'ml-2 h-8 px-3 rounded-md shadow text-blue-800 border border-blue-600 text-sm hover:bg-slate-100'
          )}
          onClick={onClick}
        >
          Manually start instance
        </button>
      </div>
    </div>
  );
};
