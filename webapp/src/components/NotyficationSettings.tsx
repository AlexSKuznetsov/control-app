import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useUpdateNotificationTopic } from '../hooks/useUpdateNotificationTopic';
import { Link } from 'react-router-dom';

export const NotificationSettings = () => {
  const [topicName, setTopicName] = useState('');

  const { mutate } = useUpdateNotificationTopic();

  return (
    <div className='m-2 inline-block rounded border p-4 shadow'>
      <span className='mx-2 text-lg font-light text-slate-600'>
        Notification settings:
      </span>
      <div className='mt-4'>
        <TextField
          label='topic name'
          variant='outlined'
          size='small'
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <Button
          variant='contained'
          sx={{ marginLeft: '12px' }}
          onClick={() => mutate(topicName)}
        >
          Update
        </Button>
      </div>

      <p className='mt-4 text-xs'>
        See example about configuration topic name in process modeller{' '}
        <Link
          to={
            'https://camunda.com/wp-content/uploads/camunda/blog-images/external-task-config.png'
          }
          target='_blank'
          className='text-blue-500 hover:underline'
        >
          here
        </Link>
      </p>
    </div>
  );
};
