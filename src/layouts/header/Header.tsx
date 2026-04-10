import logo from "../../assets/icons/logo.svg"
import profile from "../../assets/icons/profile-white.svg"
import { useUserContext } from "../../contexts/UserContext"

export function Header() {

  const { user } = useUserContext();

  return (
    <header className="
        flex
        justify-between
        p-2
        bg-gradient-to-br
        from-background-100
        to-background-200
        text-text-950
      ">
      <div className="
          w-fit
          flex
          gap-1
          items-center
        ">
        <img src={logo} alt="Logo de GymHub" className="w-16" />
        <h1 className="font-extrabold text-5xl">GymHub</h1>
      </div>
      <div className="
          w-fit
          flex
          items-center
        ">
        <span className="text-xl">{user?.name}</span>
        <img src={profile} alt="Logo de GymHub" className="w-14" />
      </div>
    </header>
  )
}