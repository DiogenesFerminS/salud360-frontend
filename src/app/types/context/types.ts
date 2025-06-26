import { Dispatch, SetStateAction } from "react";

export type User = {
    id: string,
    name: string,
    lastname: string,
    email: string,
    phone: string
}

export type AuthContextType = {
    auth: User | null;
    setAuth: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
};