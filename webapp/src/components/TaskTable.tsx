import { FC, useState, useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import classNames from 'classnames';
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
import { CheckList } from '../api/processApi';
import { useCompleteTask } from '../hooks/useCompleteTask';
import { useGetEmployeeTask } from '../hooks/useGetEmployeeTask';
import { Progress, TaskDrawer } from '.';

const cellNames = [
  'Task name',
  'Start type',
  'Site name',
  'Start time',
  'Status',
  'Edit',
];

export const TaskTable: FC<{ viewType: 'employee' | 'manager' }> = ({
  viewType,
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [processId, setProcessId] = useState('');
  const [managerTaskId, setManagerTaskId] = useState<string | null>(null);
  const [checkList, setCheckState] = useState<CheckList[] | null>(null);

  const { mutate } = useCompleteTask();
  const { data, isLoading } = useGetEmployeeTask();

  const handleCompleteTask = useCallback(
    (isCompleted: boolean) => {
      mutate({ id: taskId, isCompleted, processId, managerTaskId, checkList });
      setIsOpen(false);
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_EMPLOYEE_TASKS],
        });
      }, 500);
    },
    [taskId, isOpen, checkList, processId, managerTaskId, checkList]
  );

  const pickedData = useMemo(() => {
    return data && data?.find((el) => el.taskId === taskId);
  }, [taskId, data]);

  const showCellNames = useMemo(
    () =>
      cellNames.map((el) => (
        <TableCell key={el} align={el === 'Task name' ? 'left' : 'right'}>
          {el}
        </TableCell>
      )),
    []
  );

  return (
    <>
      {isLoading && <Progress />}

      {data && data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small'>
            <TableHead>
              <TableRow>{showCellNames}</TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((el) =>
                  viewType === 'employee'
                    ? el.status === 'in progress' || el.status === 'rejected'
                    : el.status === 'in review'
                )
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component='th' scope='row'>
                      {row.proccesVariables.startEventType.value ===
                      'manual' ? (
                        <span className='text-xs text-slate-600'>
                          Ad hoc request, reason -{' '}
                          <span className='font-semibold'>
                            {row.proccesVariables.adHocDescription.value}.
                          </span>{' '}
                          Fill {row.taskVariables.siteName.value} inspection
                          checklist report.
                        </span>
                      ) : (
                        <span className='text-xs text-slate-600'>
                          Planned request May 2023 - Fill sitename inspection
                          checklist report for{' '}
                          {JSON.parse(row.taskVariables.siteName.value)}.
                        </span>
                      )}
                    </TableCell>
                    <TableCell align='right'>
                      <span className='text-xs text-slate-600'>
                        {row.proccesVariables.startEventType.value === 'manual'
                          ? 'ad-hoc'
                          : 'regular'}
                      </span>
                    </TableCell>
                    <TableCell align='right'>
                      <span className='text-xs text-slate-600'>
                        {JSON.parse(row.taskVariables.siteName.value)}
                      </span>
                    </TableCell>
                    <TableCell align='right'>
                      <span className='text-xs text-slate-600'>
                        {format(parseISO(row.timestamp), 'MM/dd/yyyy HH:mm')}
                      </span>
                    </TableCell>
                    <TableCell align='right'>
                      <Chip
                        label={
                          <span
                            className={classNames('text-xs', {
                              'text-red-600': row.status === 'rejected',
                              'text-green-600': row.status === 'completed',
                              'text-slate-600': row.status === 'in progress',
                            })}
                          >
                            {row.status}
                          </span>
                        }
                        variant='outlined'
                        color={row.status === 'rejected' ? 'error' : 'default'}
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
                            setTaskId(row.taskId);
                            setProcessId(row.processId);
                            setManagerTaskId(
                              viewType === 'employee' ? null : row.managerTaskId
                            );
                            setCheckState(row.checkList);
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

      {pickedData && (
        <TaskDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          viewType={viewType}
          handleCompleteTask={handleCompleteTask}
          data={pickedData}
          checkList={checkList}
          setCheckState={setCheckState}
        />
      )}
    </>
  );
};
