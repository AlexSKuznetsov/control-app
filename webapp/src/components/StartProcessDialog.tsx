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
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { getSitesList } from '../api/sitesApi';
import { QUERY_KEYS } from '../shared/constants';

export type DialogProps = {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  onClick: () => void;
};

export const SimpleDialog = (props: DialogProps) => {
  const { onClose, selectedValue, open, onClick } = props;

  const { data } = useQuery({
    queryFn: getSitesList,
    queryKey: [QUERY_KEYS.GET_SITES_LIST],
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [site, setSite] = useState('');

  const isSiteChosen = !isEmpty(inputValue) && !isEmpty(site);

  const handleClose = () => {
    onClose(selectedValue);
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
                {data && (
                  <Select
                    labelId='select-id'
                    id='select-id'
                    value={site}
                    label='Select a site'
                    onChange={handleChange}
                  >
                    {data.map((el) => (
                      <MenuItem value={el} key={el}>
                        {el}
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Tooltip
                title={
                  !isSiteChosen ? 'Pick a site and write a reason' : undefined
                }
                placement='top-start'
              >
                <span style={{ width: '100%', display: 'grid' }}>
                  <Button
                    variant='contained'
                    disabled={!isSiteChosen}
                    onClick={onClick}
                  >
                    Start ad-hoc process
                  </Button>
                </span>
              </Tooltip>

              <Button variant='outlined'>Start planned process</Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
