import React, { useState } from "react";
import Title from "../../../components/Title";
import { getMemberships } from "../../../services/membershipsTabService";
import AddMembershipModal from "../../../modals/AddMembershipModal";

const MembershipsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const memberships = getMemberships();

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <Title text="Memberships" />

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-8 h-8 rounded-xl border shadow-sm bg-blue-500 flex items-center justify-center hover:bg-blue-700 transition"
        >
          <img src="/images/u_plus-2.svg" alt="add" className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4 pr-2 pt-3 pl-2 bg-blue-50 h-[111vh] rounded-xl overflow-y-auto">
        {memberships.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-6 shadow-sm relative">
            <div className="absolute top-2 right-2 flex items-center gap-1.5 ">
              <button className="w-8 h-8 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition">
                <img
                  src="/images/fi_edit-2.svg"
                  alt="edit"
                  className="w-4 h-4"
                />
              </button>

              <button className="w-8 h-8 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition">
                <img
                  src="/images/u_trash.svg"
                  alt="delete"
                  className="w-5 h-5"
                />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                <img src={item.icon} alt="icon" className="w-6 h-6" />
              </div>

              <div>
                <p className="text-gray-800 font-semibold">{item.title}</p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-500 text-sm">{item.year}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  <span className="text-gray-500 text-sm">{item.type}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
       <AddMembershipModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}/>
    </div>
  );
};

export default MembershipsTab;
