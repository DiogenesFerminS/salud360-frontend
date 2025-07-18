"use client"
import { Alert } from "@/app/components/ui/Alert";
import { Modal } from "@/app/components/ui/Modal";
import { formValidator } from "@/app/helpers/formValidator";
import { useForm } from "@/app/hooks/useForm";
import { AlertType } from "@/app/types/form/types";
import Link from "next/link";
import { FormEvent, useState } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const Page = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { onInputChange, name, lastname, phone, email, password, onResetForm } = useForm({
    initialForm:{
      name:"",
      lastname: "",
      email: "",
      phone: "",
      password: "",
    }
  });

  const [hasError, setHasError] = useState<AlertType>({error:false, msg:"", isActive: false});
  const [isPasswordActive, setIsPasswordActive]= useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSubmit = async(e: FormEvent)=>{
    e.preventDefault();

    const ErrorMsg = formValidator({
      name,
      lastname,
      password,
      phone,
      email
    });

    if(ErrorMsg.length > 0){
      setHasError({
        error: true,
        msg: ErrorMsg,
        isActive: true
      });

      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/users`;
      const resp = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name,
          lastname,
          email,
          password,
          phone
        })
      });

      if(!resp.ok){
       const errorData = await resp.json();
       setHasError({
        error:true,
        msg:errorData.message,
        isActive:true
       });
       return;
      };

      setOpenModal(true);
      onResetForm();

    } catch (error : unknown) {
        if(error instanceof Error){
          setHasError({
            error:true,
            isActive:true,
            msg:"An error has occurred" 
          })
        }
    }
  };
    const toggleShowPassword = (e: FormEvent)=>{
    e.preventDefault();
    setShowPassword(!showPassword);
    setIsPasswordActive(true);
  };

  return (
    <>
    <Modal
      isOpen={openModal}
    >
      <div
        className="flex justify-center items-center p-4 animate-zoom-in flex-col"
      >
        <AiOutlineCheckCircle size="120" className="text-blue-400 "/>
        <div className="mt-4 text-center">
          <span className="font-semibold text-xl">Registration completed, check your email to confirm your account.</span>
        </div>
        <Link href={"/login"} className="mt-4 py-1 px-6 bg-blue-400 rounded-lg font-semibold uppercase text-xl text-white">Ok</Link>
      </div>
    </Modal>
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 md:flex-row p-3">
            <section className="max-w-80 flex animate-fade-in-right animate-delay-600 p-4 lg:max-w-150">

                  <div>
                      <h1 className="text-4xl font-bold text-gray-50 text-center">Register and start managing your <span className="text-cyan-400">business</span></h1>
                  </div>

            </section> 

            <section className="bg-gray-50 p-5 rounded-lg shadow-lg animate-fade-in-up max-w-90">

                <span className="text-3xl font-semibold mx-auto text-center block text-blue-400 mb-3">Get Started Now</span>

              {
                (hasError.isActive)
                ?(
                  <Alert msg={hasError.msg} error={hasError.error}/>
                )
                :(<></>)
              }

                <form
                onSubmit={handleSubmit} 
                className="p-4 max-w-80 flex justify-center flex-col">

                  <div>
                    <label>
                      <span className="text-blue-400 text-lg font-semibold">Name:</span>
                        <input 
                          autoComplete="off"
                          type="text" 
                          value={name}
                          name="name"
                          placeholder="Diogenes"
                          className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2"
                          onChange={onInputChange}
                        />
                    </label>
                  </div>
                  
                <div className="mt-3">
                  <label>
                      <span className="text-blue-400 text-lg font-semibold">Lastname:</span>
                      <input 
                        type="text" 
                        autoComplete="off"
                        value={lastname}
                        name="lastname"
                        onChange={onInputChange}
                        placeholder="Fermin"
                        className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2 "
                      />
                  </label>
                </div>
                  
                <div className="mt-3">
                  <label>
                      <span className="text-blue-400 text-lg font-semibold">Email:</span>
                      <input 
                        autoComplete="off"
                        type="text" 
                        placeholder="Correo@correo.com"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                        className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2 "
                      />
                  </label>
                </div>
                
                <div className="mt-3">
                  <label>
                    <span className="text-blue-400 text-lg font-semibold">Phone:</span>
                      <input 
                        autoComplete="off"
                        type="text" 
                        placeholder="04141234567"
                        value={phone}
                        name="phone"
                        onChange={onInputChange}
                        className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2 "
                      />
                  </label>
                </div>
                  
                <div className="mt-3">
                  <label>
                      <span className="text-blue-400 text-lg font-semibold">Password:</span>

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
                    value="Register"
                    className="mt-6 bg-blue-400 py-2 px-4 w-full rounded-lg font-bold text-white hover:bg-blue-600 transition-colors"
                  />

                  <Link 
                  href="/login"
                  className="mx-auto text-center block p-2 text-blue-500 underline"
                >You have an account?, log in here</Link>

                </form>
                
            </section>
    </div>
    </>
    
  )

}

export default Page