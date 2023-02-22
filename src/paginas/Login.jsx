import { Link, Navigate } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import axios from "axios"
import image from "../../public/pexels-photo-2310642.jpeg"
import useAuth from "../hooks/useAuth"
const Login = () => {
    const [alerta, setAlerta] = useState({})
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([email, password].includes("")) { setAlerta({ msg: "Todos los campos son obligatorios", error: true }) }
        try {

            const { data } =
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, { email, password });
            localStorage.setItem("token", data.token)
            setAlerta({});
            setAuth(data)
            navigate("/proyectos")
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    };
    const { msg } = alerta;
    return (
        <>



            {/* image */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                <h1 className="text-white text-3xl font-bold mb-3">Bienvenido a <spam className="text-6xl font-extralight text-purple-500">DevzTask</spam></h1>
                <p className="text-white font-bold  p-2">¡Administra tus proyectos y tareas juntos a tus colaboradores!
                    Proyecto realizado por <spam className="text-2xl font-extralight  text-purple-500">Carbia Yair Fullstack Developer.</spam>
                </p>
            </div>


            {/* form */}
            <div className="w-full lg:w-full py-10 px-12 ">
                <h2 className="text-3xl mb-4 text-center">Ingresar</h2>

                <form className="" onSubmit={handleSubmit}>
                    <div className="flex flex-col  lg:flex-row justify-between w-full ">

                        {/* Email */}
                        <div className="w-full mb-3">

                            <input type="email" placeholder="Email"
                                className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        {/* Password */}
                        <div className="w-full mb-3">

                            <input type="password" placeholder="Contraseña" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button className="bg-purple-700 hover:bg-purple-900 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm" type="submit">Ingresar</button>
                </form>
                <nav className="lg:flex justify-center mt-5  ">
                    <Link class="m-5 inline-block align-baseline font-bold text-sm   text-black
                        hover:text-purple-500 hover:list-disc  hover: decoration-purple-500 hover:underline"
                        to="/registrar">
                        Registrarse
                    </Link>
                    <Link class="m-5 inline-block align-baseline font-bold text-sm text-black
                         hover:text-purple-500  hover: decoration-purple-500 hover:underline "
                        to="/olvide-password">
                        Olvide mi contraseña
                    </Link>
                </nav>
                {msg && <Alerta alerta={alerta} />}
            </div>




        </>
    )
}

{/* <nav className="lg:flex justify-center  ">
<Link class="m-2 inline-block align-baseline font-bold text-sm   text-white
     hover:text-yellow-500"
    to="/registrar">
    Registrarse
</Link>
<Link class="m-2 inline-block align-baseline font-bold text-sm  text-white
     hover:text-yellow-500"
    to="/olvide-password">
    Olvide mi contraseña
</Link>
</nav> */}
export default Login