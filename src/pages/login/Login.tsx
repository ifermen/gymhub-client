import { useState, type ChangeEvent, type SubmitEvent } from "react";
import logo from "../../assets/icons/logo.svg";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import "./login.css";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export default function Login() {
  const { login: loginContext } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formLoginDefault = {
    email: "",
    password: "",
  };
  const [formLogin, setFormLogin] = useState(formLoginDefault);
  const [isLoginError, setIsLoginError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLogin((prevFormLogin) => ({
      ...prevFormLogin,
      [name]: value,
    }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    loginContext(formLogin.email, formLogin.password)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setIsLoginError(true);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  const btnGuest = () => {
    navigate("/home");
  };

  return (
    <main id="main-login">
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 border-r border-background-600 bg-background-950 px-10 sm:w-3/5 md:w-2/4 lg:w-1/3 xl:w-1/4">
        {isLoading ?
          <Loader />
          : <>
            <img src={logo} alt="Imagen de inicio de sesión" className="w-64" />
            <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
              {isLoginError ? (
                <p className="border-3 w-full rounded-3xl border-danger-500 bg-danger-900 px-3 pt-1 text-center text-lg font-bold text-danger-300">
                  Email o contraseña incorrecto
                </p>
              ) : null}
              <Input
                id="input-email"
                name="email"
                type="email"
                placeholder="Email"
                title="Email"
                value={formLogin.email}
                handleChange={handleChange}
              ></Input>
              <Input
                id="input-password"
                name="password"
                type="password"
                placeholder="Contraseña"
                title="Contraseña"
                value={formLogin.password}
                handleChange={handleChange}
              ></Input>
              <Button id="btn-submit" type="submit" handleClick={() => { }}>
                Iniciar Sesión
              </Button>
              <Button
                id="btn-submit"
                type="button"
                handleClick={btnGuest}
                variant="secondary"
              >
                Entrar como invitado
              </Button>
            </form>
          </>
        }
      </div>
    </main>
  );
}
