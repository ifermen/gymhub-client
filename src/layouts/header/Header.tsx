import logo from "../../assets/icons/logo.svg"
import profile from "../../assets/icons/profile-white.svg"
import { useUserContext } from "../../contexts/UserContext"
import { useNavigate } from 'react-router-dom';

export function Header() {

  const { user } = useUserContext();
  const navegate = useNavigate();

  const clickProfileHandler = () => {
    navegate("/profile")
  }

  const clickBrandHandler = () => {
    navegate("/home")
  }

  return (
    <header className="
        flex
        flex-row
        justify-between
        p-2
        bg-gradient-to-br
        from-background-100
        to-background-200
        text-text-950
      ">
      <div onClick={clickBrandHandler} className="
          w-fit
          flex
          gap-2
          cursor-pointer
          items-center
        ">
        <img src={logo} alt="Logo de GymHub" className="
          w-12
          sm:w-16
        " />
        <h1 className="
          font-extrabold
          text-2xl
          sm:text-5xl
          h-fit
          mt-2
        ">GymHub</h1>
      </div>
      <div onClick={clickProfileHandler} className="
          w-fit
          flex
          items-center
          cursor-pointer
          gap-2
        ">
        <span className="
          text-2xl
          hidden
          sm:block
          h-fit
          mt-1
        ">{user?.name}</span>
        <img src={profile} alt="Logo de GymHub" className="
          w-12
          sm:w-16
        " />
      </div>
    </header>
  )
}