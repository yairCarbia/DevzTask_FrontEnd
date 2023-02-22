import FormularioColaborador from "../components/FormularioColaborador"
import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
const NuevoColaborador = () => {
    const params = useParams();
    const { obtenerProyecto, proyecto, colaborador, cargando, agregarColaborador, alerta } = useProyectos();
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])
    if (!proyecto?._id) return <Alerta alerta={alerta} />

    return (
        <>

            <h1 className='text-4xl font-black '>Añadir colaborador al Proyecto : {proyecto.nombre}</h1>
            <div className='mt-10 flex justify-center'>
                <FormularioColaborador />

            </div>

            {cargando ? (
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-spin h-10 w-10 mr-3 bg-purple-500 rounded-md">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>

            ) : colaborador?._id && (
                <div className="flex justify-center mt-10">

                    <div className="bg-white py-10 px-5  md:w-1/2 rounded-lg shadow w-full">
                        <h2 className="text-center mb-10 text-2xl font-bold" >Resultado: </h2>
                        <div className="flex flex-col lg:flex-col  justify-between items-center">
                            <p className="text-2xl font-black">{colaborador.nombre}</p>

                            <button onClick={() => agregarColaborador({
                                email: colaborador.email
                            })} type="button" className="bg-green-600 hover:bg-green-700 px-5 py-2 mt-2 rounded-lg uppercase font-bold text-white">Agregar al proyecto</button>
                        </div>

                    </div>
                </div>
            )
            }



        </>
    )
}

export default NuevoColaborador