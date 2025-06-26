import { Metadata } from "next";
import "./globals.css";
import Providers from "./context/Providers";

export const metadata: Metadata = {
    title: "Salud360",
    description: "App make for Diogenes Fermin"
};

const RootLayout = ({children} : Readonly<{children: React.ReactNode}>)=>{
    return (
    
        <html lang="en">

            <body>
                <Providers> {children} </Providers>
            </body>
        
        </html>
)   
}

export default RootLayout
