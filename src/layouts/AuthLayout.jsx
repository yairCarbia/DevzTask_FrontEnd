//Outlet importa los contenidos hijos del router.
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    const objStyle = {

        backgroundImage: "linear-gradient(115deg,#e4c5f8,#facece)",

    }

    return (
        <>
            <main className=" flex items-center justify-center h-screen w-screen" >
                <div className="flex flex-col lg:flex-row bg-gray-200 rounded-xl mx-auto shadow-2xl overflow-hidden ">
                    <Outlet />

                </div>


            </main >
            <p class="text-center text-gray-500 text-xs">
                &copy;2023 Yair Carbia <spam className="text-sm font-black text-purple-500">DevZ.</spam>
            </p>


        </>
    )
}

export default AuthLayout