export const NotificationSettings = () => {
  return (
    <div className='m-2 p-4 border inline-block rounded shadow'>
      <span className='text-lg font-light mx-2 text-slate-600'>
        Notification settings:
        <p className='text-xs text-slate-600 ml-2'>
          SMTP settings goes here (host, port, user, pass)
        </p>
      </span>
    </div>
  );
};
