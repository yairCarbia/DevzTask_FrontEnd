import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";
import image from "../../public/pexels-photo-2310642.jpeg";
const OlvidePassword = () => {
    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || email.length < 6) { setAlerta({ msg: "Mail obligatorio.", error: true }) }
        try {

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`, { email })
            setAlerta({
                msg: data.msg,
                error: false
            })
            console.log(data);
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
            <div className="w-full lg:w-1/2 py-16 px-12">
                <h2 className="text-3xl mb-4 text-center">Olvide mi contraseña</h2>

                <form className="" onSubmit={handleSubmit}>
                    {msg && <Alerta alerta={alerta} />}
                    <div className=" sm:flex flex-row w-full  lg:flex justify-between ">


                        {/* Email */}
                        <div className="w-full">

                            <input type="email" placeholder="Email"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>


                    </div>


                    <button className="mt-2 bg-purple-700 hover:bg-purple-900 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm" type="submit">Ingresar</button>

                </form>
                <nav className="lg:flex justify-center mt-5  ">
                    <Link class="m-5 inline-block align-baseline font-bold text-sm   text-black
                        hover:text-purple-500 hover:list-disc  hover: decoration-purple-500 hover:underline"
                        to="/">
                        Ingresar
                    </Link>
                    <Link class="m-5 inline-block align-baseline font-bold text-sm text-black
                         hover:text-purple-500  hover: decoration-purple-500 hover:underline "
                        to="/registrar">
                        Registrarse
                    </Link>
                </nav>
            </div>




        </>
    )
}

export default OlvidePassword