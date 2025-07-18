"use client"

import { Alert } from "@/app/components/ui/Alert";
import { isValidEmail } from "@/app/helpers/isValid/isValidEmail";
import { isValidPassword } from "@/app/helpers/isValid/isValidPassword";
import { useForm } from "@/app/hooks/useForm";
import { AlertType } from "@/app/types/form/types";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const Page = () => {

  const [hasError, setHasError] = useState<AlertType>({
    error:false,
    isActive:false,
    msg:""
  });

  const {onInputChange, email, password, onResetForm} = useForm({
    initialForm:{
      email: "",
      password: "",
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async(e:FormEvent)=>{
      e.preventDefault();
      
      if([password, email].includes("")){
          setHasError({
            error:true,
            isActive:true,
            msg:"All fields are required"
          });

          return;
      };

      const validEmail = isValidEmail(email);
      if(!validEmail){
        setHasError({
          error:true,
          isActive: true,
          msg:"Invalid email"
        });
        return;
      }

      const validPass = isValidPassword(password);
      if(!validPass){
        setHasError({
          error: true,
          isActive: true,
          msg:"Invalid password"
        });
        return;
      };
      
      try {
        const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/users/login`;

        const data = await fetch(url,{
          credentials:'include',
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        });

        if(!data.ok){
          const {message} = await data.json();
          setHasError({
            error:true,
            isActive:true,
            msg: message,
          });
          return;
        }

        setHasError({
          error:false,
          isActive:true,
          msg:"Logging in...",
        });

        onResetForm();
        router.push('/dashboard');

      } catch (error) {
        if(error instanceof Error){
          setHasError({
            error:true,
            isActive:true,
            msg: "An error has occurred"
          })
        }
      };

  };

  const toggleShowPassword = (e: FormEvent)=>{
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
     <div className=" min-h-screen flex flex-col justify-center items-center md:flex-row gap-8 p-3">
        <article className="max-w-96 flex animate-fade-in-right animate-delay-600 p-4 lg:max-w-150">
             <div>
                  <h1 className="text-4xl font-bold text-gray-50 text-center"><span className="text-cyan-400">Welcome back!</span> Log in and manage your patients.</h1>
              </div>
        </article>
    
        <article className="bg-gray-50 p-5 rounded-lg shadow-lg animate-fade-in-up w-90">
              <span className="text-3xl font-semibold mx-auto text-center block text-blue-400 mb-3">Welcome Back</span>

              {
                hasError.isActive 
                ?(
                    <Alert msg={hasError.msg} error={hasError.error}/>
                 )
                : <></>
              }

              <form 
              onSubmit={handleSubmit}
              className="p-4 max-w-80 flex justify-center flex-col ">

                <div>
                    <label>
                        <span className="text-blue-400 text-lg font-semibold">Email:</span>
                        <input 
                          type="text"
                          name="email"
                          autoComplete="off"
                          onChange={onInputChange}
                          value={email}
                          placeholder="Your email"
                          className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2"
                        />
                    </label> 
                </div>
               
                <div className="mt-3" >
                    <label>
                        <span className="text-blue-400 text-lg font-semibold">Password:</span>
                        <div className="relative">

                          <input 
                          type={`${showPassword ? 'text' : 'password'}`}
                          name="password"
                          value={password}
                          autoComplete="off"
                          onChange={onInputChange}
                          placeholder="Your password"
                          className="outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-3 flex-1 w-full"
                        /> 
                          <button 
                            onClick={toggleShowPassword}
                            className="absolute top-6 right-3 flex justify-center items-center">
                              {
                                showPassword
                                ?<IoEyeSharp size={20} color="#6D6D6D" />
                                :<FaEyeSlash size={20} color="#6D6D6D" />
                              }
                             
                          </button>
                         
                        
                        </div>
                        
                    </label>
                     
                </div>
               

                <input 
                  type="submit" 
                  value="Login"
                  className="mt-6 bg-blue-400 py-2 px-4 w-full rounded-lg font-bold text-white hover:bg-blue-600 transition-colors"
                />

                <Link 
                href="/recover-password"
                className="mx-auto text-center block p-2 text-blue-500 underline"
              >have you forgotten your password?</Link>

              <Link
                href="/register"
                className="mt-6 bg-blue-400 py-2 px-4 w-full rounded-lg font-bold text-white hover:bg-blue-600 transition-colors text-center"
              >Create Account</Link>
              </form>

        </article>
    </div>
  )
}

export default Page