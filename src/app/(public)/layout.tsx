import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Salud360",
    description: "App make for Diogenes Fermin"
};

const PublicLayout = ({children} : Readonly<{children: React.ReactNode}> )=>{
    return(
    <main className="min-h-screen bg-blue-600 container min-w-full">
        {children}
    </main>
    )
};

export default PublicLayout;