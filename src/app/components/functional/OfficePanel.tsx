import { HiOfficeBuilding } from "react-icons/hi"
import { Alert } from "../ui/Alert"
import { Modal } from "../ui/Modal"
import { FaRegTrashAlt } from "react-icons/fa"
import { FormEvent, useState } from "react"
import { useAuth } from "@/app/hooks/useAuth"
import toast from "react-hot-toast"
import { AlertType } from "@/app/types/form/types"
import { useForm } from "@/app/hooks/useForm"
import { CiCirclePlus } from "react-icons/ci"

const OfficePanel = () => {

    const {offices, addOffice, deleteOffice} = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
    
    const [alert, setAlert] = useState<AlertType>({
        error:false,
        msg:"",
        isActive:false
    });

  const {onInputChange, name, office_address, city, phone, onResetForm} = useForm({
    initialForm:{
      name:"",
      office_address:"",
      city:"",
      phone:"",
    }
  });

  const handleOpen = ()=>{
    setIsOpen(true);
  }

  const handleClose = ()=>{
    setAlert({
      msg:"",
      isActive: false,
      error:false,
    });
    onResetForm()
    setIsOpen(false)
  };

  const handleSubmit = async(e:FormEvent)=>{
    e.preventDefault();

    if([name, office_address, city, phone].includes("")){
      setAlert({
        isActive:true,
        msg:"All fields are required",
        error: true
      });
    };
      const newOffice = {
      name,
      city,
      office_address,
      phone
    }

    const {results} = await addOffice(newOffice);
    onResetForm();
    setIsOpen(false);
    
    if(results.error){
      toast.error(results.msg);
    }else{
      toast.success(results.msg);
    };

  };

  const handleDeleteOffice = async(id: string)=>{
    const {results} = await deleteOffice(id);
    if(results.error){
      toast.error(results.msg);
    }else{
      toast.success(results.msg);
    };
    setIsOpenDelete(false);
  };

  return (
    <>
    <Modal isOpen={isOpen}>
      <div>
        <span className="text-center block text-xl font-semibold text-gray-800 mb-2">Creates a New Office</span>
        {
            alert.isActive
            ?(
            <div className="max-w-100 mx-auto">
              <Alert error={alert.error} msg={alert.msg}/>
            </div>
            )
            :(<></>)
        }
        <form 
          className="p-2 mt-2"
          onSubmit={handleSubmit}
        >
         <div>
            <label>
              <span className="font-semibold text-gray-800">Name:</span>
              <input 
                type="text"
                name="name"
                placeholder="The name of your office"
                value={name}
                onChange={onInputChange} 
                autoComplete="off"
                className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2"
              />
            </label>
         </div>
         <div className="mt-3">
            <label>
              <span className="font-semibold text-gray-800">Address:</span>
              <input 
                type="text"
                name="office_address"
                placeholder="The address of your office"
                value={office_address}
                onChange={onInputChange} 
                autoComplete="off"
                maxLength={1000}
                className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2"
              />
            </label>
         </div>
         <div className="mt-3">
            <label>
              <span className="font-semibold text-gray-800">City:</span>
              <input 
                type="text"
                name="city"
                value={city}
                placeholder="In what city is your office located?"
                onChange={onInputChange} 
                autoComplete="off"
                className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2"
              />
            </label>
         </div>
         <div className="mt-3">
            <label>
              <span className="font-semibold text-gray-800">Phone:</span>
              <input 
                type="text"
                placeholder="Contact number with your office"
                name="phone"
                value={phone}
                maxLength={15}
                onChange={onInputChange} 
                autoComplete="off"
                className="w-full outline-0 bg-gray-200 py-2 px-4 rounded-lg focus:outline-2 focus:outline-blue-500 mt-2"
              />
            </label>
         </div>

         <div className="mt-5 flex justify-center gap-4">
          <input 
            className="py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-800 text-white font-semibold"
            type="submit" 
            value="Add Office"
          />

          <button
            onClick={handleClose}
            className="py-2 px-4 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-800"
          >Close</button>
         </div>
         
        </form>
      </div>
    </Modal>

    <Modal isOpen={isOpenDelete}>
        <div>
          <span className="block text-center mb-5 text-xl font-semibold">Delete Offices</span>
          {
            offices
            ?(
                <div className="flex flex-col gap-3">
                  {
                    offices.map(office=>(
                      <div key={office.id} className="flex items-center gap-2 bg-red-100 w-full rounded-lg p-2 justify-between">

                        <span className="font-semibold p-2">{office.name}</span>

                        <button 
                        onClick={()=> handleDeleteOffice(office.id)}
                        className="p-2 hover:bg-red-300 rounded-full">
                          <FaRegTrashAlt className="text-red-600"/>
                        </button>

                      </div>
                    ))
                  }
                  <div className="mx-auto mt-4">
                    <button
                      onClick={()=> setIsOpenDelete(false)}
                      className="py-2 px-4 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-800"
                    >Close</button>
                  </div>
                </div>
                
            )
            :(<></>)
          }
        </div>
        </Modal>

        <div className=" bg-gray-50 rounded-lg animate-fade-in animate-delay-300 mx-auto max-w-130 shadow-gray-800 shadow-md relative row-span-2 flex flex-col justify-center items-center">

            <div className="flex gap-2 items-center justify-center p-3">
                    <HiOfficeBuilding size={22} className="text-gray-800"/>
                    <span className="text-xl font-semibold text-gray-800">Offices</span>
            </div>
            <div className="p-1">
                {
                (offices !== null && offices?.length > 0)
                ?(
                <>
                    <table className="w-full">
                    <thead className="hidden md:table-header-group">
                    <tr className="bg-blue-500 text-white">
                        <th className="p-3">Name</th>
                        <th className="p-3">Adress</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Phone</th>
                    </tr>
                    </thead>
                    {
                    offices.map(office=>(
                    <tbody key={office.id}>
                    <tr className="block md:table-row mb-4 md:mb-0 border rounded-lg md:border-none">
                        <td data-label="Nombre" className="block md:table-cell p-3 before:content-[attr(data-label)] before:font-bold before:block before:md:hidden">
                        <p>{office.name}</p>
                        </td>
                        <td data-label="Address" className="block md:table-cell p-3 before:content-[attr(data-label)] before:font-bold before:block before:md:hidden">
                        <p className="text-wrap">
                            {office.office_address}
                        </p>
                        </td>
                        <td data-label="City" className="block md:table-cell p-3 before:content-[attr(data-label)] before:font-bold before:block before:md:hidden">
                        <p>{office.city}</p>
                        </td>
                        <td data-label="Phone" className="block md:table-cell p-3 before:content-[attr(data-label)] before:font-bold before:block before:md:hidden">
                        <p className="text-wrap">{office.phone}</p>
                        </td>
                    </tr>
                    </tbody>
                    ))
                    } 
                </table>
                <div className="flex gap-2 absolute -right-2 -bottom-4">
                    {
                    offices.length < 3 
                    ?(<button 
                    onClick={handleOpen}
                    ><CiCirclePlus 
                    size={40} 
                    strokeWidth={0.5}
                    className="bg-blue-500 rounded-3xl w-fit text-white hover:bg-blue-700"/>
                    </button>)
                    :(<></>)
                    }
                    <button
                    onClick={()=> setIsOpenDelete(true)}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-800"
                    ><FaRegTrashAlt size={20} className="text-white"/></button>
                </div>
                </>
                )
                :(
                    <div>
                    <span>No offices have been registered, start by registering one here</span>
                    <button 
                        className="mx-auto block bg-blue-600 py-2 px-3 rounded-lg text-white mt-2 font-semibold"
                        onClick={handleOpen}  
                    >Add office</button>
                    </div>
                )
                }
            </div>
            
          </div>
    </>
  )
}

export default OfficePanel
