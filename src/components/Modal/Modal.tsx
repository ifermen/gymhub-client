import type { ReactNode } from "react";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="
      fixed
      inset-0 flex
      items-center
      justify-center
      bg-black/50
      z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="
        bg-white
        p-5
        rounded-xl
        shadow-lg
        relative
        flex
        flex-col
        gap-1
        w-5/6
        md:w-2/6"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="absolute top-1 right-2"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}