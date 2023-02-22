import React from 'react'

const Alerta = ({ alerta }) => {
    return (
        <div className={`${alerta.error ? 'from-red-500 to-red-800' : ' from-green-400 to-green-800 '} 
        bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white  text-sm font-bold my-10`}>{alerta.msg}</div>
    )
}

export default Alerta