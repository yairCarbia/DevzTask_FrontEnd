import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"
const Header = () => {
    const { cerrarSesionAuth } = useAuth();
    const { cerrarSesionProyectos } = useProyectos();
    const handleCerrarSesion = () => {
        cerrarSesionProyectos();
        cerrarSesionAuth();
        localStorage.removeItem("token");
    }
    return (
        <header className='px-4 py-5 bg-gray-200 '>
            <div className='md:flex md:justify-between'>
                <h2 className='text-5xl mb-5 md:mb-0  text-purple-600  font-extralight text-center'>DevzTask</h2>


                <div className="flex flex-col md:flex-row items-center gap-4 ">


                    <button
                        onClick={handleCerrarSesion}
                        type="button" className=" from-red-400 :hover to-red-800 bg-gradient-to-br text-white p-3 rounded-md uppercase font-bold">Cerrar sesion</button>
                </div>
            </div>


        </header >
    )
}

export default Header