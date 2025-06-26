'use client';

import { createContext } from "react"
import { AuthContextType } from "../types/context/types";

export const AuthContext = createContext<AuthContextType | undefined >(undefined);