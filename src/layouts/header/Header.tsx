import logo from "../../assets/icons/logo.svg"

export function Header(){
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
        ">
        <img src={logo} alt="Logo de GymHub" className="w-16" />
        <h1 className="font-extrabold text-5xl h-full">GymHub</h1>
      </div>
      <div className="
          w-fit
          flex
          items-center
        ">
        <span className="text-xl">Username</span>
      </div>
    </header>
  )
}