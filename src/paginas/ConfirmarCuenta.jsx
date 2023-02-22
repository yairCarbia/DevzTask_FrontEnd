import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import image from "../../public/pexels-photo-2310642.jpeg"
import axios from "axios";
import Alerta from "../components/Alerta";
const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [alerta, setAlerta] = useState({});
    const params = useParams();
    const { token } = params;
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${token}`;
                const { data } = await axios(url);
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        };
        confirmarCuenta();
    }, [])
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

                <h2 className="text-3xl mb-4 text-center">Confirmar cuenta.</h2>
                <p className="text-black text-center mb-4">Confirma tu cuenta y empeza a crear tus proyectos.</p>
                {msg && <Alerta alerta={alerta} />}
                {cuentaConfirmada && (
                    <Link className="text-center m-5 inline-block align-baseline font-bold text-3xl   text-black
                       hover:text-purple-500 hover:list-disc  hover: decoration-purple-500 hover:underline"
                        to="/">
                        Ingresar
                    </Link>
                )}

            </div>




        </>
    )
}

export default ConfirmarCuenta