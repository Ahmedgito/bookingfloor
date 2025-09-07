    // src/modals/ReserveRoomModal.tsx
import { useModal } from "../hooks/useModal";
import ConfirmationModal from "./ConfirmationModal";

interface ReserveRoomModalProps {
  room: {
    id: string;
    type: string;
    status: string;
  };
  setRooms: React.Dispatch<React.SetStateAction<any>>;
}

const ReserveRoomModal: React.FC<ReserveRoomModalProps> = ({ room, setRooms }) => {
  const { openModal, closeModal } = useModal();

  const handleConfirm = () => {
    // Mark room as booked
    setRooms((prev: any) =>
      prev.map((r: any) =>
        r.id === room.id ? { ...r, status: "Booked" } : r
      )
    );

    // Close this modal
    closeModal(`reserve-${room.id}`);

    // Also close the room details modal so the user isn't redirected there
    closeModal(`room-${room.id}`);

    // Open confirmation modal
    openModal(`confirm-${room.id}`, <ConfirmationModal room={room} />);
  };

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-xl p-6 w-80">
      <h2 className="text-lg font-bold mb-2">Reserve Room {room.id}</h2>
      <p className="mb-4">Type: {room.type}</p>

      <button
        onClick={handleConfirm}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
      >
        Confirm Reservation
      </button>

      <button
        onClick={() => closeModal(`reserve-${room.id}`)}
        className="ml-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
      >
        Cancel
      </button>
    </div>
  );
};

export default ReserveRoomModal;
