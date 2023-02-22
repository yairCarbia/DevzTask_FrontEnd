import React from 'react'
import { useEffect } from 'react';
import PreviewProyecto from '../components/PreviewProyecto';
import useProyectos from '../hooks/useProyectos';
import Alerta from '../components/Alerta';

const Proyectos = () => {
    const { proyectos, alerta } = useProyectos();



    const { msg } = alerta;
    return (
        <>
            <h1 className='text-4xl font-black'>Proyectos</h1>

            {msg && <Alerta alerta={alerta} />}
            <div className='bg-white shadow mt-10 rounded-md'>
                {
                    proyectos.length ?
                        proyectos.map(proyecto => (
                            <PreviewProyecto
                                key={proyecto._id}
                                proyecto={proyecto}
                            />
                        ))

                        : <p
                            className='text-center text-purple-600 uppercase p-5'>No hay proyectos aun</p>
                }
            </div>
        </>
    )
}

export default Proyectos