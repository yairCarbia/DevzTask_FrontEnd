import React from 'react'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'
import { formatearFecha } from '../../helpers/formatearFecha'
const Tarea = ({ tarea }) => {
    const admin = useAdmin();
    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()

    const { descripcion, nombre, _id, prioridad, estado, fechaEntrega } = tarea
    return (
        <div className='border-b border-gray-400 p-5 flex justify-between items-center'>
            <div>
                {/* Info */}
                <p className='mb-1 text-xl font-bold '>{nombre}</p>
                <p className='mb-1 text-lg text-gray-700 font-extralight uppercase'>{descripcion}</p>
                <p className='mb-1 text-xl'>{formatearFecha(fechaEntrega)}</p>
                <p className='mb-1 text-gray-600'>Prioridad: <span className='text-lg text-purple-600 uppercase font-bold'>{prioridad}</span> </p>
                {estado &&
                    <p className='text-xs bg-green-600 text-center rounded-lg uppercase font-bold p-1 w-auto text-white'>Completada por: {tarea.completado.nombre}</p>
                }
            </div>
            <div className='flex flex-col lg:flex-row gap-2'>
                {/* Edit */}
                {admin && (<button onClick={() => handleModalEditarTarea(tarea)} className='bg-indigo-600 hover:bg-indigo-800 m-2  px-4 py-3 text-white uppercase 
                font-bold text-sm rounded-lg'>Editar</button>)}

                <button
                    className={`${estado ? "bg-green-600 hover:bg-green-800" : "bg-gray-600 hover:gray-red-800"} m-2  px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() => completarTarea(_id)}>{estado ? "Completa" : "Incompleta"} </button>

                {admin && (
                    <button onClick={() => handleModalEliminarTarea(tarea)}
                        className='bg-red-600 px-4 hover:bg-red-800 m-2 py-3 text-white uppercase 
                font-bold text-sm rounded-lg'>Eliminar</button>
                )}


            </div>

        </div >
    )
}

export default Tarea