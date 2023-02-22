import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Colaborador from '../components/Colaborador'
import Tarea from '../components/Tarea'
import Alerta from '../components/Alerta'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import useAdmin from '../hooks/useAdmin'
import io from "socket.io-client"
let socket;
const Proyecto = () => {
    const params = useParams();
    const { obtenerProyecto,
        cargando, setCargando,
        proyecto,
        handleModalTarea,
        alerta,
        submitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea, } = useProyectos();

    const admin = useAdmin();

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('abrir proyecto', params.id)
    }, [])

    useEffect(() => {
        socket.on("tarea agregada", tareaNueva => {
            if (tareaNueva.proyecto === proyecto._id) {
                submitTareasProyecto(tareaNueva)
            }
        })

        socket.on('tarea eliminada', tareaEliminada => {
            if (tareaEliminada.proyecto === proyecto._id) {
                eliminarTareaProyecto(tareaEliminada)
            }
        })

        socket.on('tarea actualizada', tareaActualizada => {
            if (tareaActualizada.proyecto._id === proyecto._id) {
                actualizarTareaProyecto(tareaActualizada)
            }
        })

        socket.on('nuevo estado', nuevoEstadoTarea => {
            if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
                cambiarEstadoTarea(nuevoEstadoTarea)
            }
        })
    })
    const { nombre, } = proyecto
    const { msg } = alerta;
    return (
        (

            cargando ? (

                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-spin h-10 w-10 mr-3 bg-purple-500 rounded-md">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>

            ) : (
                <>
                    <h1 className='font-black text-4xl'>
                        {nombre}
                    </h1>
                    <div className='flex justify-between'>

                        {admin && (<button
                            onClick={handleModalTarea}

                            type='button' className=' flex gap-1 m-3 text-sm items-center justify-center px-2 py-2 w-full md:w-auto rounded-lg uppercase font-bold bg-purple-700 hover:bg-purple-900 text-white text-center' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-center w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nueva tarea
                        </button>)}
                        {admin &&
                            <div className='flex justify-between'>


                                <div className='flex items-center gap-2 bg-indigo-800 rounded-lg p-2  text-gray-400 hover:text-black hover:font-bold uppercase'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    <Link
                                        to={`/proyectos/editar/${params.id}`}
                                    >Editar</Link>


                                </div>
                            </div>}


                    </div>
                    <p className='font-bold text-xl mt-10'>Tareas del proyecto</p>

                    <div className='bg-white shadow mt-10 rounded-lg'>

                        {
                            proyecto.tareas?.length ? proyecto.tareas?.map(tarea => (
                                <Tarea key={tarea._id} tarea={tarea} />
                            )) :
                                <p className='text-center my-5 p-5 font-bold text-black'>No hay tareas en este proyecto</p>
                        }
                    </div>
                    {admin && (<>       <div className='flex flex-col lg:flex-row items-center  justify-between mt-10'>
                        <p className='font-bold text-4xl'>Colaboradores</p>
                        <Link
                            className=' flex gap-1 m-3 text-sm items-center justify-center bg-indigo-800 rounded-lg p-2 text-white hover:text-black hover:font-bold uppercase'
                            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-center w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>Añadir</Link>
                    </div>
                        <div className='bg-white shadow mt-10 rounded-lg'>

                            {
                                proyecto.colaboradores?.length ? proyecto.colaboradores?.map(colaborador => (
                                    <Colaborador key={colaborador._id} colaborador={colaborador} />
                                )) :
                                    <p className='text-center my-5 p-5 font-bold text-black'>No hay colaboradores en este proyecto</p>
                            }
                        </div>
                    </>)}


                    <ModalFormularioTarea />
                    <ModalEliminarTarea />
                    <ModalEliminarColaborador />
                </>

            )

        )
    )
}

export default Proyecto