import  React, { useEffect } from 'react';
import PatientTable from '../components/PatientTable';

const Patients: React.FC = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='mt-8 select-none'>
      <PatientTable />
    </div>
  );
};

export default Patients;