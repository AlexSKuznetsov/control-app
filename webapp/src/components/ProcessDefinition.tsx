import { useCallback, useState } from 'react';
import { SimpleDialog } from './StartProcessDialog';
import { ProcessDefinition } from '../types/processDefinition';
import { Button } from '@mui/material';

type PropsType = {
  processDefinition: ProcessDefinition;
  onButtonClick: (processKey: string) => void;
};

export const ProcessDefinitionElement: React.FC<PropsType> = ({
  onButtonClick,
  processDefinition,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

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

        <Button variant='contained' onClick={handleClickOpen}>
          Start instance
        </Button>
      </div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        onClick={onClick}
      />
    </div>
  );
};
