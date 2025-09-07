// src/modals/CancelReservationModal.tsx
import { useModal } from "../hooks/useModal";
import RoomDetailsModal from "./RoomDetailsModal";

interface CancelReservationModalProps {
  room: {
    id: string;
    type: string;
    status: string;
  };
  setRooms: React.Dispatch<React.SetStateAction<any>>;
}

const CancelReservationModal: React.FC<CancelReservationModalProps> = ({ room, setRooms }) => {
  const { closeModal, updateModal } = useModal();

  const handleCancelReservation = () => {
    // Set room back to available
    setRooms((prev: any) =>
      prev.map((r: any) => (r.id === room.id ? { ...r, status: "Available" } : r))
    );

    // Close this modal
    closeModal(`cancel-${room.id}`);

    // Update Room Details modal immediately to reflect availability
    updateModal(
      `room-${room.id}`,
      <RoomDetailsModal room={{ ...room, status: "Available" }} setRooms={setRooms} />
    );
  };

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-xl p-6 w-80">
      <h2 className="text-lg font-bold mb-2">Cancel Reservation</h2>
      <p className="mb-4">Are you sure you want to cancel the reservation for room {room.id}?</p>

      <button
        onClick={handleCancelReservation}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
      >
        Yes, Cancel Reservation
      </button>

      <button
        onClick={() => closeModal(`cancel-${room.id}`)}
        className="ml-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
      >
        Keep Reservation
      </button>
    </div>
  );
};

export default CancelReservationModal;
