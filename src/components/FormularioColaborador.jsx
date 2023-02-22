import React from 'react'
import Alerta from './Alerta'
import useProyectos from '../hooks/useProyectos'
import { useState } from 'react'
const FormularioColaborador = () => {
    const { mostrarAlerta, alerta, submitColaborador } = useProyectos();
    const [email, setEmail] = useState("")
    const handleSubmit = async e => {
        e.preventDefault();
        if (email === "") {
            mostrarAlerta({
                msg: "El campo email es obligatorio.",
                error: true
            })
            return;
        }

        submitColaborador(email)

    }
    const { msg } = alerta;
    return (
        <form
            className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta} />}
            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='email'
                >
                    Email Colaborador
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder='Email del Usuario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <input
                type="submit"
                className='bg-purple-700 hover:bg-purple-900 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
                value='Buscar Colaborador'
            />

        </form>
    )
}

export default FormularioColaborador