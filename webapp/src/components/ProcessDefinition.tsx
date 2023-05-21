import { useState, useCallback } from 'react';
import { StartProcessDialog } from './StartProcessDialog';
import { ProcessDefinition } from '../types/processDefinition';
import { Button } from '@mui/material';

type PropsType = {
  processDefinition: ProcessDefinition;
  onButtonClick: (
    processKey: string,
    sites: string,
    startType: 'manual' | 'auto',
    adHocDescription: string
  ) => void;
};

export const ProcessDefinitionElement: React.FC<PropsType> = ({
  onButtonClick,
  processDefinition,
}) => {
  const [open, setOpen] = useState(false);
  const [site, setSite] = useState('');
  const [adHocDescription, setAdHocDescription] = useState('');
  const [fullSiteList, setFullSiteList] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClearState = () => {
    setSite('');
    setAdHocDescription('');
  };

  const handleClose = useCallback(
    (startType: 'manual' | 'auto') => {
      onButtonClick(
        processDefinition.key as string,
        startType === 'manual' ? site : fullSiteList,
        startType,
        adHocDescription
      );

      setOpen(false);
      handleClearState();
    },
    [site, processDefinition, onButtonClick, adHocDescription, handleClearState]
  );

  return (
    <div className='p-2'>
      <div className='flex items-center justify-between gap-12'>
        <div>
          <h2 className='font-semibold text-slate-900'>
            {processDefinition.name ?? 'Noname'}
          </h2>
          <div className='flex gap-2 text-xs font-light text-slate-500'>
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

        <Button variant='contained' onClick={handleClickOpen} size='small'>
          Start instance
        </Button>
      </div>
      <StartProcessDialog
        site={site}
        open={open}
        setOpen={setOpen}
        onClose={handleClose}
        setSite={setSite}
        adHocDescription={adHocDescription}
        setAdHocDescription={setAdHocDescription}
        setFullSiteList={setFullSiteList}
      />
    </div>
  );
};
