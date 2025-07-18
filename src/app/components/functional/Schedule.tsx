"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Modal } from "../ui/Modal";
import { useAuth } from "@/app/hooks/useAuth";
import { FaHourglassHalf } from "react-icons/fa";

type Schedule = {
  day: number,
  hour: string,
  office_id: string,
};

type OfficesSelect = {
  id: string,
  name: string,
}

const Schedule = () => {

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const schedule = ["6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00" ];

  const [check, setCheck] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [officesSelect, setOfficesSelect] = useState<OfficesSelect | null>();
  const {offices} = useAuth();

  useEffect(()=>{
    const getSchedule = async ()=>{
      const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/schedule`;
      const resp = await fetch(url,{
        method:"GET",
        credentials:"include",
      });

      const result = await resp.json();
      setCheck(result);
    };
    getSchedule();
  }, [])

  const handleClick = (day : string ,hour : string)=>{
    if(!officesSelect) return;
    const dayI = daysOfWeek.indexOf(day);
    const updateDate =  {
      day:dayI,
      hour,
      office_id:officesSelect.id
    };
    
    if(check.some(c => c.day === updateDate.day && c.hour === updateDate.hour &&  updateDate.office_id === c.office_id )){
      const checkFiltered = check.filter(c => !(c.day === updateDate.day && c.hour === hour && updateDate.office_id === c.office_id));
      setCheck(checkFiltered)
      return;
    };

    setCheck(prev => [...prev, updateDate]);
  };

  const handleOfficeChange = (e : ChangeEvent<HTMLSelectElement> )=>{

    setOfficesSelect({
      id:e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    });
    setIsModalOpen(false);
  }

  const handleClose = ()=>{
    setIsModalOpen(false);
  }
  console.log(check);
  return (
    <>
    <Modal isOpen={isModalOpen}>
      <div className="p-2">
        {
          offices
          ?(
            offices.length > 0
            ?(
              <>
                <span className="text-center block text-xl font-semibold mb-5">Seleccione un cosultorio</span>
            <div className="my-5">
              <select 
              onChange={handleOfficeChange}
              className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Selecciona una opción</option>
                {
                  offices
                  ?(
                    offices.map(o => (
                      <option value={o.id} key={o.id}>{o.name}</option>
                    ))
                  )
                  :(<></>)
                }
              </select>
              </div>
              <button
                  onClick={handleClose}
                  className="py-2 px-4 mx-auto bg-red-600 rounded-lg text-white font-semibold hover:bg-red-800 block"
              >Close</button>
              </>
            )
            :(
              <>
                <span className="font-semibold text-pretty">You cannot add schedules without having created an office first.</span>

              <button
                  onClick={handleClose}
                  className="mt-4 py-2 px-4 mx-auto bg-red-600 rounded-lg text-white font-semibold hover:bg-red-800 block"
              >Close</button>
              </>
              
            )
          )
          :(<></>)
        }
        
    </div>
    </Modal>

    <div className=" bg-gray-50 rounded-lg shadow-gray-800 shadow-md mt-2 animate-fade-in animate-delay-400 relative">
      <div className="flex gap-2 items-center justify-center p-3">
          <FaHourglassHalf size={22} className="text-gray-800"/>
          <span className="text-xl font-semibold text-gray-800">Working hours</span>
      </div>
      <table className="block p-3">
        <thead>
          <tr>
            <th className="p-2 bg-blue-600 text-white text-center font-semibold">Hour</th>
            {
              daysOfWeek.map(day => (
                <th key={day} className="p-2 bg-blue-600 text-white text-center font-semibold">{day}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            schedule.map(hour=>(
              <tr key={hour}>
                <td className="p-1 border-gray-300 border">{hour}</td>
                {
                  daysOfWeek.map(day=>(
                    <td key={`${day} - ${hour}`} 
                    onClick={()=> handleClick(day, hour)}
                    className={`${check.some(c => c.day === daysOfWeek.indexOf(day) && c.hour === hour) && "bg-blue-300"} border-gray-300 border`}>

                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        {
          officesSelect
          ?(<span className="block font-semibold p-2 text-center">Selected Office: {officesSelect?.name}</span>)
          :(<></>)
        }
      </div>
      <div className="flex absolute -right-2 -bottom-5">
      <button
        onClick={()=> setIsModalOpen(true)}
      ><CiCirclePlus 
        size={40} 
        strokeWidth={0.5}
        className="bg-blue-500 rounded-3xl w-fit text-white hover:bg-blue-700"/>
      </button>
      </div>
    </div>
    </>
  )
}

export default Schedule
