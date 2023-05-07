type PropsType = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className='h-[calc(100vh-100px)] bg-white  m-4 rounded shadow'>
      {children}
    </div>
  );
};
