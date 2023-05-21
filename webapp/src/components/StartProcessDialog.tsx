import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { getSitesList } from '../api/sitesApi';
import { QUERY_KEYS } from '../shared/constants';
import { useEffect } from 'react';

export type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  site: string;
  onClose: (startType: 'manual' | 'auto') => void;
  setSite: React.Dispatch<React.SetStateAction<string>>;
  adHocDescription: string;
  setAdHocDescription: React.Dispatch<React.SetStateAction<string>>;
  setFullSiteList: React.Dispatch<React.SetStateAction<string>>;
};

export const SimpleDialog = (props: DialogProps) => {
  const {
    onClose,
    site,
    open,
    setSite,
    adHocDescription,
    setAdHocDescription,
    setOpen,
    setFullSiteList,
  } = props;

  const { data: siteList } = useQuery({
    queryFn: getSitesList,
    queryKey: [QUERY_KEYS.GET_SITES_LIST],
  });

  useEffect(() => {
    if (siteList !== undefined) {
      setFullSiteList(siteList?.join(', ') as string);
    }
  }, [siteList]);

  const isSiteChosen = !isEmpty(adHocDescription) && !isEmpty(site);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSite(event.target.value as string);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Dialog onClose={handleClose} open={open} maxWidth={'xl'}>
        <DialogTitle>Manually start process</DialogTitle>
        <DialogContent>
          <Stack
            direction='row'
            spacing={8}
            divider={<Divider orientation='vertical' flexItem />}
          >
            <div style={{ minWidth: '200px' }}>
              <Typography
                variant='caption'
                display='block'
                gutterBottom
                marginBottom={4}
              >
                List of avaliable sites
              </Typography>
              <FormControl fullWidth>
                <InputLabel id='select-id'>Select a site:</InputLabel>
                {siteList && (
                  <Select
                    labelId='select-id'
                    id='select-id'
                    value={site}
                    label='Select a site'
                    onChange={handleChange}
                  >
                    {siteList.map((siteName) => (
                      <MenuItem value={siteName} key={siteName}>
                        {siteName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </div>
            <Stack spacing={2}>
              <Typography variant='caption' display='block' gutterBottom>
                For ad hoc request you should write a reason:
              </Typography>
              <TextField
                id='outlined-basic'
                label='Enter a reason'
                variant='outlined'
                size='small'
                value={adHocDescription}
                onChange={(e) => setAdHocDescription(e.target.value)}
              />
              <Tooltip
                title={
                  !isSiteChosen
                    ? 'Pick a site and write a reason for ad-hoc process'
                    : undefined
                }
                placement='top-start'
              >
                <span style={{ width: '100%', display: 'grid' }}>
                  <Button
                    variant='contained'
                    disabled={!isSiteChosen}
                    onClick={() => onClose(`manual`)}
                  >
                    Start ad-hoc process
                  </Button>
                </span>
              </Tooltip>

              <Button variant='outlined' onClick={() => onClose('auto')}>
                Start planned process
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
