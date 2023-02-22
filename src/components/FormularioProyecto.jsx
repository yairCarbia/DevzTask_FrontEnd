import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';
const FormularioProyecto = () => {
    const [id, setId] = useState(null);

    const [nombre, setNombre] = useState("");

    const [descripcion, setDescripcion] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [cliente, setCliente] = useState("");
    const params = useParams();
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

    useEffect(() => {

        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split("T")[0])
            setCliente(proyecto.cliente)
        }

    }, [params])
    const handleSubmit = async e => {
        e.preventDefault();
        if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
            mostrarAlerta({ msg: "Todos los campos son obligatorios.", error: true })
            return;
        }
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });
        setId(null);
        setNombre("");
        setDescripcion("");
        setFechaEntrega("");
        setCliente("");
    };

    const { msg } = alerta;
    return (
        <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg' onSubmit={handleSubmit}>

            <div>
                <label className=' text-gray-700 uppercase font-bold text-sm' htmlFor='nombre'>Nombre Proyecto</label>
                <input id='nombre' type="text" className='border-2 w-full p-2 mt-2 
                placeholder-gray-400 rounded-md' placeholder='Nombre'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)} />
            </div>
            <div>
                <label className=' text-gray-700 uppercase font-bold text-sm' htmlFor='descripcion'>Descripcion</label>
                <input id='descripcion' type="text" className='border-2 w-full p-2 mt-2 
                placeholder-gray-400 rounded-md' placeholder='Descripcion'
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div>
                <label className=' text-gray-700 uppercase font-bold text-sm' htmlFor='fechaEntrega'>Fecha de Entrega</label>
                <input id='fechaEntrega' type="date" className='border-2 w-full p-2 mt-2 
                placeholder-gray-400 rounded-md' placeholder='Fecha de entrega'
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)} />
            </div>
            <div>
                <label className=' text-gray-700 uppercase font-bold text-sm' htmlFor='cliente'>Cliente</label>
                <input id='cliente' type="text" className='border-2 w-full p-2 mt-2 
                placeholder-gray-400 rounded-md' placeholder='Nombre'
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>
            <input className='bg-purple-500 mt-5 p-3 w-full rounded-md  hover:bg-purple-700   transition-colors' type='submit' value={id ? "Actualizar" : "Crear"} />
            {msg && <Alerta alerta={alerta} />}
        </form>
    )
}

export default FormularioProyecto