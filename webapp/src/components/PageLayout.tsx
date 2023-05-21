import Paper from '@mui/material/Paper';

type PropsType = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <Paper elevation={1} className='m-4 h-[calc(100vh-105px)]'>
      {children}
    </Paper>
  );
};
