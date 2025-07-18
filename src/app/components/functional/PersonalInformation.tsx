import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image"
import { useRef, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6"
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";

const PersonalInformation = () => {

    const {user, udatePhotoProfile} = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);
    const [loadingPhoto, setloadingPhoto] = useState<boolean>(false);

    if(!user)return;

    const onHandleFileChange = async(e: React.ChangeEvent<HTMLInputElement>)=>{

    const {target} = e;
    const {files} = target;

    if(!files || files.length < 0) return;
    setloadingPhoto(true);

    const resp = await udatePhotoProfile(files[0]);

    if(resp.results.error){
      toast.error(resp.results.msg);
    }else{
      toast.success(resp.results.msg)
    };

    setloadingPhoto(false)
  };

  const baseUrl = "https://res.cloudinary.com/dqclkzb8r/image/upload/v1751255114/smhiir9v3ymozitlgtqw.jpg";
  const urlPhoto = user.profilePhoto;

  const {name, email, lastname, phone} = user;

  return (
    <>
    <div className="bg-gray-50 rounded-lg animate-fade-in animate-delay-600 shadow-gray-800 shadow-md">
                {/* Title */}
                  <div className="flex p-3 justify-center gap-2">
                    <FaUserDoctor size={20} className="text-gray-800"/>
                    <span className="text-xl font-semibold text-gray-800">Personal Information</span>
                  </div>
    
                
                  <div className="flex flex-col gap-3 sm:flex-row ">
    
                  <div className="p-4 rounded-lg relative flex justify-center items-center">
    
                    <div className="flex justify-center items-center w-45 h-45">
    
                      {
                        loadingPhoto
                        ?(  
                          <div className="absolute z-10 flex h-full w-full items-center justify-center">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-rotate-360 animate-iteration-count-infinite"></div>
                          </div>
                        )
                        :(<></>)
                      }
                      
                      <Image src={ user.profilePhoto ? urlPhoto : baseUrl}
                      alt="userPhota"
                      width={100}
                      height={100}
                      className="object-cover w-full h-full rounded-full"
                      unoptimized
                      />
                      
                        
                    </div>
                  
                    <input 
                      type="file" 
                      ref={inputRef}
                      className="hidden"
                      accept="image/*"
                      disabled={loadingPhoto}
                      name="userphoto"
                      onChange={onHandleFileChange}
                    />
                    <button 
                      className="absolute right-2 bottom-3"
                      onClick={()=> inputRef.current?.click()}
                    ><CiCirclePlus 
                      size={35} 
                      strokeWidth={0.5}
                      className="bg-blue-500 rounded-3xl w-fit text-white hover:bg-blue-700"/>
                    </button>
                  </div>
    
                <div className="p-4 rounded-lg">
                  <p><span className="font-bold">Name:</span> {name}</p>
                  <p><span className="font-bold">Lastname:</span> {lastname}</p>
                  <p><span className="font-bold">Email:</span> {email}</p>
                  <p><span className="font-bold">Phone:</span> {phone}</p>
                  </div>
    
                </div>
    
              </div>
    </>
  )
}

export default PersonalInformation
