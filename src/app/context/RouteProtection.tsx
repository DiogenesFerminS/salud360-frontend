'use client';

import { ReactNode} from "react";
import { useAuth } from "../hooks/useAuth";

const RouteProtection = ({children} : {children : ReactNode}) => {

    const {auth} = useAuth();
    console.log(auth);

  return (
    <>
     {children}
    </>
  )
}

export default RouteProtection;