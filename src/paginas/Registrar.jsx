import { Link } from "react-router-dom";
import { useState } from "react";
import image from "../../public/pexels-photo-2310642.jpeg";
import Alerta from "../components/Alerta";
import axios from "axios";
const Registrar = () => {
    //Estado de Alerta.
    const [alerta, setAlerta] = useState({})
    //Estado Formulario.
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({
                msg: "Las contraseñas deben coincidir.",
                error: true
            })
            return;
        } if (password.length < 8) {
            setAlerta({
                msg: "Contraseña debil, mas de 8 caracteres",
                error: true
            })
            return;
        }
        //Para no motrar errores si paso la validaciones
        setAlerta({})
        //Crear user a traves de la API
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`
                , { nombre, email, password });
            // console.log(data)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setNombre("")
            setPassword("")
            setEmail("")
            setRepetirPassword("")
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    };

    //Extraer msg de la alerta en caso de que exista.
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
            <div className="w-full lg:w-1/2 py-16 px-12">
                <h2 className="text-3xl mb-4 text-center">Registrar</h2>
                <p className="text-black text-center mb-4">Crea tu cuenta.</p>
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit} >
                    <div className=" sm:flex flex-row w-full  lg:grid grid-cols-2 gap-5 ">
                        {/* Nombre  */}
                        <div className="w-full mb-3">

                            <input type="text" placeholder="Nombre"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={nombre} onChange={e => setNombre(e.target.value)} />
                        </div>
                        {/* Email */}
                        <div className="mb-3">

                            <input type="email" placeholder="Email"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        {/* Password */}
                        <div className="w-full mb-3">

                            <input type="password" placeholder="Contraseña" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        {/*  confirmar Password */}
                        <div className="w-full ">

                            <input type="password" placeholder="Confirmar Contraseña" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} />
                        </div>
                    </div>
                    <button className="mt-2 bg-purple-700 hover:bg-purple-900 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm" type="submit">Ingresar</button>
                </form>
                <nav className="lg:flex justify-center mt-5  ">
                    <Link className="m-5 inline-block align-baseline font-bold text-sm   text-black
                    hover:text-purple-500 hover:list-disc  hover: decoration-purple-500 hover:underline"
                        to="/">
                        Ingresar
                    </Link>
                    <Link className="m-5 inline-block align-baseline font-bold text-sm text-black
                     hover:text-purple-500  hover: decoration-purple-500 hover:underline "
                        to="/olvide-password">
                        Olvide mi contraseña
                    </Link>
                </nav>
            </div>




        </>)
}

export default Registrar
