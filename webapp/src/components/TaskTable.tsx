import { FC, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
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

      {data && data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Task name</TableCell>
                <TableCell align='right'>Start time</TableCell>
                <TableCell align='right'>Status</TableCell>
                <TableCell align='right'>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter(
                  (el) => viewType === 'employee' && el.status === 'in progress'
                )
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.variables.variables.startEventType.value ===
                      'manual' ? (
                        <span className='text-xs text-slate-600'>
                          Ad hoc request, reason -{' '}
                          <span className='font-semibold'>
                            {row.variables.variables.adHocDescription.value}.
                          </span>{' '}
                          Fill {row.variables.variables.siteList.value}{' '}
                          inspection checklist report.
                        </span>
                      ) : (
                        <span className='text-xs text-slate-600'>
                          Planned request May 2023 - Fill sitename inspection
                          checklist report.
                        </span>
                      )}
                    </TableCell>
                    <TableCell align='right'>
                      <span className='text-xs text-slate-600'>
                        {format(parseISO(row.timestamp), 'MM/dd/yyyy HH:mm')}
                      </span>
                    </TableCell>
                    <TableCell align='right'>
                      <Chip
                        label={
                          <span className='text-xs text-slate-600'>
                            {row.status}
                          </span>
                        }
                        variant='outlined'
                        size='small'
                      />
                    </TableCell>
                    <TableCell align='right'>
                      {
                        <Button
                          color='primary'
                          startIcon={<ModeIcon />}
                          onClick={() => {
                            setIsOpen(true);
                            setTaskId(row._id);
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
