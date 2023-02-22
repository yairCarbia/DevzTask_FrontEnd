import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda'
const Sidebar = () => {
    const { auth } = useAuth();
    const { handleBuscador, buscador } = useProyectos();
    return (
        <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 text-white '>

            <p className='text-4xl font-black text-black'>¡Bienvenido  {auth.nombre.toUpperCase()}!</p>
            <Link to="crear-proyecto"
                className='bg-purple-500 w-full p-3 text-center uppercase font-bold block mt-4 rounded-md 
                 hover:bg-purple-700 '>Nuevo proyecto</Link>
            <Link to=""
                className='bg-purple-500 w-full p-3 text-center uppercase font-bold block mt-4 rounded-md 
                 hover:bg-purple-700 '>Ver proyectos</Link>
            <button
                onClick={handleBuscador}
                type="button"
                className="bg-purple-500 w-full p-3 text-center uppercase font-bold block mt-4 rounded-md 
                hover:bg-purple-700 ">
                Buscar proyecto
            </button>
            <Busqueda />
        </aside>
    )
}

export default Sidebar