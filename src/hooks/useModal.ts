import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

// This hook makes sure model contesxt is accessivble easily
export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
