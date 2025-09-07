// src/context/ModalProvider.tsx
import { createContext, useState } from "react";
import type { ReactNode } from "react";

type Modal = {
  id: string;
  content: ReactNode;
};

type ModalContextType = {
  modals: Modal[];
  openModal: (id: string, content: ReactNode) => void;
  closeModal: (id: string) => void;
  updateModal: (id: string, content: ReactNode) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = (id: string, content: ReactNode) => {
    setModals((prev) => {
      const exists = prev.some((m) => m.id === id);
      return exists
        ? prev.map((m) => (m.id === id ? { ...m, content } : m))
        : [...prev, { id, content }];
    });
  };

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  const updateModal = (id: string, content: ReactNode) => {
    setModals((prev) => prev.map((modal) => (modal.id === id ? { ...modal, content } : modal)));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, updateModal }}>
      {children}
      {modals.map((modal) => (
        <div
          key={modal.id}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-[400px] relative">
            <button
              onClick={() => closeModal(modal.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            {modal.content}
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  );
};
