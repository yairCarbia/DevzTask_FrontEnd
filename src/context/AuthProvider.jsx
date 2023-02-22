import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
//Creat contexto

const AuthContext = createContext();
//Provedor de datos
const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    const navigate = useNavigate();
    useEffect(() => {

        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token")

            if (!token) { setCargando(false); return; }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`;
                const { data } = await axios(url, config);
                setAuth(data);

            } catch (error) {
                setAuth({});
            } finally {
                setCargando(false);
            }
        }

        autenticarUsuario();

    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth, cargando,
                cerrarSesionAuth
            }}
        >

            {children}
        </AuthContext.Provider>
    )
};

export {
    AuthProvider
}
export default AuthContext;