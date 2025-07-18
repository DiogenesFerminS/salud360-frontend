import { Metadata } from "next";
import "../globals.css";
import Providers from "../context/Providers";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/ui/Sidebar";

export const metadata: Metadata = {
    title: "Salud360",
};

const PrivateLayout = ({children} : Readonly<{children: React.ReactNode}> )=>{

    return(
    <>
    <Providers>
        <Sidebar/>
             <main className="min-h-screen container min-w-full flex bg-blue-600">
 
            <Toaster
                position="top-right"
                
                toastOptions={{
                    success:{
                        style:{
                            background: "#abffad"
                        }
                    },
                    error:{
                        style:{
                            background: "ffabab"
                        }
                    }
                }}
                />
            
                {children}
            </main>
       
    </Providers> 
    </>
    )
};

export default PrivateLayout;