// src/modals/ConfirmationModal.tsx
import { useModal } from "../hooks/useModal";

interface ConfirmationModalProps {
  room: {
    id: string;
    type: string;
  };
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ room }) => {
  const { closeModal } = useModal();

  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 w-80">
      <h2 className="text-xl font-bold mb-2">Booking Confirmed 🎉</h2>
      <p className="mb-4">
        Room {room.id} ({room.type}) has been successfully reserved.
      </p>

      <button
        onClick={() => closeModal(`confirm-${room.id}`)}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
      >
        Close
      </button>
    </div>
  );
};

export default ConfirmationModal;
