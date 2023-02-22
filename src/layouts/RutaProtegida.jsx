import { Outlet, Navigate } from "react-router-dom"

import useAuth from "../hooks/useAuth"
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
const RutaProtegida = () => {
    const { auth, cargando } = useAuth();
    console.log(auth);
    if (cargando) return "Cargando...."
    return (
        <>
            {auth._id ? (
                <div>
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />
                        <main className="p-10 flex-1 from-purple-300 to-purple-500 bg-gradient-to-t">
                            <Outlet />
                        </main>
                    </div>

                </div>

            ) : <Navigate to="/" />}
        </>
    )
}

export default RutaProtegida