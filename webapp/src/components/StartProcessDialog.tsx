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
import { isEmpty, isUndefined } from 'lodash';
import { useSitesList } from '../hooks/useSitesList';
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

export const StartProcessDialog = (props: DialogProps) => {
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

  const { siteList } = useSitesList();

  useEffect(() => {
    if (!isUndefined(siteList)) {
      setFullSiteList(siteList.join(', ') as string);
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
                <InputLabel id='select-id' size='small'>
                  <span className='text-sm text-slate-500'>Select a site:</span>
                </InputLabel>
                {siteList && (
                  <Select
                    labelId='select-id'
                    id='select-id'
                    value={site}
                    label='Select a site'
                    onChange={handleChange}
                    size='small'
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
                label={
                  <span className='text-sm text-slate-500'>Enter a reason</span>
                }
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
                placement='bottom'
                arrow
              >
                <span>
                  <Button
                    variant='contained'
                    disabled={!isSiteChosen}
                    onClick={() => onClose(`manual`)}
                    fullWidth
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
