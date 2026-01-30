import React, { useState } from "react";
import Title from "../../Title";
import TimePartCell from "./TimePartCell";
import AddAvailabilityModal from "../../../modals/AddAvailabilityModal";
import ConfirmDeleteModal from "../../../modals/ConfirmDeleteModal";

export interface AvailabilityRow {
  location: string;
  day: string;
  consultationMode: string;
  slots: any[];
  breaks: any[];
}

const AvailabilityTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<AvailabilityRow[]>([]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<AvailabilityRow | null>(null);

  const DEFAULT_SLOTS = 1;
  const DEFAULT_BREAKS = 1;

  const LOCATION_WIDTH = 170;
  const DAY_WIDTH = 110;
  const MODE_WIDTH = 120;
  const ACTION_WIDTH = 120;
  const SLOT_COL_WIDTH = 110;

  const handleAdd = (data: AvailabilityRow) => {
    if (editIndex !== null) {
      setRows(prev => prev.map((row, i) => (i === editIndex ? data : row)));
      setEditIndex(null);
      setEditData(null);
    } else {
      setRows(prev => [...prev, data]);
    }
    setOpen(false);
  };

  const handleDelete = (index: number) => {
    setRows(prev => prev.filter((_, i) => i !== index));
  };

  const maxSlots =
    rows.length === 0
      ? DEFAULT_SLOTS
      : Math.max(...rows.map(r => r.slots?.length || 0));

  const maxBreaks =
    rows.length === 0
      ? DEFAULT_BREAKS
      : Math.max(...rows.map(r => r.breaks?.length || 0));

  return (
    <>
      <div className="flex items-center gap-2 mb-3 select-none">
        <Title text={rows.length > 0 ? "Schedule Availability" : "Availability"} />

        {rows.length > 0 && (
          <button
            onClick={() => setOpen(true)}
            className="w-8 h-8 border rounded-lg flex items-center justify-center
      border-blue-500 hover:bg-blue-100 transition select-none"
          >
            <img
              src="/images/u_plus(1).svg"
              alt="add"
              className="w-4 h-4 pointer-events-none"
            />
          </button>
        )}
      </div>

      <div className="border border-gray-200 rounded-xl overflow-x-auto scrollbar-hide bg-white relative overscroll-x-contain select-none">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            {/* MAIN HEADER */}
            <tr className="bg-gray-210 text-gray-400 text-xs">   
              <th
                rowSpan={2}
                className="sticky left-0 z-40 bg-gray-100 border border-gray-200 px-4 py-5"
                style={{ minWidth: LOCATION_WIDTH }}>
                LOCATION *
              </th>

              <th
                rowSpan={2}
                className="sticky z-40 bg-gray-100 border border-gray-200 px-4 py-4"
                style={{ left: LOCATION_WIDTH, minWidth: DAY_WIDTH }}
              >
                DAY
              </th>

              <th
                rowSpan={2}
                className="sticky z-40 bg-gray-100 border border-gray-200 px-4 py-3"
                style={{
                  left: LOCATION_WIDTH + DAY_WIDTH,
                  minWidth: MODE_WIDTH,
                }}
              >
                MODE
              </th>


             
              {Array.from({ length: maxSlots }).map((_, i) => (
                <th
                  key={i}
                  colSpan={2}
                  className="border border-gray-200 bg-blue-50 text-center"
                  style={{ minWidth: SLOT_COL_WIDTH * 2 }}
                >
                  SLOT {i + 1}
                </th>
              ))}

              {Array.from({ length: maxBreaks }).map((_, i) => (
                <th
                  key={i}
                  colSpan={2}
                  className="border border-gray-200 bg-pink-50 text-center"
                  style={{ minWidth: SLOT_COL_WIDTH * 2 }}
                >
                  BREAK {i + 1}
                </th>
              ))}

              <th
                rowSpan={2}
                className="sticky right-0 z-30 bg-gray-100 border border-gray-200 px-4 py-3"
                style={{ minWidth: ACTION_WIDTH }}
              >
                ACTION
              </th>

            </tr>

            {/* SUB HEADER */}
            <tr className="text-gray-400 text-xs">
              {Array.from({ length: maxSlots }).map((_, i) => (
                <React.Fragment key={`slot-sub-${i}`}>
                  <th className="border border-gray-200 bg-blue-50">Start Time</th>
                  <th className="border border-gray-200 bg-blue-50">End Time</th>
                </React.Fragment>
              ))}

              {Array.from({ length: maxBreaks }).map((_, i) => (
                <React.Fragment key={`break-sub-${i}`}>
                  <th className="border border-gray-200 bg-pink-50">Start Time</th>
                  <th className="border border-gray-200 bg-pink-50">End Time</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={3 + (maxSlots + maxBreaks) * 2 + 1}
                  className="py-12 "
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <button
                      onClick={() => setOpen(true)}
                      className="w-9 h-9 rounded-xl border border-blue-500 select-none
            flex items-center justify-center hover:bg-blue-100 transition"
                    >
                      <img
                        src="/images/u_plus(1).svg"
                        alt="plus"
                        className="w-4 h-4 pointer-events-none"
                      />
                    </button>

                    <p className="text-sm text-gray-400 pointer-events-none">
                      Schedule Availability
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {rows.map((row, index) => (
              <tr key={index} >

                <td
                  className="sticky left-0 z-30 bg-white border border-gray-200 px-4 py-2 text-center"
                  style={{ minWidth: LOCATION_WIDTH }}
                >
                  {row.location}
                </td>

                <td
                  className="sticky z-30 bg-white border border-gray-200 px-4 py-2 text-center"
                  style={{ left: LOCATION_WIDTH, minWidth: DAY_WIDTH }}
                >
                  {row.day}
                </td>

                <td
                  className="sticky z-30 bg-white border border-gray-200 px-4 py-2 text-center"
                  style={{
                    left: LOCATION_WIDTH + DAY_WIDTH,
                    minWidth: MODE_WIDTH,
                  }}
                >
                  {row.consultationMode}
                </td>


                {Array.from({ length: maxSlots }).map((_, i) => (
                  <React.Fragment key={i}>
  

                    <td className="border-r border-b border-gray-200 text-center" style={{ minWidth: SLOT_COL_WIDTH }}>
                      <TimePartCell
                        value={row.slots?.[i]?.startTime}
                        meridiem={row.slots?.[i]?.startMeridiem}
                      />
                    </td>
                    <td className="border-r border-b border-gray-200 text-center" style={{ minWidth: SLOT_COL_WIDTH }}>
                      <TimePartCell
                        value={row.slots?.[i]?.endTime}
                        meridiem={row.slots?.[i]?.endMeridiem}
                      />
                    </td>
                  </React.Fragment>
                ))}

                {Array.from({ length: maxBreaks }).map((_, i) => (
                  <React.Fragment key={i}>
                    <td className="border-r border-b border-gray-200 text-center" style={{ minWidth: SLOT_COL_WIDTH }}>
                      <TimePartCell
                        value={row.breaks?.[i]?.startTime}
                        meridiem={row.breaks?.[i]?.startMeridiem}
                      />
                    </td>
                    <td className="border-r border-b border-gray-200 text-center" style={{ minWidth: SLOT_COL_WIDTH }}>
                      <TimePartCell
                        value={row.breaks?.[i]?.endTime}
                        meridiem={row.breaks?.[i]?.endMeridiem}
                      />
                    </td>
                  </React.Fragment>
                ))}

                <td className="border border-gray-200 text-center sticky right-0 z-30 bg-white shadow-left"
                style={{ minWidth: ACTION_WIDTH }}>
                  <div className="flex justify-center gap-3 select-none">
                    <img
                      src="/images/fi_edit-2.svg" alt="edit"
                      className="w-5 h-5 cursor-pointer "
                      onClick={() => {
                        setEditIndex(index);
                        setEditData(row);
                        setOpen(true);
                      }}
                    />
                    <img
                      src="/images/u_trash.svg" alt="trash"
                      className="w-5 h-5 cursor-pointer "
                      onClick={() => setDeleteIndex(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <AddAvailabilityModal
          onClose={() => {
            setOpen(false);
            setEditIndex(null);
            setEditData(null);
          }}
          onAdd={handleAdd}
          existingAvailabilities={rows}
          editData={editData}
          editIndex={editIndex}
        />
      )}

      <ConfirmDeleteModal
        open={deleteIndex !== null}
        title="Are you sure?"
        description="Are you sure you want to delete this item?"
        confirmText="Yes"
        cancelText="No"
        onCancel={() => setDeleteIndex(null)}
        onConfirm={() => {
          if (deleteIndex !== null) handleDelete(deleteIndex);
          setDeleteIndex(null);
        }}
      />
    </>
  );
};

export default AvailabilityTable;



