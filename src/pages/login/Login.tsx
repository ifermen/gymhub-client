import { useState, type ChangeEvent, type SubmitEvent } from "react";
import logo from "../../assets/icons/logo.svg"
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import "./login.css";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { loginContext } = useUserContext();
  const navigate = useNavigate();

  const formLoginDefault = {
    email: "",
    password: ""
  }
  const [formLogin, setFormLogin] = useState(formLoginDefault);
  const [isLoginError, setIsLoginError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLogin((prevFormLogin) => ({
      ...prevFormLogin,
      [name]: value
    }));
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginContext(formLogin.email, formLogin.password)
      .then(() => {
        navigate('/home')
      })
      .catch(error => {
        console.log(error)
        setIsLoginError(true);
      });
  }

  return (
    <main id="main-login">
      <div
        className="
          flex
          h-full
          gap-5
          w-full
          sm:w-3/5
          md:w-2/4
          lg:w-1/3
          xl:w-1/4
          flex-col
          items-center
          justify-center
          bg-background-950
          px-10
          border-r
          border-background-600
        ">
        <img src={logo} alt="Imagen de inicio de sesión" className="w-64" />
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          {isLoginError ? (
            <p
              className="
                w-full
                pt-1
                px-3
                bg-danger-900
                border-3
                border-danger-500
                rounded-3xl
                text-center
                text-lg
                font-bold
                text-danger-300
              ">
              Email o contraseña incorrecto
            </p>
          ) : null}
          <Input
            id="input-email"
            name="email"
            type="email"
            placeholder="Email"
            value={formLogin.email}
            handleChange={handleChange}>
          </Input>
          <Input
            id="input-password"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formLogin.password}
            handleChange={handleChange}>
          </Input>
          <Button id="btn-submit" type="submit" handleClick={() => { }}>
            Iniciar Sesión
          </Button>
          <Button id="btn-submit" type="submit" handleClick={() => { }} variant="secondary">
            Entrar como invitado
          </Button>
        </form>
      </div>
    </main>
  );
}
