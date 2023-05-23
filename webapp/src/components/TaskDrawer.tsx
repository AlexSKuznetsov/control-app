import {
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { Task } from '../api/processApi';

type PropsType = {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  viewType: 'employee' | 'manager';
  handleCompleteTask: (isCompleted: boolean) => void;
  data: Task | undefined;
};

export const TaskDrawer: React.FC<PropsType> = ({
  isOpen,
  setIsOpen,
  viewType,
  handleCompleteTask,
  data,
}) => {
  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor='right'>
      <div className='m-4 flex h-full w-[600px] flex-col'>
        <div className='grow'>
          <p className='py-4'>
            Fill sitename inspection checklist report for{' '}
            {data?.taskVariables.siteName.value}
          </p>
          <FormGroup>
            {data?.checkList.map((el) => (
              <FormControlLabel
                key={el.checkName}
                control={<Checkbox />}
                label={el.description}
              />
            ))}
          </FormGroup>
        </div>
        <div className='mb-2 text-end'>
          {viewType === 'manager' && (
            <Button
              color='error'
              variant='contained'
              onClick={() => handleCompleteTask(false)}
              sx={{
                marginRight: '10px',
              }}
            >
              Reject
            </Button>
          )}
          <Button
            color={viewType === 'employee' ? 'primary' : 'success'}
            variant='contained'
            onClick={() => handleCompleteTask(true)}
          >
            {viewType === 'manager' ? 'Approve task' : 'Complete task'}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
