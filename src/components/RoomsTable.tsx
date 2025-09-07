// src/components/RoomsTable.tsx
import type { FC } from "react";

type Room = {
  id: string;
  type: string;
  status: string; // "Available" | "Booked"
  xPct?: number;
  yPct?: number;
};

interface RoomsTableProps {
  rooms: Room[];
}

const RoomsTable: FC<RoomsTableProps> = ({ rooms }) => {
  const total = rooms.length;
  const booked = rooms.filter((r) => r.status === "Booked").length;
  const available = rooms.filter((r) => r.status === "Available").length;
  // In current flow, "Reserved" maps to Booked after confirmation
  const reserved = booked; // alias for display as requested

  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="bg-gray-900 text-white rounded-xl p-4 shadow">
          <div className="text-gray-400">Total Rooms</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="bg-gray-900 text-white rounded-xl p-4 shadow">
          <div className="text-gray-400">Reserved</div>
          <div className="text-2xl font-bold"> {reserved}</div>
        </div>
        <div className="bg-gray-900 text-white rounded-xl p-4 shadow">
          <div className="text-gray-400">Available</div>
          <div className="text-2xl font-bold">{available}</div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id} className="border-b border-gray-800 bg-gray-900 text-white">
                <td className="px-4 py-3 font-medium">{r.id}</td>
                <td className="px-4 py-3">{r.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      r.status === "Available"
                        ? "inline-block px-2 py-0.5 rounded bg-green-600 text-white"
                        : "inline-block px-2 py-0.5 rounded bg-red-600 text-white"
                    }
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsTable;
