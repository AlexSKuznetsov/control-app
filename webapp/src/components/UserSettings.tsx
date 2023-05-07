import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { QUERY_KEYS } from '../shared/constants';
import { getUserList } from '../api/userApi';
import { toast } from 'react-toastify';

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
        User settings:
        {!isEmpty(data) ? (
          data?.map((user) => (
            <div className='flex text-xs gap-4 text-slate-600 ml-2 mt-2'>
              <span key={user.id}>User ID: {user.id}</span>
              <span key={user.id}>First name: {user.firstName}</span>
              <span key={user.id}>Last name: {user.lastName}</span>
              <span key={user.id}>Email: {user.email || 'none'}</span>
            </div>
          ))
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
        {isLoading && <div>loading ...</div>}
      </span>
    </div>
  );
};
