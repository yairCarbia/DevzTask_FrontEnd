import image from "../../public/pexels-photo-2310642.jpeg"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Alerta from "../components/Alerta"
import axios from "axios"
const NuevoPassword = () => {

    const [password, setPassword] = useState("");
    const [passwordModificado, setPasswordModificado] = useState(false)
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const params = useParams();
    const { token } = params;
    useEffect(() => {
        const comprobarToken = async () => {

            try {
                await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`)
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }


        };
        comprobarToken();
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        if (password.length < 8) {
            setAlerta({
                msg: "La contraseña debe cotener mas de 8 caracteres.",
                error: true
            })
        }
        try {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`;
            const { data } = await axios.post(url, { password });
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true);
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
            {msg && <Alerta alerta={alerta} />}
            {tokenValido && (

                <div className="w-full lg:w-1/2 py-16 px-12">
                    <h2 className="text-3xl mb-4 text-center">Reestablecer contraseña</h2>
                    <p className="text-black text-center mb-4">Recupera tu contraseña y no pierdas acceso a tus proyectos.</p>
                    <form className="" onSubmit={handleSubmit}>
                        <div className=" sm:flex flex-row w-full  lg:flex justify-between ">

                            {/* Email */}
                            <div className="w-full">

                                <input type="password" placeholder="Nueva contraseña"
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </div>

                        </div>
                        <button className="w-full bg-purple-500 p-2 mt-2 rounded-sm text-center" type="submit">Guardar</button>
                    </form>

                </div>
            )}
            {passwordModificado && (
                <Link className="text-center m-5 inline-block align-baseline font-bold text-3xl   text-black
                       hover:text-purple-500 hover:list-disc  hover: decoration-purple-500 hover:underline"
                    to="/">
                    Ingresar
                </Link>
            )}



        </>)

}

export default NuevoPassword