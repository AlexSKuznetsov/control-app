import {
  PageLayout,
  NotificationSettings,
  UserSettings,
  SiteList,
  ProcessList,
} from '../components';

export const AdminPage = () => {
  return (
    <PageLayout>
      <div className='grid grid-cols-2 grid-rows-2 gap-1'>
        <ProcessList />
        <NotificationSettings />
        <UserSettings />
        <SiteList />
      </div>
    </PageLayout>
  );
};
