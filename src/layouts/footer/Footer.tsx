import github from "../../assets/icons/github.svg";
import api from "../../assets/icons/api.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import book from "../../assets/icons/book.svg";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-background-100 to-background-200 p-2 text-text-950">
      <div className="flex w-full items-center text-center">
        <span className="w-full">
          Proyecto Realizado por Iván Fernández Méndez
        </span>
      </div>
      <div className="flex justify-around flex-row">
        <a
          href="https://www.linkedin.com/in/iv%C3%A1n-fern%C3%A1ndez-m%C3%A9ndez-0a734a280/"
          className="flex w-full cursor-pointer items-center justify-center gap-2 sm:w-fit">
          <img src={linkedin} alt="Icono de LinkedIn" className="w-6 sm:w-8" />
          <span className="mt-1 hidden sm:block">LinkedIn</span>
        </a>
        <a
          href="https://gymhub-api.onrender.com/swagger-ui/index.html"
          className="flex w-full cursor-pointer items-center justify-center gap-2 sm:w-fit">
          <img src={book} alt="Icono de Api" className="w-6 sm:w-8" />
          <span className="mt-1 hidden sm:block">Api - Documentación</span>
        </a>
        <a
          href="https://github.com/JacarandaOlias/api-25-26-ifermen"
          className="flex w-full cursor-pointer items-center justify-center gap-2 sm:w-fit">
          <img src={api} alt="Icono de Api" className="w-6 sm:w-8" />
          <span className="mt-1 hidden sm:block">Api - Repositorio</span>
        </a>
        <a
          href="https://github.com/ifermen/gymhub-client"
          className="flex w-full cursor-pointer items-center justify-center gap-2 sm:w-fit">
          <img src={github} alt="Logo de GitHub" className="w-6 sm:w-8" />
          <span className="mt-1 hidden sm:block">Repositorio</span>
        </a>
      </div>
    </footer>
  );
}
