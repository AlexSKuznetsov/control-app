import { FC, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import { QUERY_KEYS } from '../shared/constants';
import { useCompleteTask } from '../hooks/useCompleteTask';
import { useGetEmployeeTask } from '../hooks/useGetEmployeeTask';
import { Progress, TaskDrawer } from '.';

export const TaskTable: FC<{ viewType: 'employee' | 'manager' }> = ({
  viewType,
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState('');

  const { mutate } = useCompleteTask();
  const { data, isLoading } = useGetEmployeeTask();

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

  return (
    <>
      {isLoading && <Progress />}

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
      <TaskDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        viewType={viewType}
        handleCompleteTask={handleCompleteTask}
      />
    </>
  );
};
