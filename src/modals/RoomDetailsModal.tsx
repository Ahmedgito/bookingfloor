// src/modals/RoomDetailsModal.tsx
import { useModal } from "../hooks/useModal";
import ReserveRoomModal from "./ReserveRoomModal";
import CancelReservationModal from "./CancelReservationModal";

interface RoomDetailsModalProps {
  room: {
    id: string;
    type: string;
    status: string;
  };
  setRooms: React.Dispatch<React.SetStateAction<any>>;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ room, setRooms }) => {
  const { openModal, closeModal } = useModal();

  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 w-80">
      <h2 className="text-xl font-bold mb-2">Room {room.id}</h2>
      <p className="mb-1">Type: {room.type}</p>
      <p className="mb-4">Status: {room.status}</p>

      {room.status === "Available" ? (
        <button
          onClick={() =>
            openModal(
              `reserve-${room.id}`,
              <ReserveRoomModal room={room} setRooms={setRooms} />
            )
          }
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
        >
          Reserve
        </button>
      ) : (
        <button
          onClick={() =>
            openModal(
              `cancel-${room.id}`,
              <CancelReservationModal room={room} setRooms={setRooms} />
            )
          }
          className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition"
        >
          Cancel Reservation
        </button>
      )}

      <button
        onClick={() => closeModal(`room-${room.id}`)}
        className="ml-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
      >
        Close
      </button>
    </div>
  );
};

export default RoomDetailsModal;
