import { List, ListItem, ListItemText } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { useSitesList } from '../hooks/useSitesList';
import { Progress } from '.';

export const SiteList = () => {
  const { siteList, isLoading, error } = useSitesList();

  if (error) {
    return null;
  }

  return (
    <div className='m-2 inline-block rounded border p-4 shadow'>
      <p className='mx-2 text-lg font-light text-slate-600'>Site list:</p>
      <p className='ml-2 text-xs text-slate-400'>stored in MongoDB</p>
      {isLoading && <Progress />}
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {siteList &&
          siteList.map((siteName) => (
            <ListItem key={siteName} alignItems='center'>
              <PlaceIcon color='action' />
              <ListItemText
                primary={
                  <p className='ml-2 text-xs text-slate-600'>{siteName}</p>
                }
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
};
