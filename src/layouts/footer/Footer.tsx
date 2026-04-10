import github from "../../assets/icons/github.svg";
import api from "../../assets/icons/api.svg";
import linkedin from "../../assets/icons/linkedin.svg";

export function Footer() {
  return (
    <footer className="
      p-2
      bg-gradient-to-br
      from-background-100
      to-background-200
      text-text-950
    ">
      <div className="
          flex
          items-center
          w-full
          text-center
        ">
        <span className="
          w-full
        ">Proyecto Realizado por Iván Fernández Méndez</span>
      </div>
      <div className="
      flex
      justify-between
      ">
        <div className="
          w-fit
          flex
          gap-2
          cursor-pointer
          items-center
        ">
          <img src={linkedin} alt="Icono de LinkedIn" className="w-8" />
          <span className="mt-1">LinkedIn</span>
        </div>
        <div className="
          w-fit
          flex
          gap-2
          cursor-pointer
          items-center
        ">
          <img src={api} alt="Icono de Api" className="w-8" />
          <span className="mt-1">Api - Repository</span>
        </div>
        <div className="
          w-fit
          flex
          gap-2
          cursor-pointer
          items-center
        ">
          <img src={github} alt="Logo de GitHub" className="w-8" />
          <span className="mt-1">Repository</span>
        </div>
      </div>
    </footer>
  )
}