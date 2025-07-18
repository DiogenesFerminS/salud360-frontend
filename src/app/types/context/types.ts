import { Dispatch, SetStateAction } from "react";

export type Offices = {
    city: string;
    id: string;
    name: string;
    office_address: string;
    phone: string;
}


export type User = {
    id: string,
    name: string,
    lastname: string,
    email: string,
    phone: string,
    profilePhoto: string,
}

export type AuthContextType = {
    user : User | null;
    setUser : Dispatch<SetStateAction<User | null>>;
    loading : boolean;
    udatePhotoProfile: (file:File)=> Promise<PhotoResult>;
    offices : Offices[] | null; 
    addOffice: (office : {name: string, city:string, office_address: string, phone:string})=> Promise<OfficesResult>;
    deleteOffice: (id:string)=> Promise<OfficesResult>
};

export type PhotoResult = {
    results:{
        url: string,
        msg: string,
        error: boolean,
    }
}

export type OfficesResult = {
    results:{
        error:boolean,
        msg: string,
    }
}