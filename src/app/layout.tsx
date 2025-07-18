import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Salud360",
    description: "App make for Diogenes Fermin"
};

const RootLayout = ({children} : Readonly<{children: React.ReactNode}>)=>{
    return (
    
        <html lang="en">

            <body>
                {children}
            </body>
        
        </html>
)   
}

export default RootLayout
