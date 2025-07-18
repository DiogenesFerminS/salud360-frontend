'use client';

import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { PhotoResult, User, Offices, OfficesResult } from "../types/context/types";

const AuthProvider = ({children} : {children : ReactNode})=>{

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [offices, setOffices] = useState<Offices[] | null>(null);

    useEffect(()=>{
        const authUser = async ()=> {
            try {
                const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/users/profile`
                const data = await fetch(url,{
                    headers:{
                        "Content-Type": "application/json",
                        
                    },
                    credentials:'include'
                });

                const user = await data.json();
                setUser(user);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setUser(null);
                setLoading(false)
            };

        };
        authUser();
    }, []);

      useEffect(()=>{
        const getOffices = async()=>{
        const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/offices/`;
        const resp = await fetch(url,{
        method: "GET",
        credentials: "include",
      });
        const result = await resp.json();
        setOffices(result.results);
        }
        getOffices();

    }, []);

    const udatePhotoProfile = async(file: File | null) : Promise<PhotoResult> =>{
        if(!file){
            return {results : {url:"", msg:"File empty", error:true}};
        };

        const formData = new FormData();        
        formData.append('userPhoto', file);

        try {
            const urlF = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/users/addprofilephoto`;
            const resp = await fetch(urlF,{
                method: "POST",
                body: formData,
                credentials: 'include'
            });

            if(!resp.ok){
                return {results: {url:"", msg:"Error updating", error: true}}
            };

            const response = await resp.json();

            const {url, msg} = response.result;

            setUser(prevUser =>{
                if(!prevUser) return prevUser;
                return{
                    ...prevUser,
                    profilePhoto:url
                };
            });

            return {results: {url:"", msg, error:false}}

        } catch (e) {
            if(e instanceof Error){
                return {results: {url:"", msg:e.message, error:true}}
            }
            return {results: {url:"", msg:"Update photo failed", error:true}}
        }
    };

    const addOffice = async(office : {name: string, office_address: string, city:string, phone:string}) : Promise<OfficesResult>=>{

        if(!office){
            return {results: {error:true, msg:"Office is empty"}}
        };

        try {
            const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/offices/add-office`;
            const resp = await fetch(url,{
                headers:{
                    "Content-Type": "application/json"
                },
                method:"POST",
                body: JSON.stringify(office),
                credentials:"include"
            });

            if(!resp.ok){
                return {results: {error:true, msg:"Add office failed"}};
            }

            const {results} = await resp.json();
            setOffices(prevOffice => [...(prevOffice || []), results.newOffice]);
            return {results: {error:false, msg:"Office added successfully"}}
        } catch (e) {
            if(e instanceof Error){
                return {results: {error:true, msg:e.message}}
            }
            return {results: {error:true, msg:"Add office failed"}}
        }
    };

    const deleteOffice = async(id: string)=>{

        if(!id){
            return {results: {error:true, msg:"Office is empty"}}
        };

        try {
            const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/offices/${id}`;
            const resp = await fetch(url, {
                method:"DELETE",
                credentials:"include",
            })

            if(!resp.ok){
                return{results:{error:true, msg:"Delete office failed"}};
            }

            const {message} = await resp.json();
            const filteredOffices = offices?.filter(office => (office.id != id)) || [];
            
            setOffices(filteredOffices);

            return{results: {error:false, msg:message}};
        } catch (e) {
            if(e instanceof Error){
                return {results: {error:true, msg:e.message}}
            }
            return {results: {error:true, msg:"Add office failed"}}
        }
    }

    return(

        <AuthContext.Provider value = {{user, setUser, loading, udatePhotoProfile, offices, addOffice, deleteOffice}}>
             {children}
        </AuthContext.Provider>
        
    );
};

export default AuthProvider;