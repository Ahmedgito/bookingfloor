// src/hooks/useModal.ts
import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

// This hook makes sure you can access the modal context easily
export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
