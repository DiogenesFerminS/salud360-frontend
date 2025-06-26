'use client';

import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../types/context/types";

const AuthProvider = ({children} : {children : ReactNode})=>{

    const [auth, setAuth] = useState< User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const authUser = async ()=> {
            const token = localStorage.getItem('salud360_token_auth');

            if(!token) return;

            try {
                const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/users/profile`
                const data = await fetch(url,{
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                const user = await data.json();
                setAuth(user);
            } catch (error) {
                console.log(error);
                setAuth(null);
            };

            setLoading(false);

        };
        authUser();
    }, [])

    return(

        <AuthContext.Provider value = {{auth, setAuth, loading}}>
             {children}
        </AuthContext.Provider>
        
    );
};

export default AuthProvider;