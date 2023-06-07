import { Route, Routes } from 'react-router-dom';
import {
  NotificationSettings,
  UserSettings,
  SiteList,
  ProcessList,
  AdminSubmenu,
} from '../components';

export const AdminPage = () => {
  return (
    <>
      <AdminSubmenu />
      <Routes>
        <Route path='/*' element={<ProcessList />} />
        <Route path='/dashboard' element={<span>Process dashboard</span>} />
        <Route path='/userlist' element={<UserSettings />} />
        <Route path='/sitelists' element={<SiteList />} />
        <Route path='/notifications' element={<NotificationSettings />} />
        <Route
          path='/history'
          element={<span>table with all process instances</span>}
        />
      </Routes>
    </>
  );
};
