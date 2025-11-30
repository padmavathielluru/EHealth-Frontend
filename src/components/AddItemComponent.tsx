import { Link } from "react-router-dom";
const AddItemComponent: React.FC = () => {
    return(
        <>
        <div className="rounded-full p-6 w-60">
             <div className="pb-2"><Link to={`/appointment`} >Appointments</Link>
             </div>
             <div className="pb-2">
              <Link to={`/patients`} >Patients
              </Link>
              </div>
              <div>
               <Link to={`/referrals`} >Referrals</Link>
               </div>
               </div>
        </>
    )
}

export default AddItemComponent;