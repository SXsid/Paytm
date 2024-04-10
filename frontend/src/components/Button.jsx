import { useNavigate } from "react-router-dom"
export default function Button({title,onClick}){
    return ( 
    <button    className="bg-transparent border-2 border-teal-300  text-teal-300 text-lg font-bold rounded-lg text-center m-4
    cursor-pointer px-4" onClick={onClick} >
        {title}

    </button>
    )
}