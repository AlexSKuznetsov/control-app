import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { QUERY_KEYS } from '../shared/constants';
import { getUserList } from '../api/userApi';
import { toast } from 'react-toastify';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Progress } from '.';
import React from 'react';

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
    <div className='m-2 p-4 border inline-block rounded shadow'>
      <span className='text-lg font-light mx-2 text-slate-600'>
        User list:
        {!isEmpty(data) ? (
          <List sx={{ width: '100%', maxWidth: 360 }}>
            {data?.map((el) => (
              <ListItem key={el.id}>
                <ListItemText
                  primary={el.id}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        {el.firstName} | {el.lastName} | {el.email}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <div className='flex items-center pt-2 justify-between'>
            <p className='text-sm mx-2'>No users</p>
            <button
              className='text-sm border ml-2 h-8 px-3 rounded-md shadow border-yellow-500 text-yellow-600 hover:bg-slate-100'
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
