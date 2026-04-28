import { useState, useEffect, useRef } from "react";
import logo from "../../assets/icons/logo.svg";
import profile from "../../assets/icons/profile-white.svg";
import burger from "../../assets/icons/burger.svg";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { NavMenu } from "../navMenu/NavMenu";
import { NavModal } from "../../components/NavModal/NavModal";
import { LineHorizontal } from "../../components/Line/LineHorizontal";

export function Header() {
  const { user } = useUserContext();
  const navegate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const clickProfileHandler = () => {
    navegate("/profile");
  };

  const clickBrandHandler = () => {
    navegate("/home");
  };

  const handleBurgerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-gradient-to-br from-background-100 to-background-200 text-text-950">
        <div className="flex flex-row justify-between p-2">
          <div className="flex sm:hidden relative">
            <button
              ref={burgerRef}
              onClick={handleBurgerClick}
              className="bg-transparent border-none cursor-pointer"
              aria-label="Menú de navegación"
            >
              <img src={burger} alt="Menú" className="w-8" />
            </button>
            <NavModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} role={user?.role} ignoreRef={burgerRef} />
          </div>
          <div
            className="flex w-fit cursor-pointer items-center sm:gap-2 gap-0.5"
            onClick={clickBrandHandler}
          >
            <img src={logo} alt="Logo de GymHub" className="w-8 sm:w-16" />
            <h1 className="mt-2 h-fit text-2xl font-extrabold sm:text-5xl">
              GymHub
            </h1>
          </div>
          <div
            onClick={clickProfileHandler}
            className="flex w-fit cursor-pointer items-center gap-2"
          >
            <span className="mt-1 hidden h-fit text-2xl sm:block">
              {user?.name}
            </span>
            <img src={profile} alt="Logo de GymHub" className="w-8 sm:w-16" />
          </div>
        </div>
        <LineHorizontal variant="white"></LineHorizontal>
        <NavMenu></NavMenu>
      </header>
    </>
  );
}
