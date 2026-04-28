import { useEffect, useRef, type RefObject } from "react";
import { NavOption } from "../Button/NavOption";

interface NavModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: string | undefined;
  ignoreRef?: RefObject<HTMLElement | null>;
}

export function NavModal({ isOpen, onClose, role, ignoreRef }: NavModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !(ignoreRef?.current?.contains(event.target as Node))
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, ignoreRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute top-12 left-0 bg-gradient-to-br from-background-200 to-background-100 rounded-md shadow-lg p-2 z-50 w-48 flex flex-col gap-1"
    >
      {role === "CLIENT" && (
        <>
          <NavOption option="exercise">Tabla de Ejercicios</NavOption>
          <NavOption option="class">Clase</NavOption>
          <NavOption option="report">Incidencia</NavOption>
        </>
      )}
      {role === "EMPLOYEE" && (
        <>
          <NavOption option="client">Cliente</NavOption>
          <NavOption option="class">Clase</NavOption>
          <NavOption option="report">Incidencia</NavOption>
        </>
      )}
      {role === "ADMIN" && (
        <>
          <NavOption option="offer">Oferta</NavOption>
          <NavOption option="client">Cliente</NavOption>
          <NavOption option="employee">Empleado</NavOption>
          <NavOption option="class">Clase</NavOption>
          <NavOption option="report">Incidencia</NavOption>
        </>
      )}
    </div>
  );
}
