import { Metadata } from "next";
import "../globals.css";
import RouteProtection from "../context/RouteProtection";

export const metadata: Metadata = {
    title: "Salud360",
};

const PrivateLayout = ({children} : Readonly<{children: React.ReactNode}> )=>{

    return(
    <main className="min-h-screen bg-blue-600 container min-w-full">
        <RouteProtection>
            {children}
        </RouteProtection>
    </main>
    )
};

export default PrivateLayout;