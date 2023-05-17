import { FC, useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Skeleton,
  Button,
  Drawer,
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import { QUERY_KEYS } from '../shared/constants';
import { getEmployeeTasks, completeTask } from '../api/processApi';

export const TaskTable: FC<{ viewType: 'employee' | 'manager' }> = ({
  viewType,
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState('');

  const { mutate } = useMutation({
    mutationFn: completeTask,
    onError: () => toast('Something whent wrong', { type: 'warning' }),
  });

  const handleCompleteTask = useCallback(
    (isCompleted: boolean) => {
      mutate({ id: taskId, isCompleted });
      setIsOpen(false);
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_EMPLOYEE_TASKS],
        });
      }, 500);
    },
    [taskId, isOpen]
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_EMPLOYEE_TASKS],
    queryFn: getEmployeeTasks,
    onError: () => toast('Error loading task list', { type: 'warning' }),
  });

  const renderLoadingTableSkeleton = useMemo(() => {
    return (
      <Box sx={{ minWidth: 650 }}>
        {Array(10).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </Box>
    );
  }, []);

  return (
    <>
      {isLoading && renderLoadingTableSkeleton}

      {data && data.filter((el) => el.assignee === viewType).length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Taskname</TableCell>
                <TableCell align='right'>Start time</TableCell>
                <TableCell align='right'>Status</TableCell>
                <TableCell align='right'>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((el) => el.assignee === viewType)
                .map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>
                      {format(new Date(row.created), 'MM/dd/yyyy')}
                    </TableCell>
                    <TableCell align='right'>{row.suspended}</TableCell>
                    <TableCell align='right'>
                      {
                        <Button
                          color='primary'
                          startIcon={<ModeIcon />}
                          onClick={() => {
                            setIsOpen(true);
                            setTaskId(row.id);
                          }}
                        >
                          Edit
                        </Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className='ml-8 font-sans text-sm'>
          There are no currently task avaliable for this user
        </div>
      )}
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor='right'>
        <div className='w-[600px] m-4 flex flex-col h-full'>
          <div className='grow'>Some data from Mongo DB</div>
          <div className='text-end mb-2'>
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
    </>
  );
};
