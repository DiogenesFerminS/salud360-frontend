
export const Alert = ({ msg, error } : {msg: string, error:boolean})=>{
    return(
        <div className={`${error ? 'bg-red-400 animate-tada' : 'bg-blue-400 animate-zoom-in'} rounded-lg py-2  px-3`}>
        <span className="uppercase font-bold text-center block text-gray-50">{msg}</span>

    </div>
    )
}