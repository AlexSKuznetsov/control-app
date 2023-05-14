import Paper from '@mui/material/Paper';

type PropsType = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <Paper elevation={1} className='h-[calc(100vh-105px)] m-4'>
      {children}
    </Paper>
  );
};
