"use client"

import FullSpinner from "@/app/components/FullSpinner";
import OfficePanel from "@/app/components/functional/OfficePanel";
import PersonalInformation from "@/app/components/functional/PersonalInformation";
import { useAuth } from "@/app/hooks/useAuth";

const Page = () => {

  const {loading} = useAuth();
  
  return (
    <>   
    {
      loading
      ? (
        <FullSpinner/>
      )
      :( 
        <div className="grid grid-cols-1 mx-auto gap-4 lg:grid-cols-2 h-fit p-6">

            <PersonalInformation/>

            <OfficePanel/> 
               
        </div>    
      )
    }
    </>
  )
}

export default Page;