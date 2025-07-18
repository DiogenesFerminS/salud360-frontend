"use client"

import { useAuth } from "@/app/hooks/useAuth";
import { useState } from "react"
import { CgProfile } from "react-icons/cg";
import { FaArrowLeft, FaArrowRight, FaHome, FaMoneyCheck, FaRegCalendarAlt } from "react-icons/fa"
import { TbReportSearch } from "react-icons/tb";
import { TfiAgenda } from "react-icons/tfi";

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const {user} = useAuth();

  return (
    // Sidebar
<aside className="fixed top-0 left-0 z-10">

    {/* Button Open/close */}
    <button className="absolute -right-4 top-3 z-10"
        onClick={()=> setIsOpen(!isOpen)}
    >
        <div className="bg-blue-500 rounded-full p-2 hover:bg-blue-800 transition-all">
            {
                isOpen
                ?(<FaArrowLeft size={20} className="text-white"/>)
                :(<FaArrowRight size={20} className="text-white"/>)
            }     
        </div>   
    </button>

    {/* navitems */}
<div className={`min-h-screen bg-gray-50 ${isOpen ? "w-35 animate-slide-in-left animate-duration-300" : "w-fit"} flex flex-col justify-center shadow-black shadow-md`}>


        <div className="flex gap-2 items-center justify-start p-2">
            <FaHome size={25} className="text-blue-500 hover:text-blue-800 transition-all"/>
            {
                isOpen
                ?(<span className="font-semibold hover:underline transition-all">Home</span>)
                :(<></>)
            }
        </div>
    
        <div className="flex gap-2 items-center justify-start p-2">
            <FaRegCalendarAlt size={22} className="text-blue-500 hover:text-blue-800 transition-all"/>
            
            {
                isOpen
                ?(<span className="font-semibold hover:underline transition-all">Agenda</span>)
                :(<></>)
            }
        </div>

        <div className="flex gap-2 items-center justify-start p-2">
            <TfiAgenda size={22} className="text-blue-500 hover:text-blue-800 transition-all"/>
            {
                isOpen
                ?(<span className="font-semibold hover:underline transition-all">Historial</span>)
                :(<></>)
            }
        </div>
        
        <div className="flex gap-2 items-center justify-start p-2">
            <FaMoneyCheck size={22} className="text-blue-500 hover:text-blue-800 transition-all" />
            {
                isOpen
                ?(<span className="font-semibold hover:underline">Honorarios</span>)
                :(<></>)
            }
        </div>

        <div className="flex gap-2 items-center justify-start p-2">
            <TbReportSearch size={25} className="text-blue-500 hover:text-blue-800 transition-all"/>
            {
                isOpen
                ?(<span className="font-semibold hover:underline transition-all">Reports</span>)
                :(<></>)
            }
        </div>

        <div className="flex gap-2 items-center justify-start p-2">
        <CgProfile size={25} className="text-blue-500 hover:text-blue-800 transition-all"/>
        {
            isOpen
            ?(<span className="font-semibold hover:underline transition-all">{user?.name}</span>)
            :(<></>)
        }
    </div>
</div>

</aside>
  )
}

export default Sidebar
