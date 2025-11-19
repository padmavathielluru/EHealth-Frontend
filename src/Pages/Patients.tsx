import  React  from 'react';
import PatientTable from '../components/PatientTable';

const Patients: React.FC = () => {
  return (
    <div className='mt-8'>
      <PatientTable />
    </div>
  );
};

export default Patients;