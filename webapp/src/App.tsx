import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { AdminPage, Employee, Manager, NotFound } from './pages';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Employee />} />
        <Route path='/manager' element={<Manager />} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
