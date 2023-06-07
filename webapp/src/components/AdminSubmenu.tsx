import { useLocation, Link } from 'react-router-dom';
import { Stack, Divider, Box, Tabs, Tab } from '@mui/material';

export const AdminSubmenu = () => {
  const { pathname } = useLocation();

  const [, , current] = pathname.split('/');

  const menuItems = [
    {
      label: 'Deployed processes',
      route: 'processes',
    },
    { label: 'User list', route: 'userlist' },
    { label: 'Notification settings', route: 'notifications' },
    { label: 'Site list', route: 'sitelists' },
    { label: 'Dashboard', route: 'dashboard' },
    { label: 'Process history', route: 'history' },
  ];

  return (
    <Stack
      direction='row'
      alignItems='center'
      gap='12px'
      divider={<Divider orientation='vertical' flexItem />}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <div className='flex w-20 flex-col items-start'>
        <p className='ml-4 text-base font-semibold leading-5 text-slate-600'>
          admin
        </p>
        <span className='ml-4 text-xs font-light text-slate-600'>sub-menu</span>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs value={current || menuItems[0].route}>
            {menuItems.map((el) => (
              <Tab
                label={el.label}
                key={el.label}
                value={el.route}
                sx={{ textTransform: 'none' }}
                component={Link}
                to={el.route}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
    </Stack>
  );
};
