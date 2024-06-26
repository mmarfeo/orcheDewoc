import { FormEvent, useEffect, useState } from "react";
import StyledLogin from "./styled";
import { BasicCredentials } from "../shared";
import { BarLoader } from "react-spinners";
import { theme } from "../settings.json";
import { useNavigate } from "react-router-dom";
import loginHandler from "./api";
/* import { FaRegUser } from "react-icons/fa"; */
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
/* import { MdHeight } from "react-icons/md"; */
/* import { height } from "@mui/system"; */
/* import { useState } from "react"; */
/* import imagen1 from '../img/vaso.jpg'; */
import imagenLogo from '../Login/Logo_Dewoc_Blanco.png';

function Login() {
    const [credentials, setCredentials] = useState<BasicCredentials>({ email: '', password: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const [pending, setPending] = useState<boolean>(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    
    const setEmail    = (email: string)     => { setCredentials(prevState => ({ ...prevState, email: email  })) }
    const setPassword = (password: string)  => { setCredentials(prevState => ({ ...prevState, password: password  })) }
    const navigate = useNavigate();

        /* Marcos: Mostrar contraseña */
        const [showPwd, setShowPwd] = useState(false)

    useEffect(() => { setLoading(false); }, [])
    
    const login = async (e: FormEvent<HTMLFormElement>, { email, password }: BasicCredentials) => {
        e.preventDefault();

        setPending(true);
        

        await loginHandler({ email, password })
                .then(d => { 

                    if(d.error) throw d.errorMsg;
                    else {
                        setPending(false);
                        setFeedbackMessage("Usuario autenticado correctamente. Serás redirigido al dashboard");

                        setTimeout(() => {
                            navigate("/dashboard");
                        }, 1500);
                    }
                })
            .catch(e => { setFeedbackMessage(e); setPending(false)} );
        
    }

    return !loading && <StyledLogin theme={theme}>
       {/*  <h1>Inicio de sesión</h1> */}

        <form onSubmit={(e: FormEvent<HTMLFormElement>) => login(e, credentials)}>
        <div>
                <img src={imagenLogo} alt="" />
            </div>

            <fieldset>

            <label htmlFor="email"><FaUser className="icono-usuario" />Email</label>
                <input type= "text" name="email" onChange={e => setEmail(e.target.value)}  />

            </fieldset>
            <fieldset>
            <label htmlFor="password"><FaLock className="icono-usuario" /> Contraseña</label>
               
               <input  type={showPwd ? "text" : "password"} name="password" onChange={e => setPassword(e.target.value)} />

               <div onClick={() => setShowPwd(!showPwd)}>
                        {showPwd ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                        <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                        </svg>}
                    </div>

            </fieldset>
            <button disabled={pending}>{pending ? <BarLoader color={theme.blueColor} /> : "Iniciar sesión"}</button>
        </form>
        <strong>{feedbackMessage}</strong>
    </StyledLogin>
}

export default Login;