import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { List, ListItem, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { QUERY_KEYS } from '../shared/constants';
import { getUserList } from '../api/userApi';
import { Progress } from '.';

export const UserSettings = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: getUserList,
    onError: () =>
      toast('Error loading user list', {
        type: 'error',
      }),
  });

  const onCreateClick = useCallback(() => {
    console.log('create new user');
  }, []);

  return (
    <div className='m-2 inline-block rounded border p-4 shadow'>
      <span className='mx-2 text-lg font-light text-slate-600'>
        User list:
        <p className='ml-2 text-xs text-slate-400'>stored in Camunda Engine</p>
        {!isEmpty(data) ? (
          <List sx={{ width: '100%', maxWidth: 360 }}>
            {data?.map((el) => (
              <ListItem key={el.id} sx={{ padding: 0 }}>
                <PersonIcon color='primary' fontSize='small' />
                <ListItemText
                  primary={
                    <p className='ml-2 text-sm font-semibold text-slate-600 '>
                      {el.id}
                    </p>
                  }
                  secondary={
                    <div className='ml-2 text-xs text-slate-500'>
                      <p>
                        First name: {el.firstName}, Last name: {el.lastName}
                      </p>
                      <p>{el.email}</p>
                    </div>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <div className='flex items-center justify-between pt-2'>
            <p className='mx-2 text-sm'>No users</p>
            <button
              className='ml-2 h-8 rounded-md border border-yellow-500 px-3 text-sm text-yellow-600 shadow hover:bg-slate-100'
              onClick={onCreateClick}
            >
              Create new user
            </button>
          </div>
        )}
        {isLoading && <Progress />}
      </span>
    </div>
  );
};
