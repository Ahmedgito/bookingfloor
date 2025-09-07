// src/components/FloorPlan.tsx
import React, { useState } from "react";
import { useModal } from "../hooks/useModal";
import { initialRooms } from "../data/rooms";
import floorPlan from "../assets/floorplan.jpg";
import RoomDetailsModal from "../modals/RoomDetailsModal";

const FloorPlan = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const { openModal } = useModal();

  const openRoomDetails = (room: any) => {
    openModal(
      `room-${room.id}`,
      <RoomDetailsModal room={room} setRooms={setRooms} />
    );
  };

  return (
    <div className="w-full flex justify-center">
      {/* Container matches image box, ensuring absolute children align with image */}
      <div className="relative inline-block">
        {/* Floor plan image */}
        <img
          src={floorPlan}
          alt="Floor Plan"
          className="h-[550px] rounded-xl shadow-lg select-none"
        />

        {/* Room hotspots */}
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => openRoomDetails(room)}
            className={`absolute px-2 py-1 rounded-md text-white text-xs shadow-md -translate-x-1/2 -translate-y-1/2
              ${
                room.status === "Available"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500"
              }
            `}
            style={{ left: `${room.xPct}%`, top: `${room.yPct}%` }}
          >
            {room.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorPlan;
