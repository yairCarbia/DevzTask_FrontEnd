import { useState, useEffect, createContext, Children } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import EditarProyecto from "../paginas/EditarProyecto";
import Tarea from "../components/Tarea";
import useAuth from "../hooks/useAuth";
import io from "socket.io-client"
let socket;

const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {
    const { auth } = useAuth()

    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);

    const [tarea, setTarea] = useState({})
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({});
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false);



    const navigate = useNavigate();
    const mostrarAlerta = alerta => {
        setAlerta(alerta);

        setTimeout(() => { setAlerta({}) }, 2000)
    }
    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/proyectos`;
                const { data } = await axios(url, config);
                setProyectos(data);

            } catch (error) {
                console.log();
            }
        }
        obtenerProyectos();
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])


    const submitProyecto = async proyecto => {
        if (proyecto.id) {
            await editarProyecto(proyecto);
        } else {
            await nuevoProyecto(proyecto);
        }




    };
    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${proyecto.id}`;
            const { data } = await axios.put(url, proyecto, config);
            const proyectosActualizados = await proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState);
            console.log(data);
            setProyectos(proyectosActualizados);
            setAlerta({ msg: "Proyecto Actualizado correctamente 🙌", error: false })


            setTimeout(() => {
                setAlerta({});
                navigate("/proyectos")
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }
    const nuevoProyecto = async proyecto => {

        console.log("creando");
        try {

            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/proyectos`;
            const { data } = await axios.post(url, proyecto, config);
            //Volver a consultar la base para poder renderizar los nuevos proyectos creados.
            setAlerta({ msg: "Proyecto creado correctamente 🙌", error: false })
            setProyectos([...proyectos, data]);


            setTimeout(() => {
                setAlerta({});
                navigate("/proyectos")
            }, 3000);


            navigate("/proyectos");


        } catch (error) {
            console.log(error);
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`;

            const { data } = await axios(url, config)
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`;
            const { data } = await axios.delete(url, config)

            // Sincronizar el state
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea);
        setTarea({});
    }
    const submitTarea = async tarea => {

        if (tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }







    }
    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea.id}`;

            const { data } = await axios.put(url, tarea, config)

            setAlerta({})
            setModalFormularioTarea(false)

            // SOCKET
            socket.emit('actualizar tarea', data)
        } catch (error) {
            console.log(error)
        }
    }


    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/tareas`;

            const { data } = await axios.post(url, tarea, config)

            setAlerta({})
            setModalFormularioTarea(false)

            // SOCKET IO
            socket.emit('nueva tarea', data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditarTarea = async tarea => {
        setTarea(tarea);
        setModalFormularioTarea(true)

    }
    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }
    const eliminarTarea = async () => {

        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea._id}`
            const { data } = await axios.delete(url, config)
            setAlerta({
                msg: data.msg,
                error: false
            })

            setModalEliminarTarea(false)

            // SOCKET
            socket.emit('eliminar tarea', tarea)

            setTarea({})
            setTimeout(() => {
                setAlerta({})
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }



    const submitColaborador = async email => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores`;

            const { data } = await axios.post(url, { email }, config)

            setColaborador(data)
            setCargando(true)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false)
        }
    }

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores/${proyecto._id}`;

            const { data } = await axios.post(url, email, config)
            setAlerta({
                msg: data.msg,
                error: false
            })

            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const handleModalEliminarColaborador = async colaborador => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador);
    };
    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/proyectos/eliminar-colaborador/${proyecto._id}`;

            const { data } = await axios.post(url, { id: colaborador._id }, config)
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(item => item._id !== colaborador._id)
            setProyecto(proyectoActualizado)
            setAlerta({
                msg: data.msg,
                error: false
            })

            setColaborador({})
            setModalEliminarColaborador(false)

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const completarTarea = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/tareas/estado/${id}`
            const { data } = await axios.post(url, {}, config)
            setTarea({})
            setAlerta({})

            // socket
            socket.emit('cambiar estado', data)

        } catch (error) {
            console.log(error.response)
        }

    }

    const handleBuscador = () => {
        setBuscador(!buscador);
    }

    // Socket io
    const submitTareasProyecto = (tarea) => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado)
    }
    const eliminarTareaProyecto = tarea => {
        console.log(tarea)
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)
        console.log(proyectoActualizado)
        setProyecto(proyectoActualizado)
    }

    const actualizarTareaProyecto = tarea => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }
    const cambiarEstadoTarea = tarea => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    const cerrarSesionProyectos = () => {
        setProyectos([])
        setProyecto({})
        setAlerta({})
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                setProyecto,
                cargando,
                setCargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea, submitTarea,
                handleModalEditarTarea, tarea,
                modalEliminarTarea, setModalEliminarTarea,
                handleModalEliminarTarea, eliminarTarea,
                submitColaborador,
                colaborador, setColaborador, agregarColaborador,
                handleModalEliminarColaborador, modalEliminarColaborador, setModalEliminarColaborador, eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                eliminarTareaProyecto,
                actualizarTareaProyecto,
                cambiarEstadoTarea,
                cerrarSesionProyectos
            }}>
            {children}

        </ProyectosContext.Provider>
    );
};
export { ProyectosProvider }
export default ProyectosContext;