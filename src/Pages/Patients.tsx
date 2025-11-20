import  React ,{ useEffect } from 'react';
import PatientTable from '../components/PatientTable';

const Patients: React.FC = () => {
  useEffect(() => {

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  })
  return (
    <div className='mt-8'>
      <PatientTable />
    </div>
  );
};

export default Patients;