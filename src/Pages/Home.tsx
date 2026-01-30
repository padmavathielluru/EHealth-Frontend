import React, { useState, useEffect } from "react";
import Bargraph from "../components/Bargraph";
import Cards from "../components/cards";
import DashboardCards from "../components/DashboardCards";
import PatientTable from "../components/PatientTable";
import Piegraph from "../components/Piegraph";
import MultilevelDropdown from "../components/MultilevelDropdown";
import Searchbar from "../components/Searchbar";
import Tooltip from "../components/Tooltip";
import Login1 from "../components/Login1";
import InputField from "../components/InputField";
import FormComponent from "../components/commonComponents/FormComponent";
// import YearCalendar from "../components/YearCalendar";
import AccessCard from "../components/patientComponents/AccessCard";
import {cardsService} from "../services/cardsService";
import RestrictedAccess from "../components/patientComponents/symptomsTab/RestrictedAccess";
import RecentRecords from "../components/patientComponents/symptomsTab/RecentRecords";

const Home: React.FC = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserData();
  }, []);

  const getUserData=async()=>{
    console.log("atleast I am loading");
    console.log(cardsService.getAll());
  }

  const [searchValue, setSearchValue] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState<string>("");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });


  const [isSecondLoginOpen, setIsSecondLoginOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    secretKey: "",
  });

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      <Bargraph />

      <div className="mt-8">
        <MultilevelDropdown />
      </div>

      <div className="mt-8">
        <InputField
          label="Full Name"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
     </div>

     <div className="mt-8 w-1/3">
        <FormComponent />
     </div>

      {/* <div className="w-[40%] mt-8">
                        <YearCalendar
                            label="Year/Period"
                            value={year}
                            onChange={setYear}
                        />
                    </div> */}

      <div className="mt-8 w-1/5 max-w-xs">
        <Searchbar
          placeholder="Search anything..."
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>

        <div className="mt-8">
            <AccessCard title="Diseases"/>
        </div>

        <div className="mt-8">
          <RestrictedAccess />
        </div>

        <div className="mt-8">
          <RecentRecords />
        </div>

      <div className="mt-8">
        <Login1
          credentials={credentials}
          setCredentials={(k, v) =>
            setCredentials((prev) => ({ ...prev, [k]: v }))
          }
          isOpen={isLoginOpen}
          setIsOpen={setIsLoginOpen}
          onLogin={() => setIsLoginOpen(false)}
          type="user"
        />
      </div>

      {/* Admin Login */}
       <div className="mt-8">
        <Login1
          credentials={adminCredentials}
          setCredentials={(k, v) =>
            setAdminCredentials((prev) => ({ ...prev, [k]: v }))
          }
          isOpen={isSecondLoginOpen}
          setIsOpen={setIsSecondLoginOpen}
          onLogin={() => setIsSecondLoginOpen(false)}
          type="admin"
        />
      </div>  


      <div className="justify-center mt-12 mb-25">
        <Tooltip />
      </div>


      <div className="mt-8">
        <Cards />
      </div>


      <div className="mt-8">
        <DashboardCards />
      </div>


      {/* <div className="mt-8">
        <PatientTable />
      </div> */}


      <div className="mt-8">
        <Piegraph />
      </div>
    </div>
  );
};

export default Home;
