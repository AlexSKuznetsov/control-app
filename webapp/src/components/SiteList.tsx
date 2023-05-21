import { useQuery } from '@tanstack/react-query';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import { getSitesList } from '../api/sitesApi';
import { QUERY_KEYS } from '../shared/constants';
import { Progress } from '.';

export const SiteList = () => {
  const {
    data: siteList,
    isLoading,
    error,
  } = useQuery({
    queryFn: getSitesList,
    queryKey: [QUERY_KEYS.GET_SITES_LIST],
  });

  if (error) {
    return null;
  }

  return (
    <Container>
      {isLoading && <Progress />}
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {siteList &&
          siteList.map((siteName) => (
            <ListItem key={siteName}>
              <ListItemText primary={siteName} />
            </ListItem>
          ))}
      </List>
    </Container>
  );
};
