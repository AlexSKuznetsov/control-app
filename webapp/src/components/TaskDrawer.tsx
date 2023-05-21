import { Button, Drawer } from '@mui/material';

type PropsType = {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  viewType: 'employee' | 'manager';
  handleCompleteTask: (isCompleted: boolean) => void;
};

export const TaskDrawer: React.FC<PropsType> = ({
  isOpen,
  setIsOpen,
  viewType,
  handleCompleteTask,
}) => {
  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor='right'>
      <div className='m-4 flex h-full w-[600px] flex-col'>
        <div className='grow'>Some data from Mongo DB</div>
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
