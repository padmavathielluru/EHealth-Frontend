import React, { useState } from "react";
import {
 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import { AVATAR_COLORS, REFERRALS } from "../utils/ReferralTableConstants";

interface Referral {
  id: string;
  name: string;
  type: string;
  specialization: string;
  phone: string;
  email: string;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const ReferralTable: React.FC = () => {
 
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchSpecialization, setSearchSpecialization] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;


  const filtered: Referral[] = REFERRALS.filter((r) => {
    return (
      r.id.toLowerCase().includes(searchId.toLowerCase()) &&
      r.name.toLowerCase().includes(searchName.toLowerCase()) &&
      r.type.toLowerCase().includes(searchType.toLowerCase()) &&
      r.specialization.toLowerCase().includes(searchSpecialization.toLowerCase()) &&
      r.phone.toLowerCase().includes(searchPhone.toLowerCase()) &&
      r.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  });

if ((currentPage - 1) * rowsPerPage >= filtered.length) {
  setCurrentPage(1);
}


const totalPages = Math.ceil(filtered.length / rowsPerPage);


const paginatedData = filtered.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);
 
  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelected(filtered.map((r) => r.id));
    else setSelected([]);
  };

  const allSelected = filtered.length > 0 && filtered.every((r) => selected.includes(r.id));

  return (
    <div className="">
      <TableContainer component={Paper} className="rounded-full border-gray-200 min-w-[900px] md:min-w-full 
      overflow-auto max-h[78vh] lg:max-h-[74vh] scrollbar-thin scrollbar-thumb-gray-400  ">
        <Table className="border-collapse w-full ">
          {/* HEADERS */}
          <TableHead>
            <TableRow className="bg-gray-50 h-[67.91px]">
              <TableCell padding="checkbox" className="border-r border-gray-300 font-semibold">
                <Checkbox checked={allSelected} onChange={handleSelectAll} />
              </TableCell>

              <TableCell className="border-r border-gray-300 font-semibold">REFERRAL ID</TableCell>
              <TableCell className="border-r border-gray-300 font-semibold">NAME / FACILITY</TableCell>
              <TableCell className="border-r border-gray-300 font-semibold hidden md:table-cell">TYPE</TableCell>
              <TableCell className="border-r border-gray-300 font-semibold md:table-cell">SPECIALIZATION</TableCell>
              <TableCell className="border-r border-gray-300 font-semibold lg:table-cell">PHONE</TableCell>
              <TableCell className="border-r border-gray-300 font-semibold lg:table-cell">EMAIL</TableCell>
              <TableCell className="font-semibold">ACTIONS</TableCell>
            </TableRow>

            {/* SEARCH ROW */}
            <TableRow className="bg-white">
              <TableCell className="border-r border-gray-300"></TableCell>

              <TableCell className="border-r border-gray-300">
                <Searchbar placeholder="Search..." value={searchId} onChange={setSearchId} />
              </TableCell>

              <TableCell className="border-r border-gray-300">
                <Searchbar placeholder="Search..." value={searchName} onChange={setSearchName} />
              </TableCell>

              <TableCell className="border-r border-gray-300">
                <Searchbar placeholder="Search..." value={searchType} onChange={setSearchType} />
              </TableCell>

              <TableCell className="border-r border-gray-300">
                <Searchbar
                  placeholder="Search..."
                  value={searchSpecialization}
                  onChange={setSearchSpecialization}
                />
              </TableCell>

              <TableCell className="border-r border-gray-300">
                <Searchbar placeholder="Search..." value={searchPhone} onChange={setSearchPhone} />
              </TableCell>

              <TableCell className="border-r border-gray-300">
                <Searchbar placeholder="Search..." value={searchEmail} onChange={setSearchEmail} />
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {paginatedData.map((r, index) => (
              <TableRow key={r.id} className="hover:bg-gray-50 border-t border-gray-200 ">
                <TableCell padding="checkbox" className="border-r rounded-full border-gray-300">
                  <Checkbox
                    checked={selected.includes(r.id)}
                    onChange={() => handleSelect(r.id)}
                  />
                </TableCell>

                <TableCell className="border-r border-gray-300">
                  <span className="text-gray-500">{r.id}</span>
                </TableCell>

                <TableCell className="border-r border-gray-300">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-sm ${AVATAR_COLORS[index % AVATAR_COLORS.length]
                        }`}
                    >
                      {getInitials(r.name)}
                    </div>
                    <span className="text-gray-600 font-medium">{r.name}</span>
                  </div>
                </TableCell>

                <TableCell className="border-r border-gray-300">{r.type}</TableCell>
                <TableCell className="border-r border-gray-300">{r.specialization}</TableCell>
                <TableCell className="border-r border-gray-300">{r.phone}</TableCell>

                <TableCell className="border-r border-gray-300">
                  <a className="text-[#168BD9] hover:underline">{r.email}</a>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3 text-gray-700">
                    <img
                      src="/images/ChatCircleDots.svg"
                      alt="view"
                      className="w-5 h-5 cursor-pointer hover:opacity-70 hover:scale-110 transition"
                    />
                    <img
                      src="/images/fi_edit-2.svg"
                      alt="edit"
                      className="w-5 h-5 cursor-pointer hover:opacity-70 hover:scale-110 transition"
                    />
                    <img
                      src="/images/u_trash.svg"
                      alt="delete"
                      className="w-5 h-5 cursor-pointer hover:opacity-70 hover:scale-110 transition"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
      </TableContainer>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ReferralTable;
