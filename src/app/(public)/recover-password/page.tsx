"use client"

import { Alert } from "@/app/components/ui/Alert";
import { isValidEmail } from "@/app/helpers/isValid/isValidEmail";
import { useForm } from "@/app/hooks/useForm"
import { AlertType } from "@/app/types/form/types";
import Link from "next/link"
import { FormEvent, useState } from "react";

const Page = () => {

  const {email, onInputChange, onResetForm} = useForm({
    initialForm: {
      email: "",
    },
  });

  const [hasError, setHasError] = useState<AlertType>({
    error: false,
    isActive: false,
    msg: "",
  })

  const handleSubmit = async(e: FormEvent)=>{
    e.preventDefault();

    const isValid = isValidEmail(email);
    
    if(!isValid){
      setHasError({
        error:true,
        msg:"Invalid email",
        isActive: true,
      });

      return;
    };

    try {
      const url = "http://localhost:3000/api/users/recover-password"
      const res = await fetch(url,
        {
          method: "POST",
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            email,
          }),
      });

      if(!res.ok){
        const {message} = await res.json();
        setHasError({
          error: true,
          msg:message,
          isActive: true
        });

        return;
      };

      const {message} = await res.json();

      setHasError({
        error:false,
        isActive: true,
        msg: message,
      })

      onResetForm();
      return;
      
    } catch (error) {
     if(error instanceof Error){

      setHasError({
        error:true,
        isActive:true,
        msg: "An error has occurred"
      });

     } 
    }
  }

  return (

    <div className="flex flex-col min-h-screen justify-center items-center md:flex-row p-3 gap-6">
        
        <section className="max-w-96 flex animate-fade-in-right animate-delay-600 p-4 lg:max-w-150">
        <div>
                  <h1 className="text-4xl font-bold text-gray-50 text-center">Forgot your password? <span className="text-cyan-400">Recover</span> it here.</h1>
              </div>
        </section>

        <section className="bg-gray-50 p-5 rounded-lg shadow-lg animate-fade-in-up max-w-90">

              <span className="text-3xl font-semibold mb-4 mx-auto text-center block text-blue-400">Recover your password</span>

            {
              hasError.isActive
              ?(<Alert msg={hasError.msg} error={hasError.error}/>)
              :<></>
            }
            <form  
              className="p-4 max-w-80 flex justify-center flex-col "
              onSubmit={handleSubmit}
            >
              <div>
                  <label>
                      <span className="text-blue-400 text-lg font-semibold">Email:</span>
                      <input 
                        type="text" 
                        value={email}
                        name="email"
                        autoComplete="off"
                        onChange={onInputChange}
                        placeholder="Your email"
                        className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2"
                      />
                  </label> 
              </div>               

              <input 
                type="submit" 
                value="Send Instructions"
                className="mt-6 bg-blue-400 py-2 px-4 w-full rounded-lg font-bold text-white hover:bg-blue-600 transition-colors"
              />
            </form>
            <Link
              href="/register"
              className="mx-auto text-center block p-2 text-blue-500 underline mt-3"
              >Dont have an account? Register here.</Link>

              <Link
              href="/login"
              className="mx-auto text-center block p-2 text-blue-500 underline mt-3"
              >Do you have an account? Sign in here.</Link>
        </section>

    </div>
  )
}

export default Page