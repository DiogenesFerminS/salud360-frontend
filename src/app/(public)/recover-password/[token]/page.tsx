"use client"
import { Alert } from "@/app/components/ui/Alert";
import { isValidPassword } from "@/app/helpers/isValid/isValidPassword";
import { useForm } from "@/app/hooks/useForm";
import { AlertType } from "@/app/types/form/types";
import Link from "next/link";
import { FormEvent, use, useEffect, useState } from "react"
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const Page = ({params} : {params :Promise<{token: string}>}) => {

    const token = use(params);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordActive, setIsPasswordActive] = useState(false);
    const [passwordReset, setPasswordReset] = useState(false);
    const [errorForm, setErrorForm] = useState<AlertType>({
      error: false,
      isActive: false,
      msg: ""
    })
    const [hasError, setHasError] = useState<AlertType>({
      error: false,
      msg: "",
      isActive: false,
    });
    const {password, onInputChange, onResetForm} = useForm({
      initialForm:{
        password: "",
      },
    });

    useEffect(()=>{
      const isValidToken = async()=>{
        const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/users/recover-password/${token.token}`;

        try {
           const data = await fetch(url);

            if(!data.ok){
              const {message} = await data.json();

              setHasError({
                error: true,
                isActive: true,
                msg: message
              });
              return;

            };
              
        } catch (error) {
          
          if(error instanceof Error){
            setHasError({
              error:true,
              isActive: true,
              msg: "oops, an error has occurred"
            })
          };

        }
       

      }
      isValidToken();
    }, [token]);

    const handleSubmit = async(e : FormEvent)=>{
      e.preventDefault();

      const isValid = isValidPassword(password);

      if(!isValid){
        setErrorForm({
          error: true,
          msg: "Invalid password",
          isActive: true
        });
        return;
      }

      try {
        const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/users/recover-password/${token.token}`;
        
        const data = await fetch(url, {
          method:"POST",
          body: JSON.stringify({
            password
          }),
          headers: {
            "Content-Type" : "application/json"
          }
        });

        if(!data.ok){

          const {message} = await data.json();
          setErrorForm({
            msg: message,
            error: true,
            isActive: true
          });

          return;
        };

        const {message} = await data.json();

        setErrorForm({
          error: false,
          msg: message,
          isActive: true
        });

        setPasswordReset(true);
        onResetForm();

      } catch (error) {

        if(error instanceof Error){
          setHasError({
            msg:"oops, an error has occurred",
            error:true,
            isActive: true,
          });
        }
      }
    };

    const toggleShowPassword = (e: FormEvent)=>{
    e.preventDefault();
    setShowPassword(!showPassword);
    setIsPasswordActive(true);
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center md:flex-row p-3 gap-6">
            
      <section className="max-w-96 flex animate-fade-in-right animate-delay-600 p-4 lg:max-w-150">
              <div>
                {
                  hasError.isActive
                  ?(
                    <h1 className="text-4xl font-bold text-gray-50 text-center text-pretty">An <span className="text-red-400">error</span> has occurred, invalid or expired token</h1>
                  )
                  :(
                    <h1 className="text-4xl font-bold text-gray-50 text-center text-pretty">Reset your password and never lose <span className="text-cyan-400">access</span> to your account.</h1>
                  )
                }
            </div>
      </section>

      <section className="bg-gray-50 p-5 rounded-lg shadow-lg animate-fade-in-up min-w-90">
        
        {
          hasError.isActive
          ? <Alert msg={hasError.msg} error={hasError.error}/>
          :(
            <form  
            className="p-4 max-w-80 flex justify-center flex-col"
            onSubmit={handleSubmit}
          >
            {
              errorForm.isActive
              ?(<div className="mb-3">
                <Alert msg={errorForm.msg} error={errorForm.error}/>
              </div>)
              : <></>
            }
            <div>
                <label>
                      <span className="text-blue-400 text-lg font-semibold">New password:</span>

                      <div className="relative">
                      
                        <input 
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="password"
                        value={password}
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
                      {
                        (isPasswordActive)
                        ?(<span className="text-xs mt-2 text-gray-600 text-center block">The password must have at least 8 characters, including (uppercase, lowercase, number, special character, example: !@#$%^&*)</span>)
                        :(<></>)
                      }
                  </label>
            </div>               

            <input 
              type="submit" 
              value="Save new password"
              className="mt-6 bg-blue-400 py-2 px-4 w-full rounded-lg font-bold text-white hover:bg-blue-600 transition-colors"
            />
          </form>
          )
        }
        {
          passwordReset
          ?(<>
            <Link href="/login" className="mx-auto text-center block p-2 text-blue-500 underline">Sign in here</Link>
          </>)
          : <></>
        }
          
      </section>
    
    </div>
  )
}

export default Page